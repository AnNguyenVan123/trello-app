'use client'

import { useEffect, useState } from "react"
import { Provider } from "../provider/Provider"
const UserProvider = ({ children, user_init }) => {
    const [user, SetUser] = useState(user_init)

    return (
        <Provider user={user} setUser={SetUser}>
            {children}
        </Provider>)
}
export default UserProvider