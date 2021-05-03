import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import urls from "../config/urls";
import imdb from "../assets/imdb.png";
const SingleMovie = ({ match, getMovie, getCast, movie, cast }) => {
  const id = match.params.id;

  useEffect(() => {
    getMovie(id);
    getCast(id);
  }, []);
  const { data: movieData, loading: movieLoading } = movie;
  if (!movieLoading && !cast.loading) {
    const { directors, actors } = cast;
    console.log(directors);
    return (
      <>
        <div className="movie-container">
          <div className="movie">
            <img src={urls.IMG_PATH + movieData.poster_path} alt="" />
          </div>
          <div className="info">
            <h2 className="title">{movieData.title}</h2>
            <div>{movieData.release_date}</div>
            <div className="genres">
              {movieData.genres.map((genre) => {
                return <div className="genre-type">{genre.name}</div>;
              })}
            </div>
            <div className="country">
              Orginal Language:{" "}
              <span className="language">{movieData.original_language}</span>
            </div>
            <span
              className={
                movieData.vote_average > 7
                  ? "green"
                  : movieData.vote_average > 4.5
                  ? "orange"
                  : "red"
              }
            >
              {movieData.vote_average}
            </span>
            <img className="imdb" src={imdb} alt="" />
            <p className="overvi">{movieData.overview}</p>
          </div>
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
        </div>
      </>
    );
  }
  return <h1>Loading...</h1>;
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
      dispatch({
        type: "apiCallBegin",
        payload: { onSuccess: "movieLoaded", url: urls.singleMovie(id) },
      });
    },
    getCast: (id) => {
      dispatch({
        type: "apiCallBegin",
        payload: { onSuccess: "castLoaded", url: urls.movieCast(id) },
      });
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleMovie)
);
