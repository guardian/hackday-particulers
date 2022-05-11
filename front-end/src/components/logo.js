import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../logo.png";

const Logo = () => {
  return (
    <>
      <Container className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </Container>
      <p className="copy">Whose study is it anyway?</p>
    </>
  );
};

export default Logo;