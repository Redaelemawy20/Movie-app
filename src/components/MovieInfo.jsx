import React from "react";
import imdb from "../assets/imdb.png";
const MovieInfo = ({ movie }) => {
  return (
    <div className="info">
      <h2 className="title">{movie.title}</h2>
      <div>{movie.release_date}</div>
      <div className="genres">
        {movie.genres.map((genre) => {
          return <div className="genre-type">{genre.name}</div>;
        })}
      </div>
      <div className="country">
        Orginal Language:{" "}
        <span className="language">{movie.original_language}</span>
      </div>
      <span
        className={
          movie.vote_average > 7
            ? "green"
            : movie.vote_average > 4.5
            ? "orange"
            : "red"
        }
      >
        {movie.vote_average}
      </span>
      <img className="imdb" src={imdb} alt="" />
      <p className="overvi">{movie.overview}</p>
    </div>
  );
};

export default MovieInfo;
