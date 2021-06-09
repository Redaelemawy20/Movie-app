import MovieList from "../components/movies_list";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import { searchCleared } from "../store/reducer";
import SearchList from "../components/Search_list";
import SearchForm from "../components/SearchForm";
import { useRef } from "react";
const Movies = ({ result, clear }) => {
  const search = useRef();
  const prev = useRef("");
  const clearSearch = () => {
    search.current.value = "";

    clear();
  };
  return (
    <>
      {" "}
      <header>
        <SearchForm search={search} prev={prev} />
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
    clear: () => {
      dispatch(searchCleared());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Movies);
