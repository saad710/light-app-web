import React, { useEffect, useState } from 'react';
const { createContext } = require("react");

export const UserContext = createContext({ user: 'loading' })

const UserProvider = (props) => {
    const [user, setUser] = useState('loading')
    const { children } = props
    useEffect(() => {
        if(sessionStorage.getItem("client"))
            setUser(sessionStorage.getItem("client"))
        else setUser(null)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
};

export default UserProvider;