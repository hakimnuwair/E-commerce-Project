import React from 'react'
import logo from "../imgs/IMG_20240610_160027.jpg";
import { useLoaderData, Link, Form } from 'react-router-dom';

export default function SearchNav() {
    const authData = useLoaderData('root');
  return (
    <>
    <div className="search-nav">
          <div className="search-nav-container">
            <ul className="search-nav-contents">
              <li className="logo-div">
                <img
                 className="logo-image"
                  src={logo}
                  alt="company logo"
                  height="50px"
                  width="200px"
                />
              </li>
              {authData.token ? (
                <li className="login-option-div right-container">
                  <div>
                    <Link to="/cart" style={{ textDecoration: "none" }}>
                    <i className="fas fa-shopping-cart"></i>
                      <span className="nav-text">Cart</span>
                    </Link>
                  </div>
                  {authData.token !== null ? (
                    <div>
                      <Link to="/order-overview" style={{ textDecoration: "none" }}>
                      <i className="fas fa-shopping-basket"></i>

                        <span className="nav-text">Orders</span>
                      </Link>
                    </div>
                  ) : null}
                  <Form action="/logout" method="POST">
                    <button className="right-helper" type="submit">
                    <i class="fas fa-user"></i>
                    <button className="login-btn">Logout</button>
                    </button>
                  </Form>
                </li>
              ) : (
                <li className="login-option-div right-container">
                  <div>
                    <Link to="/cart" style={{ textDecoration: "none" }}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="nav-text">Cart</span>
                    </Link>
                  </div>
                  <Link to="/account?login=true">
                  <div className="right-helper">
                    <i class="fas fa-sign-in-alt icon"></i>
                    <button className="login-btn">Login</button>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
    </>
  )
}

