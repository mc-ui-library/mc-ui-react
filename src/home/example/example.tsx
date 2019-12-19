import React from "react";
import "./example.scss";

const Example: React.FC = () => {
  return (
    <div className="mc-example">
      <div className="example--header">
        <h4>Component Examples</h4>
      </div>
      <div className="example--item">
        <div className="example--item--header">
          <h6>Basic List - Horizontal Toggle</h6>
        </div>
        <div className="example--item--body"></div>
      </div>
    </div>
  );
};

export default Example;
