import axios from "axios";
import { redirect } from "react-router-dom";

export default function getAuthenticationToken() {
    const token = localStorage.getItem("token");
    const roles = (localStorage.getItem("roles")) || [];
    return { token, roles};
  }


export function loader() {
    return new Promise((resolve) => {
      resolve(getAuthenticationToken());
    });
  }

export function checkAdminAuthorizationLoader() {
  const {token , roles} = getAuthenticationToken();
  if(!token || !(roles.includes("ADMIN"))){
    return redirect("/");
  }else{
    return getAuthenticationToken();
  }
}