import React from 'react'
import Auth from './Auth'
import CreateAccount from './CreateAccount'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { json, redirect } from 'react-router-dom';

export default function AuthLayout() {
const [searchParams] = useSearchParams();
  const showLogin = searchParams.get("login") === "true";
  return (
    <div>
      {showLogin ? <Auth /> : <CreateAccount />}
    </div>
  )
}


export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log(authData)

  try {
    const response = await axios.post("http://localhost:8080/authenticate", authData);

    if (response.status === 200) {
      console.log("login response: ", response)
      localStorage.setItem("token", response.data.jwtToken);
      localStorage.setItem("roles", response.data.userRoles);
      return redirect("/");
    } else if (response.status === 401) {
      return json({ message: "Invalid username or password." }, { status: response.status });
    } else if (response.status === 422) {
      return json({ message: "Validation error. Please check your input and try again." }, { status: response.status });
    } else {
      return json({ message: "Unexpected error occurred. Please try again later." }, { status: response.status });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = status === 401
        ? "Invalid username or password."
        : "Unexpected error occurred. Please try again later.";
      return json({ message }, { status });
    } else {
      return json({ message: "Unexpected error occurred. Please try again later." }, { status: 500 });
    }
  }
}
