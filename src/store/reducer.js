const initailState = {
  movies: { data: [], loading: true, page: 1 },

  movie: { data: {}, loading: true },
  cast: { directors: [], actors: [], loading: true },
  search: { data: [], loading: true },
};
const reducer = (state = initailState, action) => {
  if (action.type === "apiCallBegin") {
    const { loading } = action.payload;

    return { ...state, [loading]: { ...state[loading], loading: true } };
  }
  if (action.type === "moviesLoaded") {
    const movies = action.payload.results;
    return {
      ...state,
      movies: { ...state.movies, data: movies, loading: false },
    };
  }
  if (action.type === "movieLoaded") {
    const movie = action.payload;
    return {
      ...state,
      movie: { ...state.movies, data: movie, loading: false },
    };
  }
  if (action.type === "castLoaded") {
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
  }
  if (action.type === "pageChanged") {
    return { ...state, movies: { ...state.movies, page: action.payload } };
  }
  if (action.type === "getSearched") {
    const movies = action.payload.results;
    return {
      ...state,
      search: { ...state.search, data: movies, loading: false },
    };
  }
  if (action.type === "searchCleared") {
    return {
      ...state,
      search: { ...state.search, data: [], loading: true },
    };
  }

  return state;
};
export default reducer;
