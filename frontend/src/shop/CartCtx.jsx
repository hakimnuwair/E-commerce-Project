import { createContext } from "react";

export const CartCtx = createContext({
    items : [],
    addCartError : null,
    addCartErr : null,
    addCartNotify : null,
    fetchCartError : null,
    handleAddCartError : ()=>{},
    handleAddCartErr : ()=>{},
    handleAddCartNotify : ()=>{},
    addItems : () => {},
    handleRemove: () => {},
    handleIncrease: () => {},
    handleDecrease: () => {},
    handleAdd: () => {},
    deleteProduct : () => {},
    handleOrderSuccessful : () => {},
})