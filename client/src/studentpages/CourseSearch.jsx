import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import * as d3 from "d3";
import "./CourseSearch.css";

const CourseSearch = () => {
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
            ucid: ucid
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
  }, [filters, ucid]);

  // D3 visualization
  useEffect(() => {
    if (!courses.length || !svgRef.current) return;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const filteredCourses = courses.filter(course =>
      course.CourseID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.Course_Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const width = 1000;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create force simulation
    const simulation = d3.forceSimulation(filteredCourses)
      .force("link", d3.forceLink(prerequisites)
        .id(d => d.CourseID)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50));

    // Draw links (prerequisites)
    const links = svg.append("g")
      .selectAll("line")
      .data(prerequisites)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Define arrow marker
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");

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

    // Add circles for nodes
    nodes.append("circle")
      .attr("r", 30)
      .attr("fill", d => {
        if (d.Department_Name === 'CPSC') return "#4285f4";
        if (d.Department_Name === 'MATH') return "#ea4335";
        return "#fbbc05";
      });

    // Add course IDs as text
    nodes.append("text")
      .text(d => d.CourseID)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .style("font-size", "12px");

    // Add tooltips
    nodes.append("title")
      .text(d => `${d.CourseID}\n${d.Course_Name}`);

    // Add click handler
    nodes.on("click", (event, d) => {
      window.location.href = `/studentpages/CoursePage/${d.CourseID}`;
    });

    // Update force simulation
    simulation.on("tick", () => {
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

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

  }, [courses, prerequisites, searchTerm]);

  return (
    <div>
      <h1>Course Search</h1>
      <div className="course-search">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", margin: "10px 0", width: "200px" }}
        />
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
            onChange={(e) => setFilters({ ...filters, showtakable: e.target.checked })}
          />
          Show Takable Courses
        </div>
        <div>
          <input
            type="checkbox"
            checked={filters.showonlyrequirements}
            onChange={(e) => setFilters({ ...filters, showonlyrequirements: e.target.checked})}
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

export default CourseSearch;
