import React from "react";
import Container from "react-bootstrap/Container";
import SearchBar from "./searchBar";
import logo from "../logo.png";

const SearchBarContainer = ({ fetch }) => {
  return (
    <div className="container">
      <div className="p-5 bg-light rounded-3 d-flex align-items-center justify-content-between">
        <div>
          <img src={logo} alt="Logo" className="logo" />
          <p className="lead fs-4">
            <em>Whose article is it anyway?</em>
          </p>
        </div>
        <div className="search-bar-container">
          <SearchBar fetch={fetch} />
        </div>
      </div>
    </div>
  );
};

export default SearchBarContainer;
