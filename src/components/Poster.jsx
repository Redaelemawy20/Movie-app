import React from "react";
const Poster = ({ poster }) => {
  return (
    <div className="movie poster">
      <img src={poster} alt="" />
    </div>
  );
};

export default Poster;
