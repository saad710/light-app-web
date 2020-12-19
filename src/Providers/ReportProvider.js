import React, { useState } from 'react';
const { createContext } = require("react");

export const ReportContext = createContext({ group: 'loading' })

const ReportProvider = (props) => {
    const [reports, setReports] = useState('loading')
    const [groupMailId, setGroupMailId] = useState()
    const { children } = props
    // useEffect(() => {
    //     Axios.get(`${key}clients`)
    //         .then(res => {
    //             setReports(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <ReportContext.Provider value={{ groupMailId, setGroupMailId }}>
            { children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;