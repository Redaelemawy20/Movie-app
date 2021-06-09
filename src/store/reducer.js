import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: { data: [], loading: true, page: 1 },

  movie: { data: {}, loading: true },
  cast: { directors: [], actors: [], loading: true },
  search: { data: [], loading: true },
};
const slice = createSlice({
  initialState,
  name: "movies",
  reducers: {
    apiCallBegin: (state, action) => {
      const { loading } = action.payload;

      return { ...state, [loading]: { ...state[loading], loading: true } };
    },
    moviesLoaded: (state, action) => {
      const movies = action.payload.results;
      return {
        ...state,
        movies: { ...state.movies, data: movies, loading: false },
      };
    },
    movieLoaded: (state, action) => {
      const movie = action.payload;
      return {
        ...state,
        movie: { ...state.movies, data: movie, loading: false },
      };
    },
    castLoaded: (state, action) => {
      const { cast } = action.payload;

      const directors = cast.filter((member) =>
        member.known_for_department === "Directing" ? true : false
      );
      const actors = cast
        .filter((member) =>
          member.known_for_department === "Acting" ? true : false
        )
        .slice(0, 5);

      return { ...state, cast: { directors, actors, loading: false } };
    },
    pageChanged: (state, action) => {
      return { ...state, movies: { ...state.movies, page: action.payload } };
    },
    getSearched: (state, action) => {
      const movies = action.payload.results;
      return {
        ...state,
        search: { ...state.search, data: movies, loading: false },
      };
    },
    searchCleared: (state, action) => {
      return {
        ...state,
        search: { ...state.search, data: [], loading: true },
      };
    },
  },
});
console.log(slice.actions);
export default slice.reducer;
export const {
  apiCallBegin,
  moviesLoaded,
  movieLoaded,
  castLoaded,
  pageChanged,
  getSearched,
  searchCleared,
} = slice.actions;
