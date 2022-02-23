import React, { useState } from "react";
import "./navbar.css";
import { BiSearchAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import UserOptions from "../layout/UserOptions";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const {isAuthenticated, user} = useSelector((state)=>state.user)

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <figure>
            <a href="/">

            <img src="./images/logos.png" alt="" />
            </a>
          </figure>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">about</NavLink>
            </li>
            <li>
              <NavLink to="/products">products</NavLink>
            </li>
            <li>
              <a href="#footer">contact</a>
            </li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <NavLink to="/search">
                <BiSearchAlt />
              </NavLink>
            </li>
            <li className={isAuthenticated ? "visible_login" : null}>
              <NavLink to="/login">
                <CgProfile />
              </NavLink>
            </li>
            <li>
                {isAuthenticated && <UserOptions user={user}/>}
            </li>
          </ul>

          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
