import React from "react";
import HomeHeader from "./home-header";
import "./home.scss";
import Example from "./example/example";

const Home = () => (
  <div className="mc-home">
    <HomeHeader />
    <div className="home--body">
      <Example />
    </div>
  </div>
);

export default Home;
