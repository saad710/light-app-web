import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const ClientContext = createContext({ client: 'loading' })

const ClientProvider = (props) => {
    const [clients, setClients] = useState('loading')
    const { children } = props
    useEffect(() => {
        Axios.get(`${key}clients`)
            .then(res => {
                setClients(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
    }, [])

    return (
        <ClientContext.Provider value={{ clients, setClients }}>
            { children }
        </ClientContext.Provider>
    );
};

export default ClientProvider;