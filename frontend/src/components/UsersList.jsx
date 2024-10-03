import React, { useEffect, useState } from "react";
import classes from "../styles/UsersList.module.css";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const authData = useRouteLoaderData('admin')
  const [userError, setUserError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const fetchUsers = async () => {
        try{
            const response = await axios.get("http://localhost:8080/api/users/",{
                headers : {
                    'Authorization' : "Bearer " + authData.token
                }
            })


            if(response && response.status === 200){
                setUsers(response.data);
                setLoading(false);
                setUserError(null);
            }
        }catch(error){
            console.error(error);
            setUserError("Error loading data, Try again later.");
            setLoading(false);
        }
    }
    fetchUsers();
  }, [])

  return (
    <div className={classes.section}>
      <div className={classes.container}>
      <caption className={classes.caption}>User Accounts</caption>
        {loading ? <p className="alert">Loading..</p> : userError !== null ? (<p>{userError}</p>) : (
          <div className={classes.tableWrapper}>
            <table className={classes.table}>
            <thead className={classes.tableStyle}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody className={classes.tableStyle}>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{(user.roles || []).join(', ')}</td> 
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  );
}
