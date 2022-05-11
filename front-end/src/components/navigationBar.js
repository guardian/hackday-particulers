import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const NavigationBar = () => {
  return (
<Navbar className="nav-bar" expand="lg">
  <Container fluid>
    <Navbar className="brand-text">particulers</Navbar>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav className="nav-bar-link" href="#action1">Home</Nav>
        <Nav className="nav-bar-link" href="#action2">About</Nav>
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-light">Search</Button>
      </Form>
  </Container>
</Navbar>
  )
}

export default NavigationBar;