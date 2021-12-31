import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = () => {
  // eslint-disable-next-line
  const { state, dispatch } = useContext(UserContext);
  const Menu = () => {
    if (!state) {
      return (
        <>
          <span class="navbar-brand mb-0 h1">NOTES</span>
        </>
      );
    } else {
      return (
        <>
          <span class="navbar-brand mb-0 h1">NOTES</span>
          <button class="btn btn-outline-success">
            <NavLink to="/logout" style={{ color: "white" }}>
              LOG OUT
            </NavLink>
          </button>
        </>
      );
    }
  };
  return (
    <div>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
