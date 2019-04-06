import React from "react";

import "./Footer.css";

import { Col, Row, Jumbotron } from "reactstrap";

const Footer = props => {
  return (
    <div className="footer-container">
      <Jumbotron>
        <Row>
          <Col xs={6} md={4}>
            <h3>HireXL</h3>
            <address>
              336 Udyog Vihar, Phase IV
              <br />
              Gurugram <br />
              Haryana - 122022 <br />
            </address>
          </Col>
          <Col xs={6} md={2}>
            <h5>About</h5>
            <ul>
              <li>
                <a href="#!">About</a>
              </li>
              <li>
                <a href="#!">Careers</a>
              </li>
              <li>
                <a href="#!">Blog</a>
              </li>
              <li>
                <a href="#!">FAQ</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h5>My Account</h5>
            <ul>
              <li>
                <a href="#!">My Account</a>
              </li>
              <li>
                <a href="#!">Terms and Conditions</a>
              </li>

              <li>
                <a href="#!">Privacy Policy</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <h5>Stay Tuned</h5>
            <p>Connect and Stay in the loop</p>
            <ul>
              <li>
                <a href="#!">Facebook</a>
              </li>
              <li>
                <a href="#!">LinkedIn</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ color: "white" }}>
            <hr />
          </Col>
        </Row>

        <Row className="bottom">
          <div className="">
            Copyright &copy; 2019. HireXL All rights reserved
          </div>
          <div className="">
            Designmed and Developed by{" "}
            <a href="https://github.com/avchhikara">Avnish</a>
          </div>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default Footer;
