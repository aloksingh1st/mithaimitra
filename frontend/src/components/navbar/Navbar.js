import React, { useState } from "react";
import "./navbar.css";
import { BiSearchAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import UserOptions from "../layout/UserOptions";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Search from "../layout/Search";

import { ImCross } from "react-icons/all";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const {isAuthenticated, user} = useSelector((state)=>state.user)

  const [open, setOpen] = useState(false);

  const handleDialog = ()=>{
    setOpen(!open);
  }

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
              <p  style={{"cursor":"pointer"}} onClick={handleDialog}>
                <BiSearchAlt />
              </p>
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
      
      <Dialog open={open} onClose={handleDialog} className="SearchDialog">

         <DialogContent>
          <DialogContentText>
         < Search />
         <ImCross onClick={handleDialog} id="exit_button" size={30}/>
         ................................................................................................................................................................................................
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog} color="primary">
           Close
          </Button>
          {/* <Button onClick={handleDialog} color="primary" autoFocus>
           Yes
          </Button> */}
        </DialogActions>
      </Dialog>

      </nav>
    </>
  );
};

export default Navbar;
