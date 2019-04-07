import React from "react";

import "./Search.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Form, Input, Row, Col, Button } from "reactstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rdf: "",
      location: "",
      salary: "",
      experience: ""
    };
  }

  componentDidMount() {
    let sstr = this.props.location.search;
    sstr = sstr.substring(1, sstr.length);

    // console.log(sstr !== "");
    if (sstr !== "") {
      //Now, making an sstr object
      const newSstr = {};
      sstr = sstr.split("&");

      for (let str of sstr) {
        str = str.split("=");
        newSstr[str[0]] = str[1] ? str[1].toLowerCase() : "";
      }

      this.setState({
        rdf: newSstr["rdf"] ? decodeURIComponent(newSstr["rdf"]) : "",
        location: newSstr["location"]
          ? decodeURIComponent(newSstr["location"])
          : "",
        salary: newSstr["salary"]
          ? decodeURIComponent(newSstr["location"])
          : "",
        experience: newSstr["experience"]
          ? decodeURIComponent(newSstr["experience"])
          : ""
      });
    }
  }

  onSearch = e => {
    this.props.history.push(
      `/?rdf=${this.state.rdf}&location=${this.state.location}&salary=${
        this.state.salary
      }&experience=${this.state.experience}`
    );
    // console.log(this.props);
    this.props.toggleJobs();
    // console.log(this.props);

    let sstr = this.props.location.search;
    sstr = sstr.substring(1, sstr.length);

    if (sstr !== "") {
      //Now, making an sstr object
      const newSstr = {};
      sstr = sstr.split("&");

      for (let str of sstr) {
        str = str.split("=");
        newSstr[str[0]] = str[1] ? str[1].toLowerCase() : "";
      }
      // console.log(newSstr);
      if (
        this.state.rdf === "" &&
        this.state.location === "" &&
        this.state.experience === "" &&
        this.state.salary === ""
      ) {
        // console.log("caleed home");
        this.props.history.push("/");
        this.props.toggleJobs();
      }
    }

    if (e) e.preventDefault();
  };

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
                value={this.state.rdf}
                onChange={e => {
                  const val = e.target.value;
                  if (val) {
                    this.setState({ rdf: val });
                  } else {
                    this.setState({ rdf: "" });
                  }
                  //Now, calling to set url
                  // this.onSearch();
                }}
              />
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Input
                type="text"
                id="location"
                name="location"
                value={this.state.location}
                placeholder="location"
                onChange={e => {
                  const val = e.target.value;
                  if (val) this.setState({ location: val });
                  else this.setState({ location: "" });
                  //Now, calling to set url
                  // this.onSearch();
                }}
              />
            </Col>
            <Col xs={12} sm={6} md={2}>
              <Input
                type="number"
                id="salary"
                value={this.state.salary}
                name="salary"
                placeholder="Salary"
                onChange={e => {
                  const val = e.target.value;
                  if (val) {
                    this.setState({ salary: val });
                  } else this.setState({ salary: "" });
                  //Now, calling to set url
                  // this.onSearch();
                }}
              />
            </Col>
            <Col xs={12} sm={6} md={2}>
              <Input
                type="text"
                id="experience"
                value={this.state.experience}
                name="experience"
                placeholder="Experience"
                onChange={e => {
                  const val = e.target.value;
                  if (val) this.setState({ experience: val });
                  else this.setState({ experience: "" });
                  //Now, calling to set url
                  // this.onSearch();
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={1}>
              <Button color="primary" block onClick={this.onSearch}>
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
