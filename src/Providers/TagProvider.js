import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const TagContext = createContext({ allTag : 'loading' })

const TagProvider = (props) => {
    const [allTag, setAllTag] = useState(null);
    const { children } = props
    useEffect(() => {
        Axios(`${key}tag-all`)
            .then(res => {
                const tags = res.data
                setAllTag(tags)
            })
            .then(err => {
                console.log(err);
            })
    }, [])


    const reFetch = () => {
        Axios(`${key}tag-all`)
            .then(res => {
                const tags = res.data
                setAllTag(tags)
            })
            .then(err => {
                console.log(err);
            })
    }

    return (
        <TagContext.Provider value={{allTag, setAllTag, reFetch  }}>
            { children }
        </TagContext.Provider>
    );
};

export default TagProvider;