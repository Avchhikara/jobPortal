import React from "react";

import "./Search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Form, Input, Row, Col, Button } from "reactstrap";

class Search extends React.Component {
  render() {
    return (
      <Col xs="12" className="search-container">
        <Form>
          <Row form>
            <Col xs={12} sm={6} md={5}>
              <Input
                type="text"
                id="rdf"
                name="rdf"
                placeholder="Role, Designations and functional area"
              />
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="location"
              />
            </Col>
            <Col xs={12} sm={6} md={2}>
              <Input
                type="number"
                id="salary"
                name="salary"
                placeholder="Salary"
              />
            </Col>
            <Col xs={12} sm={6} md={2}>
              <Input
                type="text"
                id="experience"
                name="experience"
                placeholder="Experience"
              />
            </Col>
            <Col xs={12} sm={12} md={1}>
              <Button color="primary" block>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }
}

export default Search;
