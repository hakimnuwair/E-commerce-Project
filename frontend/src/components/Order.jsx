import React, {useState, useEffect} from 'react'
import Orders from './Orders'
import axios from 'axios';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import classes from "../styles/Order.module.css"
import svg from "../imgs/no-illustration.svg"

export default function Order({order}) {

  const authData = useRouteLoaderData("root");
  const [orders, setOrders] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchOrders = async () => {
      setOrderLoading(true);
      setErr(false);
      try {
        const response = await axios.get("http://localhost:8080/order-user", {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        if (response && response.status == 200) {
          console.log(response.data);
          setOrders(response.data);
          setOrderLoading(false);
        } else {
          console.error(response.error);
          setOrderLoading(false);
          setErr(true);
        }
      } catch (error) {
        console.error(error);
        setErr(true);
        setOrderLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if(orderLoading){
    return <>Loading...</>;
  }

  if (orders && orders.length === 0) {
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <h2 className={classes.noOrdersTitle}>You haven't placed any orders yet!</h2>
          <p className={classes.noOrdersText}>Start exploring our wide range of products and find something you love.</p>
          <button className={classes.browseButton} onClick={() => navigate("/")}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  if(err){
    return (
      <div className="alert alert-info" style={{width: "90%", margin: "1rem auto"}} role="alert">
        Error Loading Order, Please Try Again Later
        </div>
    )
  }
  

  return (
    <>
     {orders.map((order) => (
            <Orders key={order.orderId} order={order} />
          ))
          }
    </>
  )
}
