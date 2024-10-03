import { createContext } from "react";

export const AdminNavCtx = createContext(
    {
        isActive : null,
        handleMenuClick : ()=>{},
    }
)