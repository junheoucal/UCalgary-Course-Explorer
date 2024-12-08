import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import * as d3 from "d3";
import "../stylepages/CourseMap.css";

// Add constants at the top of the file
const ARROW_OFFSET = 9;  // Distance from node center to arrow tip
const CIRCLE_RADIUS = 30; // Radius of course nodes
const STROKE_WIDTH = 4;  // Width of the highlight stroke

const CourseMap = () => {
  const { auth } = useAuth();
  const [courses, setCourse] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    showtaken: true,
    showantirequisites: true,
    showtakable: false,
    showonlyrequirements: false,
    department: "ALL",
  });
  const [ucid, setUcid] = useState(auth.UCID);
  const svgRef = useRef();

  // Fetch courses and their prerequisites
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch filtered courses first
        const coursesRes = await axios.get("http://localhost:8800/course", {
          params: {
            ...filters,
            ucid: ucid,
            searchTerm: searchTerm,
          },
        });
        setCourse(coursesRes.data);

        // Create a Set of visible course IDs for efficient lookup
        const visibleCourseIds = new Set(coursesRes.data.map(course => course.CourseID));

        // Fetch prerequisites only for visible courses
        const prereqPromises = coursesRes.data.map((course) =>
          axios.get(`http://localhost:8800/prerequisite/${course.CourseID}`)
        );
        const prereqResults = await Promise.all(prereqPromises);
        
        // Filter prerequisites to only include relations between visible courses
        const allPrereqs = prereqResults.flatMap((res, idx) =>
          res.data
            .filter(prereq => 
              visibleCourseIds.has(prereq.Required_CourseID) && 
              visibleCourseIds.has(coursesRes.data[idx].CourseID)
            )
            .map((prereq) => ({
              source: prereq.Required_CourseID,
              target: coursesRes.data[idx].CourseID,
            }))
        );

        // Additional validation to ensure all nodes exist
        const validPrereqs = allPrereqs.filter(prereq => 
          coursesRes.data.some(course => course.CourseID === prereq.source) &&
          coursesRes.data.some(course => course.CourseID === prereq.target)
        );
        
        setPrerequisites(validPrereqs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [filters, ucid, searchTerm]);

  // D3 visualization
  useEffect(() => {
    if (!courses.length || !svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create a map of course IDs for quick lookup
    const courseMap = new Map(courses.map(course => [course.CourseID, course]));

    // Filter prerequisites to only include valid links
    const validPrerequisites = prerequisites.filter(prereq => 
      courseMap.has(prereq.source) && courseMap.has(prereq.target)
    );

    const width = 1000;
    const height = 600;

    // Create SVG and container elements
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    svg.call(zoom);

    const container = svg.append("g")
      .attr("class", "zoom-container");

    // Create a layered layout based on prerequisites
    const layers = new Map();
    const visited = new Set();

    // Helper function to determine node layer
    function assignLayer(courseId, layer = 0) {
      if (visited.has(courseId)) return;
      visited.add(courseId);
      
      layers.set(courseId, Math.max(layer, layers.get(courseId) || 0));
      
      // Find all courses that require this as a prerequisite
      prerequisites
        .filter(p => p.source === courseId)
        .forEach(p => assignLayer(p.target, layer + 1));
    }

    // Assign initial layers
    courses.forEach(course => {
      if (!visited.has(course.CourseID)) {
        assignLayer(course.CourseID);
      }
    });

    // Modify simulation forces
    const simulation = d3.forceSimulation(courses)
      .force("link", d3.forceLink(validPrerequisites)
        .id(d => d.CourseID)
        .distance(150))
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("x", d3.forceX().strength(0.2).x(d => {
        const layer = layers.get(d.CourseID) || 0;
        if (d.has_no_prerequisites) {
          return width / 2;
        }
        return (layer * width / 5) + 100;
      }))
      .force("y", d3.forceY().strength(0.1).y(d => {
        if (d.has_no_prerequisites) {
          return height / 2;
        }
        return height / 2 + (Math.random() - 0.5) * height / 4;
      }))
      .force("collision", d3.forceCollide().radius(70));

    // Set initial positions based on layers
    courses.forEach(course => {
      const layer = layers.get(course.CourseID) || 0;
      if (course.has_no_prerequisites) {
        course.x = width / 2;
        course.y = height / 2;
      } else {
        course.x = (layer * width / 5) + 100;
        course.y = height / 2 + (Math.random() - 0.5) * height / 4;
      }
    });

    // Reset zoom button
    svg.append("rect")
      .attr("x", 10)
      .attr("y", 10)
      .attr("width", 80)
      .attr("height", 30)
      .attr("fill", "white")
      .attr("stroke", "#999")
      .attr("rx", 5)
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
      });

    svg.append("text")
      .attr("x", 50)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Reset Zoom")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity);
      });

    // Define arrow marker with adjusted position
    container.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", ARROW_OFFSET)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // Draw links with adjusted endpoints
    const links = container.append("g")
      .selectAll("line")
      .data(validPrerequisites)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Create nodes (courses)
    const nodes = container.append("g")
      .selectAll("g")
      .data(courses)
      .enter()
      .append("g")
      .call(
        d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles for nodes with dynamic opacity
    nodes
      .append("circle")
      .attr("r", 30)
      .attr("fill", (d) => {
        if (d.Department_Name === "CPSC") return "#4285f4";
        if (d.Department_Name === "MATH") return "#ea4335";
        return "#fbbc05";
      })
      .attr("opacity", (d) => (d.is_taken ? 0.5 : 1))
      .attr("stroke", d => d.has_no_prerequisites ? "#32CD32" : "none")
      .attr("stroke-width", d => d.has_no_prerequisites ? STROKE_WIDTH : 0);

    // Add course IDs as text
    nodes
      .append("text")
      .text((d) => d.CourseID)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .style("font-size", "12px");

    // Add tooltips with additional information
    nodes
      .append("title")
      .text((d) =>
        `${d.CourseID}\n${d.Course_Name}\n${
          d.is_taken ? "Taken" : "Not taken"
        }\n${d.has_no_prerequisites ? "No prerequisites required" : "Has prerequisites"}`
      );

    // Add click handler
    nodes.on("click", (event, d) => {
      window.location.href = `/studentpages/CoursePage/${d.CourseID}`;
    });

    // Update force simulation with adjusted link positions
    simulation.on("tick", () => {
      links.each(function (d) {
        // Calculate the direction vector
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        if (length === 0) return;

        // Calculate unit vector components
        const ux = dx / length;
        const uy = dy / length;

        // Adjust start and end points
        const startX = d.source.x + CIRCLE_RADIUS * ux;
        const startY = d.source.y + CIRCLE_RADIUS * uy;
        const endX = d.target.x - CIRCLE_RADIUS * ux;
        const endY = d.target.y - CIRCLE_RADIUS * uy;

        // Update line position
        d3.select(this)
          .attr("x1", startX)
          .attr("y1", startY)
          .attr("x2", endX)
          .attr("y2", endY);
      });

      nodes.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Modify drag functions to work with zoom
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Add zoom controls
    const zoomControls = svg.append("g")
      .attr("class", "zoom-controls")
      .attr("transform", `translate(${width - 100}, 20)`);

    // Zoom in button
    zoomControls.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "white")
      .attr("stroke", "#999")
      .attr("rx", 5)
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy, 1.3);
      });

    zoomControls.append("text")
      .attr("x", 15)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("+")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy, 1.3);
      });

    // Zoom out button
    zoomControls.append("rect")
      .attr("x", 40)
      .attr("y", 0)
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", "white")
      .attr("stroke", "#999")
      .attr("rx", 5)
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy, 0.7);
      });

    zoomControls.append("text")
      .attr("x", 55)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .text("-")
      .style("cursor", "pointer")
      .on("click", () => {
        svg.transition()
          .duration(750)
          .call(zoom.scaleBy, 0.7);
      });
  }, [courses, prerequisites]);

  return (
    <div className="ucalgary-container">
      <div className="header">
        <img
          src="/uofc-logo.png"
          alt="University of Calgary Logo"
          className="ucalgary-logo"
        />
      </div>

      <div className="course-search-container">
        <h1>Course Map</h1>
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="department-select">
            <select
              name="department"
              id="department"
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value })
              }
            >
              <option value="ALL">All Departments</option>
              <option value="CPSC">CPSC</option>
              <option value="MATH">MATH</option>
            </select>
          </div>

          <div className="filters-container">
            <div className="filter-option">
              <input
                type="checkbox"
                checked={filters.showtaken}
                onChange={(e) =>
                  setFilters({ ...filters, showtaken: e.target.checked })
                }
              />
              <label>Show Taken Courses</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                checked={filters.showantirequisites}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    showantirequisites: e.target.checked,
                  })
                }
              />
              <label>Show Antirequisites</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                checked={filters.showtakable}
                onChange={(e) =>
                  setFilters({ ...filters, showtakable: e.target.checked })
                }
              />
              <label>Show Takeable Courses</label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                checked={filters.showonlyrequirements}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    showonlyrequirements: e.target.checked,
                  })
                }
              />
              <label>Show Only Requirements</label>
            </div>
          </div>
          <div className="button-group">
            <button className="map-list-button">
              <Link to="/studentpages/coursesearch">Open List View</Link>
            </button>
          </div>
        </div>

        {/* D3 visualization container */}
        <div className="graph-container">
          <svg ref={svgRef}></svg>
        </div>
        <div className="button-group">
          <button>
            <Link to="/studentpages/home">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMap;
