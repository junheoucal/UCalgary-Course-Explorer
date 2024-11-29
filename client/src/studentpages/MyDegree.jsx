import React from "react";
import { Link } from "react-router-dom";

const MyDegree = () => {
  return (
    <div>
      <button>
        <Link to="/studentpages/Major">View My Major</Link>
      </button>
      <button>
        <Link to="/studentpages/Minor">View My Minor</Link>
      </button>
    </div>
  );
};

export default MyDegree;