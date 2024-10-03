import React, { useEffect, useRef, useState,  } from "react";
import { Form, Link, useLoaderData, useLocation } from "react-router-dom";
import logo from "../imgs/IMG_20240610_160027.jpg";
import "../styles/nav.css";
import SearchNav from "./SearchNav";

function Nav() {
  const navSectionRef = useRef(null);
  const stickyStartRef = useRef(null);
  const authData = useLoaderData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  console.log("location: ", location);

  useEffect(() => {
    const stickyStartEl = document.querySelector(".sticky-helper");
    const obs = new IntersectionObserver(
      function (entries) {
        console.log(entries[0]);
        const entry = entries[0];
        if (entry.isIntersecting) {
          document.body.classList.remove("sticky");
        } else {
          document.body.classList.add("sticky");
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-110px",
      }
    );
    obs.observe(stickyStartEl);
    // return () => {
    //   obs.disconnect();
    // };
  }, []);

  

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

   // Close menu when clicking outside of it
   useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);


  return (
    <>
      <div className={`nav-section`}>
        <SearchNav />
        <div ref={navRef} className="main-nav" style={{ backgroundColor: "#2874f0" }}>
          <div className="z-index-helper">
          <ul className={`category-nav  ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watches">Watches</Link>
            </li>
            <li>
              <Link to="/goggles">Goggles</Link>
            </li>
            <li>
              <Link to="/perfumes">Perfumes</Link>
            </li>
            <li>
              <Link to="/bodysprays">Body Spray</Link>
            </li>
            {/* <li><Link to="/uploads">Upload Product</Link></li>
        <li><Link to="/test">Test</Link></li> */}
            {authData.roles.includes("ADMIN") && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
          </ul>
          </div>
          <div className="fa fa-bars hamburger" onClick={()=>setIsMenuOpen(prevState => !prevState)}>
          </div>
        </div>
      </div>
      <div className={`overlay ${isMenuOpen ? 'active' : ''}`}/>
      <div className="sticky-helper" ref={stickyStartRef}></div>
    </>
  );
}

export default Nav;
