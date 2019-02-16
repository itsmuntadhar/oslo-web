import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class NavBarComponent extends Component {
    render() {
        var links = [
            <Nav.Link key="0" href="/">
                home
            </Nav.Link>,
        ];

        var key = localStorage.getItem("key");
        if (key !== undefined && key != "undefined" && key != null) {
            links.push(
                <Nav.Link key="1" href="/addword">
                    new word
                </Nav.Link>,
            );
            links.push(
                <Nav.Link key="2" href="/logout">
                    logout
                </Nav.Link>,
            );
        } else {
            links.push(
                <Nav.Link key="3" href="/login">
                    login
                </Nav.Link>,
            );
            links.push(
                <Nav.Link key="4" href="/register">
                    register
                </Nav.Link>,
            );
        }
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#">Oslo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">{links}</Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBarComponent;
