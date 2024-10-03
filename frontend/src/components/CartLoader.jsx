import React from 'react'
import Cart from './Cart'
import getAuthenticationToken from '../util/getAuthenticationToken';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export default function CartLoader() {
  return (
    <Cart />
  )
}
export const loader = async () => {
    console.log("cart loader");
    const {token} = getAuthenticationToken();
    if(token === null){
        return null;
    }
    console.log("authData in loader", token);
    try{
        const response = await axios.get("http://localhost:8080/cart",
            {
                headers : {
                    Authorization : 'Bearer ' +  token
                }
            });
            if(response.status === 200){
                return response.data;
            }else{
                return null;
            }
    }catch(error){
        return null;
    }
}
