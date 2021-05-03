import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import url from "../config/urls";
const Result = ({ history, result }) => {
  return (
    <>
      <div className="list">
        {result.data.map(
          ({ title, poster_path, vote_average, overview, id }) => {
            return (
              <div
                className="movie"
                key={id}
                onClick={() => history.push(`/movie/${id}`)}
              >
                <img src={`${url.IMG_PATH + poster_path}`} />
                <div className="movie-info">
                  <h3>{title}</h3>
                  <span
                    className={
                      vote_average > 8
                        ? "green"
                        : vote_average > 4.5
                        ? "orange"
                        : "red"
                    }
                  >
                    {vote_average}
                  </span>
                </div>

                <div className="overview">
                  <h3>Overview</h3>
                  {overview}
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    result: state.search,
  };
};
export default withRouter(connect(mapStateToProps)(Result));
