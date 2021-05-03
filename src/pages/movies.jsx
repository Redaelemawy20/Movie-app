import { useRef } from "react";
import MovieList from "../components/movies_list";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import urls from "../config/urls";
import SearchList from "../components/Search_list";
const Movies = ({ result, searchMovies, clear }) => {
  const search = useRef();
  const prev = useRef("");
  const handleSubmit = () => {
    const searchTerm = search.current.value;

    if (searchTerm !== "" && searchTerm !== prev.current) {
      prev.current = searchTerm;

      searchMovies(searchTerm);
    }
  };
  const clearSearch = () => {
    search.current.value = "";
    clear();
  };
  return (
    <>
      {" "}
      <header>
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            id="search"
            className="search"
            placeholder="Search"
            ref={search}
          />
          <button type="submit" className="search submit">
            Search
          </button>
        </form>
      </header>
      <main id="main">
        {!result.loading || result.data.length > 0 ? (
          <>
            <button onClick={clearSearch} className="search clear">
              Clear Search
            </button>
            <SearchList />
          </>
        ) : (
          <>
            <Pagination />
            <MovieList />
            <Pagination />
          </>
        )}
      </main>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    result: state.search,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchMovies: (query) =>
      dispatch({
        type: "apiCallBegin",
        payload: {
          url: urls.searchApi(query),
          onSuccess: "getSearched",
          loading: "search",
        },
      }),
    clear: () => {
      dispatch({ type: "searchCleared" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
