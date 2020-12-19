import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const ComposeContext = createContext({ compose: 'loading' })

const ComposeProvider = (props) => {
    const [compose, setCompose] = useState('loading')
    const [groups, setGroups] = useState('loading')
    const [allTag, setAllTag] = useState(null);
    const { children } = props
    useEffect(() => {
        Axios.get(`${key}clients`)
            .then(res => {
                setCompose(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
        Axios.get(`${key}all-group`)
            .then(res => {
                setGroups(res.data)
            })
            .catch(err =>{
                console.log(err);
            })
        Axios(`${key}tag-all`)
            .then(res => {
                const tags = res.data
                setAllTag(tags)
            })
            .then(err => {
                console.log(err);
            })
        
    }, [])

    return (
        <ComposeContext.Provider value={{ groups, allTag }}>
            { children }
        </ComposeContext.Provider>
    );
};

export default ComposeProvider;