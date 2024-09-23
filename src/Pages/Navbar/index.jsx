import './style.css';
import React from 'react';
import NavLinkCom from './components/NavLinkCom/index';
import { Link } from "react-router-dom";
let navLinks = [
  {name:"Home" , path:"home"},
  {name:"Movies" , path:"movies"},
  {name:"Stars" , path:"stars"},
  {name:"TV" , path:"tvs"},
];
export default function Navbar({logOut}) {
  return (
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">Movies Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {localStorage.getItem("Token")!=null&&
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {navLinks.map((link)=>(
            <NavLinkCom key={link.name} link={link}/>
            ))}
          </ul>}
          <ul className="navbar-nav text-white align-items-center ms-auto mb-2 mb-lg-0">
            {localStorage.getItem("Token")!=null&&
            <li className="nav-item fs-4">
            <Link to={"https://facebook.com"}><i className="me-3 text-white fa-brands fa-facebook"></i></Link>
            <Link to={"https://x.com"}><i className="me-3 text-white fa-brands fa-twitter"></i></Link>
            <Link to={"https://instagram.com"}><i className="me-3 text-white fa-brands fa-instagram"></i></Link>
            </li>}
            {localStorage.getItem("Token")==null&&
            <>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="login">
                  Login
                </Link>
              </li>
            </>}
            {localStorage.getItem("Token")!=null&&<li className="nav-item logOut" onClick={logOut}>LogOut</li>}
          </ul>
        </div>
      </div>
    </nav>
  )
}