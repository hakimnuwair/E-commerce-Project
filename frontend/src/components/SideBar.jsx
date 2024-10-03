import React, { useEffect, useRef, useState } from "react";
import "../styles/SideBar.css";
import { Form, Link } from "react-router-dom";

export default function SideBar({ handleNav, isActive, handleMenuClick }) {
  const navRef = useRef(null);

  // useEffect(()=>{
  //   function handleClickOutside (event){
  //     if(navRef && !navRef.current.contains(event.target)){
        
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // },[navRef])


  return (
    <>
      <div className={`overlay-helper lay ${isActive ? "active" : null}`}></div>
      <div ref={navRef} className={`sidebar ${isActive ? "active" : null}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="close-icon"
          style={{ width: "24px", height: "24px" }}
          onClick={handleMenuClick} // You can add a function here to close the nav.
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>

        <div className="sidebar-container">
          <ul className="sidebar-options">
          <li className="home-link">
              <Link
                className="sidebar-link"
                to={"/"}
              >
                Back To E-commerce
              </Link>
            </li>
            <li>
              <Link
                className="sidebar-link"
                onClick={() => handleNav("Upload")}
              >
                Upload Product
              </Link>
            </li>
            <li>
              <Link
                className="sidebar-link"
                onClick={() => handleNav("Products")}
              >
                Product List
              </Link>
            </li>
            <li>
              <Link className="sidebar-link" onClick={() => handleNav("Users")}>
                Users Lists
              </Link>
            </li>
            <li>
              <Link
                className="sidebar-link"
                onClick={() => handleNav("discount")}
              >
                Discount
              </Link>
            </li>
            <li>
              <Link
                className="sidebar-link"
                onClick={() => handleNav("CategoryList")}
              >
                Category List
              </Link>
            </li>
            <li>
              <Link className="sidebar-link" onClick={() => handleNav("orders")}>
                Order Lists
              </Link>
            </li>
            <li className="logout-link">
              <Form action="/logout" method="POST"
                className="sidebar-link"
                to={"/logout"}
              >
                <button className="logout-button" type="submit">Logout</button>
              </Form>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
