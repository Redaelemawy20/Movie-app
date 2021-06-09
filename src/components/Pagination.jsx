import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { pageChanged } from "../store/reducer";
const Pagination = ({ changePage, currentPage }) => {
  console.log();
  if (currentPage - 3 < 1)
    var range = _.range(1, 10).concat("...").concat(_.range(98, 101));
  else if (currentPage + 5 > 97)
    var range = _.range(1, 4)
      .concat("...")
      .concat(_.range(currentPage - 3, 101));
  else {
    var range = _.range(currentPage - 3, currentPage + 6)
      .concat("...")
      .concat(_.range(98, 101));

    if (currentPage - 3 > 2) range = _.range(1, 3).concat("...").concat(range);
  }

  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <span onClick={() => changePage(currentPage - 1)}>{"<<Previous"}</span>
      ) : (
        ""
      )}

      <span className="current">{`${currentPage} of 100 `}</span>
      {range.map((c) => (
        <span
          className={currentPage === c ? "active page" : "page"}
          onClick={() => {
            if (!isNaN(c)) changePage(c);
          }}
        >
          {c}
        </span>
      ))}
      {currentPage < 100 ? (
        <span onClick={() => changePage(currentPage + 1)}>{"Next>>"}</span>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { currentPage: state.movies.page };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(pageChanged(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
