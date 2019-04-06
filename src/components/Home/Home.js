import React from "react";
import Search from "./../Search/Search";
import Jobs from "./../Jobs/Jobs";
import FunctionalArea from "./../FArea/FArea";
const Home = props => {
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <Search />
        <FunctionalArea />
        <Jobs />
      </div>
    </div>
  );
};

export default Home;
