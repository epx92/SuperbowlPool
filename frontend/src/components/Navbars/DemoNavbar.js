/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
  


class DemoNavbar extends React.Component {
  
  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("../../assets/img/brand/orgone-react-white.png")}
                />
              </NavbarBrand>
              
              <Button 
                      className="btn-neutral btn-icon"
                      color="default"
                      href="/"
                      target="_blank">
                      <span className="btn-inner--icon">
                        <i className="fa fa-exchange mr-2" />
                      </span>
                      <span className="nav-link-inner--text ml-1">
                        Connect
                      </span>
                    </Button>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
