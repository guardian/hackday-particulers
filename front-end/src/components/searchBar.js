import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";

const SearchBar = ({fetch}) => {
  const [input, setInput] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(input);
  }

  const onInput = (e) => {
    e.preventDefault();
    setInput(e.target.value)
  }

  return (
    <Form className="d-flex" onSubmit={onSubmit}>
        <Form.Group as={Col}>
          <FormControl
            type="text"
            placeholder="Paste the article url here"
            className="searchbar"
            aria-label="Search"
            onChange={onInput}
            value={input}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button className="submit-button" type="submit">Search</Button>
        </Form.Group>
    </Form>
  );
};

export default SearchBar;
