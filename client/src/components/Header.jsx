import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ArrowCounterclockwise, PersonFill } from "react-bootstrap-icons";

const Header = () => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ backgroundColor: "black", color: "white", padding: "10px 0" }}
    >
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
      >
        Home
      </Link>
      <Link
        to="/report"
        style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
      >
        Report Missing People
      </Link>
      <Link
        to="/login"
        style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
      >
        Find Missing People
      </Link>
      <Link
        to="/contact"
        style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
      >
        Contact Us
      </Link>
      <Link
        to="/about"
        style={{ color: "white", textDecoration: "none", margin: "0 10px" }}
      >
        About Us
      </Link>

      {/* Add a dropdown menu for logging out */}
      <Dropdown className="d-flex justify-content-center">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "24px", // Increase the font size
          }}
        >
          <PersonFill style={{ color: "white", fontSize: "24px" }} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/login">
            <ArrowCounterclockwise /> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Header;
