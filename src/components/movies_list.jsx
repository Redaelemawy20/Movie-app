import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { apiCallBegin, moviesLoaded } from "../store/reducer";
import url from "../config/urls";
const MovieList = ({ history, load, movies }) => {
  useEffect(() => {
    load(movies.page);
  }, [movies.page]);
  if (!movies.loading) {
    return (
      <div className="list">
        {movies.data.map(
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
    );
  } else {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    load: (page) =>
      dispatch(
        apiCallBegin({
          url: url.discover(page),
          onSuccess: moviesLoaded,
          loading: "movies",
        })
      ),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieList)
);
