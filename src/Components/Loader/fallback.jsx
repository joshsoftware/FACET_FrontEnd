import React from "react";

import Loader from "./index";

import "./style.css";

const Fallback = () => {
  return (
    <div className="fallback-parent">
      <div className="fallback">
        <span>
          <Loader size="lg" />
        </span>
      </div>
    </div>
  );
};

export default Fallback;
