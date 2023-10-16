import React from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <Nav variant="tabs" className="custom-nav">
        <Nav.Item>
          <Link to="/home/users" eventkey="1" className="nav-link">
            Users
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/home/companies" eventkey="2" className="nav-link">
            Companies
          </Link>
        </Nav.Item>
      </Nav>

      <div className="user-info">
        <span>{loading ? "Loading..." : userInfo && userInfo.user.name}</span>
        <button onClick={logoutHandler}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
