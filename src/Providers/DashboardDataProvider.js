import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const DashboardDataContext = createContext({ client: 'loading' })

const DashboardDataProvider = (props) => {
    const [count, setCount] = useState('loading')
    const { children } = props
    useEffect(() => {
        Axios.get(`${key}clients`)
            .then(res => {
                setCount(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
    }, [])

    return (
        <DashboardDataContext.Provider value={{ clients: count, setClients: setCount }}>
            { children }
        </DashboardDataContext.Provider>
    );
};

export default DashboardDataProvider;