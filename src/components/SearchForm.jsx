import React from "react";
import { connect } from "react-redux";
import { apiCallBegin, getSearched } from "../store/reducer";
import urls from "../config/urls";
const SearchForm = ({ searchMovies, search, prev }) => {
  const handleSubmit = () => {
    const searchTerm = search.current.value;

    if (searchTerm !== "" && searchTerm !== prev.current) {
      prev.current = searchTerm;

      searchMovies(searchTerm);
    }
  };

  return (
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
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchMovies: (query) =>
      dispatch(
        apiCallBegin({
          url: urls.searchApi(query),
          onSuccess: getSearched,
          loading: "search",
        })
      ),
  };
};
export default connect(null, mapDispatchToProps)(SearchForm);
