import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import LoginMenu from "../components/LoginMenu";

import { selectIsAuthenticated, selectUser } from "../store/auth-slice";
import { selectCategories } from "../store/category";

const NavMenu = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUser)?.name;
  const categories = useSelector(selectCategories);

  useEffect(() => {
    console.log('effect will run once');
    const fetchListCategory = async () => {
      try {
        const res = await axios.get('https://192.168.1.5:7502/api/Categories')
  
        console.log(res.data);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchListCategory();
}, []);

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand as={Link} to={`/`}>
          BShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              {categories.map((category) => (
                <NavDropdown.Item key={category.id} as={Link} to={`/category/${category.id}`}>
                  {category.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <LoginMenu isAuthenticated={isAuthenticated} userName={userName} />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default NavMenu;
