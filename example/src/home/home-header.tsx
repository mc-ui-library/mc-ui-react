import React from "react";
import "./home-header.scss";

const HomeHeader = () => {
  return (
    <div className="mc-home-header">
      <div className="home-header--header">
        <a href="/" className="home-header--header--logo">
          <span className="home-header--header--logo home-header--header--logo--1">
            MC
          </span>
          <span className="home-header--header--logo--2">UI</span>
        </a>
      </div>
      <div className="home-header--body">List Component</div>
    </div>
  );
};

export default HomeHeader;
