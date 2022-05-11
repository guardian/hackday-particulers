import React from "react";
import Container from "react-bootstrap/Container";
import SearchBar from "./searchBar";

const SearchBarContainer = ({fetch}) => {
  return (
    <div className="container-fluid py-1 background-box">
      <div className="p-5 bg-light rounded-3">
        <Container className="search-bar-container">
          <SearchBar fetch={fetch}/>
        </Container>
      </div>
    </div>
  );
};

export default SearchBarContainer;
