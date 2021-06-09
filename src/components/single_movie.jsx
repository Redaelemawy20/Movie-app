import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { apiCallBegin, movieLoaded, castLoaded } from "../store/reducer";
import urls from "../config/urls";

import Poster from "./Poster";
import MovieInfrormation from "./MovieInfo";
import Cast from "./Cast";
const SingleMovie = ({ match, getMovie, getCast, movie, cast }) => {
  const id = match.params.id;

  useEffect(() => {
    getMovie(id);
    getCast(id);
  }, []);
  const { data: movieData, loading: movieLoading } = movie;
  if (!movieLoading && !cast.loading) {
    const { directors, actors } = cast;

    return (
      <>
        <div className="movie-container">
          <Poster poster={urls.IMG_PATH + movieData.poster_path} />
          <MovieInfrormation movie={movieData} />
          <Cast directors={directors} actors={actors} />
        </div>
      </>
    );
  }
  return (
    <div className="movie-container">
      <h1>Loading...</h1>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    movie: state.movie,
    cast: state.cast,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMovie: (id) => {
      dispatch(
        apiCallBegin({ onSuccess: movieLoaded, url: urls.singleMovie(id) })
      );
    },
    getCast: (id) => {
      dispatch(
        apiCallBegin({ onSuccess: castLoaded, url: urls.movieCast(id) })
      );
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleMovie)
);
