import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom';

export default function () {
    const [orders, setOrders] = useState([]);
    const authData = useRouteLoaderData('admin');
    useEffect(()=>{
        const fetchOrders = async () =>{
            try{
                const response = await axios.get("http://localhost:8080/order",{
                    headers : {
                        "Authorization" : `Bearer ${authData.token}`
                    }
                })
                if(response && response.status === 200){
                    setOrders(response.data);
                }
            }catch(error){
                console.error(error);
            }
        }
        fetchOrders();
    },[])
  return (
    <>
    {orders.map((order, index) => (
        <div key={index}>
           <p>{order.orderNumber}, {order.totalAmount}</p>
        </div>
    ))}
    </>
  )
}
