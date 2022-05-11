import React from "react";
import Container from "react-bootstrap/Container";
import SearchBar from "./searchBar";
import logo from "../logo.png";

const SearchBarContainer = ({fetch}) => {
  return (
    <div className="container">
      <div className="p-5 bg-light rounded-3 d-flex align-items-center justify-content-between">
      <img src={logo} alt="Logo" className="logo" />
        <div className="search-bar-container">
          <SearchBar fetch={fetch}/>
        </div>
      </div>
    </div>
  );
};

export default SearchBarContainer;
