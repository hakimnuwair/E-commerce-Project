import React, { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import SignIn from "./SignIn";
import LoginSummary from "./LoginSummary";
import SignUp from "./SignUp";

export default function LoginProcess({
  userDetails,
  handleUserChange,
  Login,
  handleChangeLogin,
  handleProcessNo,
  handleOrderSummary,
}) {
  
  const authData = useRouteLoaderData("root");
  const [authStauts, setAuthStatus] = useState("logIn");
  console.log("this userDetails: ",userDetails);
  console.log("this authdata: ",authData);

  const handleAuthStatus = (status) => {
    setAuthStatus(status);
  };

  const handleUseThis = () => {
    handleAuthStatus("logIn");
    handleUserChange(null);
    handleProcessNo(2);
    handleOrderSummary(false);
  };

  return (
    <>
      {authData.token === null || userDetails !== null ? (
        <>
          <div className="order-header-color">
            <div className="order-headers">
              <div className="">1</div>
              <div className="">LOGIN OR SIGNUP</div>
            </div>
          </div>
          <div className="login-section">
            {userDetails != null ? (
              <div
                className="existing-id-msg"
              >
                <p className="existing-msg">
                  Currently loggedIn User: {userDetails}{" "}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={handleUseThis}
                  style={{ height: "30px" }}
                >
                  USE EXISTING
                </button>
                <div className="or-helper"></div>
              </div>
            ) : null}
            <div className="login-content">
              {authStauts === "logIn" ? (
                <Login
                  handleAuthStatus={handleAuthStatus}
                  handleChangeLogin={handleChangeLogin}
                  handleUserChange={handleUserChange}
                />
              ) : (
                <>
                  <div className="sign-in-form">
                    <SignUp handleAuthStatus={handleAuthStatus} />
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <LoginSummary
          authData={authData}
          handleUserChange={handleUserChange}
          handleProcessNo={handleProcessNo}
        />
      )}
    </>
  );
}
