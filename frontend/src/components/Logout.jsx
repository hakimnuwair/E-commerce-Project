import { redirect } from "react-router-dom";

export function action () {
    localStorage.clear("token");
    localStorage.clear("roles");
    localStorage.clear("userId");
    return redirect('/');
}