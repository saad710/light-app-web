import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const LoggedInContext = createContext({ loggedIn: 'loading' })

const LoggedInProvider = (props) => {
    const [loggedInUser, setLoggedInUSer] = useState(null)
    const { children } = props
    useEffect(() => {
        Axios.get(`${key}clients`)
            .then(res => {
                const data = res.data
                const client = data.filter(client => client.email === localStorage.client)
                setLoggedInUSer(client[0])
            })
    }, [])

    return (
        <LoggedInContext.Provider value={{ loggedInUser }}>
            { children }
        </LoggedInContext.Provider>
    );
};

export default LoggedInProvider;