import React from "react";
import urls from "../config/urls";
const Cast = ({ directors, actors }) => {
  return (
    <div className="cast">
      {directors.length ? (
        <div className="container director">
          <h2>Direction</h2>
          {directors.map((director) => (
            <div className="cast-member">
              <img src={urls.IMG_PATH + director.profile_path} alt="" />
              <span className="member-name">{director.name}</span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {actors.length ? (
        <div className="container actors">
          <h2>Cast</h2>
          {actors.map((actor) => (
            <div className="cast-member">
              <img src={urls.IMG_PATH + actor.profile_path} alt="" />
              <span className="member-name">{actor.name}</span>
              <span className="role">as {actor.character}</span>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cast;
