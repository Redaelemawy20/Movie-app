const api_key = "4b180bc42c2a143f0e96afa3059569ae";
export default {
  discover: (page) =>
    `https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${api_key}`,
  IMG_PATH: "https://image.tmdb.org/t/p/w1280",
  Genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
  singleMovie: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`,
  movieCast: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`,
  searchApi: (qeury) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="${qeury}`,
};
