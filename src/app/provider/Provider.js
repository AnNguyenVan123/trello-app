'use client'

import { createContext, useState } from "react"
const UserContext = createContext();
const Provider = ({ children, user,setUser }) => {



    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>)
}
export  { Provider, UserContext }