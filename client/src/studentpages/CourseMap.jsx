import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import * as d3 from "d3";

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
    department: 'ALL'
  });
  const [ucid, setUcid] = useState(auth.UCID);
  const svgRef = useRef();

  // Fetch courses and their prerequisites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get("http://localhost:8800/course", {
          params: {
            ...filters,
            ucid: ucid,
            searchTerm: searchTerm
          }
        });
        setCourse(coursesRes.data);

        // Fetch prerequisites for all courses
        const prereqPromises = coursesRes.data.map(course =>
          axios.get(`http://localhost:8800/prerequisite/${course.CourseID}`)
        );
        const prereqResults = await Promise.all(prereqPromises);
        const allPrereqs = prereqResults.flatMap((res, idx) => 
          res.data.map(prereq => ({
            source: prereq.Required_CourseID,
            target: coursesRes.data[idx].CourseID
          }))
        );
        setPrerequisites(allPrereqs);
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

    // Use courses directly instead of filtering them
    const filteredCourses = courses;
    const filteredCourseIds = new Set(courses.map(c => c.CourseID));

    // Filter prerequisites to only include connections between visible courses
    const filteredPrerequisites = prerequisites.filter(prereq => 
      filteredCourseIds.has(prereq.source) && 
      filteredCourseIds.has(prereq.target)
    );

    const width = 1000;
    const height = 600;

    // Initialize node positions in the center
    filteredCourses.forEach(course => {
      course.x = width / 2 + (Math.random() - 0.5) * 100; // Add small random offset
      course.y = height / 2 + (Math.random() - 0.5) * 100;
    });

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create force simulation with filtered data
    const simulation = d3.forceSimulation(filteredCourses)
      .force("link", d3.forceLink(filteredPrerequisites)
        .id(d => d.CourseID)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-300)) // Reduced repulsion
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.3)) // Reduced centering force
      .force("collision", d3.forceCollide().radius(50))
      .force("x", d3.forceX(width / 2).strength(0.05)) // Reduced X-centering force
      .force("y", d3.forceY(height / 2).strength(0.05)); // Reduced Y-centering force

    // Calculate the total distance the arrow needs to be offset
    const CIRCLE_RADIUS = 30;
    const ARROW_OFFSET = 9; // 5 pixels extra spacing

    // Define arrow marker with adjusted position
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", ARROW_OFFSET) // This positions the arrow relative to the end point
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

    // Draw links with adjusted endpoints
    const links = svg.append("g")
      .selectAll("line")
      .data(filteredPrerequisites)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Create nodes (courses)
    const nodes = svg.append("g")
      .selectAll("g")
      .data(filteredCourses)
      .enter()
      .append("g")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles for nodes with dynamic opacity
    nodes.append("circle")
      .attr("r", 30)
      .attr("fill", d => {
        if (d.Department_Name === 'CPSC') return "#4285f4";
        if (d.Department_Name === 'MATH') return "#ea4335";
        return "#fbbc05";
      })
      .attr("opacity", d => d.is_taken ? 0.5 : 1); // Add opacity based on taken status

    // Add course IDs as text
    nodes.append("text")
      .text(d => d.CourseID)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .style("font-size", "12px");

    // Add tooltips with additional information
    nodes.append("title")
      .text(d => `${d.CourseID}\n${d.Course_Name}\n${d.is_taken ? "Taken" : "Not taken"}`);

    // Add click handler
    nodes.on("click", (event, d) => {
      window.location.href = `/studentpages/CoursePage/${d.CourseID}`;
    });

    // Update force simulation with adjusted link positions
    simulation.on("tick", () => {
      links.each(function(d) {
        // Calculate the direction vector
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        
        if (length === 0) return;

        // Calculate unit vector components
        const ux = dx / length;
        const uy = dy / length;

        // Adjust start and end points
        const startX = d.source.x + (CIRCLE_RADIUS * ux);
        const startY = d.source.y + (CIRCLE_RADIUS * uy);
        const endX = d.target.x - (CIRCLE_RADIUS * ux);
        const endY = d.target.y - (CIRCLE_RADIUS * uy);

        // Update line position
        d3.select(this)
          .attr("x1", startX)
          .attr("y1", startY)
          .attr("x2", endX)
          .attr("y2", endY);
      });

      nodes
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
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

  }, [courses, prerequisites, searchTerm, filters]);

  return (
    <div>
      <h1>Course Map</h1>
      <div className="course-search">
        <div className="search-controls">
          <input
            className="search-input"
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button>
          <Link to="/studentpages/coursesearch">Open List View</Link>
        </button>
        <div className="filter-options">
          <div>
            <input
              type="checkbox"
              checked={filters.showtaken}
              onChange={(e) =>
                setFilters({ ...filters, showtaken: e.target.checked })
              }
            />
            Show Taken Courses
          </div>
          <div>
            <input
              type="checkbox"
              checked={filters.showantirequisites}
              onChange={(e) =>
                setFilters({ ...filters, showantirequisites: e.target.checked })
              }
            />
            Show Antirequisites
          </div>
          <div>
            <input
              type="checkbox"
              checked={filters.showtakable}
              onChange={(e) => 
                setFilters({ ...filters, showtakable: e.target.checked })
              }
            />
            Show Takable Courses
          </div>
          <div>
            <input
              type="checkbox"
              checked={filters.showonlyrequirements}
              onChange={(e) => 
                setFilters({ ...filters, showonlyrequirements: e.target.checked })
              }
            />
            Show Only Requirements
          </div>
          <div>
            <select 
              name="department" 
              id="department"
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            >
              <option value="ALL">All Departments</option>
              <option value="CPSC">CPSC</option>
              <option value="MATH">MATH</option>
            </select>
            Select Department
          </div>
        </div>
      </div>

      {/* D3 visualization container */}
      <div className="graph-container">
        <svg ref={svgRef}></svg>
      </div>

      <button>
        <Link to="/studentpages/StudentHome">Back</Link>
      </button>
    </div>
  );
};

export default CourseMap;