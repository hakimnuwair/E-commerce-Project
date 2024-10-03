import { createContext } from "react";

export const AuthCheckCtx = createContext({
    token : "",
    roles : "",
    getAuthentction : () => {}
}
)