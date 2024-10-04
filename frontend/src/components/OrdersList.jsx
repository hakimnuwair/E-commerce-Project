import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import classes from "../styles/OrderList.module.css"

export default function () {
    const [orders, setOrders] = useState([]);
    const [orderLoading, setOrderLoading] = useState(true);
    const [orderError, setOrderError] = useState(false);

    const authData = useRouteLoaderData('admin');
    useEffect(()=>{
        const fetchOrders = async () =>{
            setOrderLoading(true)
            setOrderError(false);
            try{
                const response = await axios.get("http://localhost:8080/order",{
                    headers : {
                        "Authorization" : `Bearer ${authData.token}`
                    }
                })
                if(response && response.status === 200){
                    console.log(response.data)
                    setOrders(response.data);
                    setOrderLoading(false);
                    setOrderError(false);
                }
            }catch(error){
                setOrderLoading(false);
                setOrderError(true);
                console.error(error);
            }
        }
        fetchOrders();
    },[])

    if(orderLoading){
        return <div className={classes.section}>Loading</div>
    }
    if(orderError){
        return <div className={classes.section}>Error loading data.</div>
    }

  return (
    <>
    <div className={classes.section}>
        <div className={classes.container1}>
            <div className={classes.caption}>Order List</div>
            <div className={classes.tableWrapper}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Number</th>
                            <th>User ID</th>
                            <th>Order Placed Date</th>
                            <th>Order Status</th>
                            <th>Order Items ID</th>
                            <th>Delivery Address ID</th>
                            <th>Net Amount</th>
                            <th>Payment Type</th>
                            <th>Payment Status</th>
                            <th>Payment Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.orderNumber}</td>
                            <td>{order.userId}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.orderStatusHistoryList[order.orderStatusHistoryList.length-1].statusName}</td>
                            <td>{order.orderItemDTOList.map((item) => (`${item.productId},`))}</td>
                            <td>{order.shippingAddressDTO.id}</td>
                            <td>{order.netAmount}</td>
                            <td>{order.paymentType}</td>
                            <td>{order.paymentStatus}</td>
                            <td>{order.paymentTransactionId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>









    // <>
    // {orders.map((order, index) => (
    //     <div key={index}>
    //        <p>{order.orderNumber}, {order.totalAmount}</p>
    //     </div>
    // ))}
    // </>
  )
}
