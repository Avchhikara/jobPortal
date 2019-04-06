import React from "react";

import "./Header.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="header-container">
        <Navbar color="light" light id="header" expand="md">
          <NavbarBrand href="/" className="header__nav-brand">
            HireXL
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#!">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#!">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#!">Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#!">Applied Jobs</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
