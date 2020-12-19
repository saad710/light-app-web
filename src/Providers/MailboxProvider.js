import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../apiKey';
const { createContext } = require("react");

export const MailboxContext = createContext({ mailbox: 'loading' })

const MailboxProvider = (props) => {
    const [singleClient, setSingleClient] = useState({})
    const [allMail, setAllMail] = useState(null)
    const [groupsMail, setGroupsMail] = useState(null)
    const { children } = props
    const client_id = singleClient && singleClient.id
    useEffect(() => {
        Axios.get(`${key}clients`)
            .then(res => {
                const data = res.data
                const client = data.filter(client => client.email === localStorage.client)
                setSingleClient(client[0])
            })
            
        Axios.get(`${key}client-all-mail/${client_id}`)
            .then(res => {
                // console.log(res);
                const mails = res.data.all_mail
                setAllMail(mails)
            })
            .then(err => {
                console.log(err);
            })
    }, [client_id])
    // useEffect(() => {
        
    // }, [])

      const reFetch = () => {
            Axios.get(`${key}client-all-mail/${client_id}`)
            .then((res) => {
                const mails = res.data.all_mail
                setAllMail(mails)
            })
            .catch((error) => {
                console.error(error);
            });
        };
 
  
    useEffect(() => {
        Axios.get(`${key}client-all-group-mail/${client_id}`)
            .then(res => {
                // console.log(res.data);
                setGroupsMail(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [client_id])

    return (
        <MailboxContext.Provider value={{ allMail, setAllMail, groupsMail, setGroupsMail,reFetch }}>
            { children }
        </MailboxContext.Provider>
    );
};

export default MailboxProvider;