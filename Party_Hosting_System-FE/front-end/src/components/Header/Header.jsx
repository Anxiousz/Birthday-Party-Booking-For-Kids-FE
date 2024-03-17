import React, { useRef, useEffect, useState } from "react";
import {
  Container,
  Row,
  Button,
  Alert,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./header.css";
import Userimg from "../../assets/images/user-img.png";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/menufood",
    display: "Menu Food",
  },
  {
    path: "/post",
    display: "Post",
  },
];

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const isLoggedIn = !!sessionStorage.getItem("authToken");
  const userName = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("stick__header");
      } else {
        headerRef.current.classList.remove("stick__header");
      }
    });
  };
  // console.log(userName, userId, role, isLoggedIn,);
  const handleLogout = () => {
    // Remove session or perform any necessary logout logic here
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    <Alert>
      <h4 className="alert-heading">Your have Logout!</h4>
    </Alert>;
    // Redirect back to the homepage
    navigate("/home");
  };
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (isDarkTheme) {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  };
  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* ============== logo ============== */}
            <Link to="/home">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
            </Link>

            {/* ============== logo end ============== */}
            {/* ============== menu start ============== */}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ============== menu end ============== */}
            <div>
              <Button
                onClick={toggleTheme}
                className="btn primary__btn buttoncheck"
              >
                {isDarkTheme ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
            {isLoggedIn ? (
              <>
                {/* <div className="nav__right d-flex align-items-center gap-4">
                  <div className="nav__btns d-flex align-items-center gap-4">
                    <Button className="btn secondary__btn">
                      <Link to="/profile">
                        <i className="ri-user-line"></i>
                      </Link>
                    </Button>
                  </div>
                </div> */}
                <div className="nav__right d-flex align-items-center gap-2">
                  <div className="nav__btns d-flex align-items-center gap-2">
                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggle}
                      {...props}
                      id="dropdown-basic-button"
                      className="btn secondary__btn buttondropdown"
                    >
                      <DropdownToggle caret className="transparent-bg">
                        {/* <img
                          src={Userimg}
                          alt="Profile"
                          className="profile-image"
                        /> */}
                        {userName}
                      </DropdownToggle>

                      <DropdownMenu>
                        <DropdownItem header></DropdownItem>
                        <DropdownItem>
                        <Link to={`/profile/${userId}`}>Profile</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to="/bookinghistory">Booking History</Link>
                        </DropdownItem>
                        <DropdownItem onClick={handleLogout}>
                            Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  {/* <Button
                    onClick={handleLogout}
                    className="btn primary__btn buttoncheck"
                  >
                    Logout
                  </Button> */}
                </div>
              </>
            ) : (
              <div className="nav__btns d-flex align-items-center gap-4">
                <Button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </Button>
                <Button className="btn primary__btn">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
