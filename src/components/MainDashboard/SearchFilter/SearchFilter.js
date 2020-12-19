import DateFnsUtils from '@date-io/date-fns';
import { Checkbox, Container, CssBaseline, FormControlLabel, FormGroup, Grid, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import Axios from 'axios';
import 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { key } from '../../../apiKey';
import { LoggedInContext } from '../../../Providers/LoggedInProvider';
import { MailboxContext } from '../../../Providers/MailboxProvider';
import './SearchFilter.css';
import { useStyles } from './SearchFilterStyle';

const SearchFilter = () => {
    const { loggedInUser } = useContext(LoggedInContext)
    const [id, setId] = useState(1)
    const { allMail, setAllMail, reFetch, groupsMail, setGroupsMail } = useContext(MailboxContext)
    console.log(id);
    useEffect(() => {
        setId(loggedInUser !== null && loggedInUser.id)
    }, [loggedInUser])

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleKeyword = (e) => {
        if(e.key === 'Enter') {
            const val = groupsMail !== null && groupsMail.filter(group => group.group_name.toLowerCase().includes(e.target.value.toLowerCase()) )
            setGroupsMail(val)
        }
        else{
            console.log('nothing');
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);
        const newDate = selectedDate.toLocaleDateString()
        console.log(newDate);
        Axios.post(`${key}search-mail-date-wise/${id}`, newDate )
            .then(res => {
                console.log(res);
                // console.log(res.data.status);
                // setAllMail(res.data.status)
            })
            .catch(err => {
                console.log(err);
            })
    };
    // check box state
    const [checkBox, setCheckBox] = useState({
        quickReply: false,
        noReply: false,
        setRemainder: false,
        setDeadLine: false
    });
    
    // const handleKeyword = (e) => {
    //     setKeywords(e.target.value)
        
    // }
    // useEffect(() => {
    //     keywords.length > 0 &&
    //     setGroupsMail(
    //         groupsMail.filter(
    //         (customer) =>
    //             customer.subject
    //             .toLowerCase()
    //             .includes(keywords.toLowerCase()) 
    //         )
    //     );
    // }, [groupsMail, keywords, setGroupsMail])



    // checkbox handle
    const handleChange = (event) => {
        setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    };

    const handleDate = (e) => {
        e.preventDefault();
        console.log("date value",e.target.value);
    }
        useEffect(() => {
            checkBox.quickReply && Axios.get(`${key}search-quick-reply/${id}`)
                .then(res => {
                    console.log("search-quick-reply",res.data);
                    setAllMail(res.data.status)
                    setGroupsMail(res.data.status)
                })
                .catch(err => {
                    console.log(err);
                })
            checkBox.noReply && Axios.get(`${key}search-no-reply/${id}`)
                .then(res => {
                    console.log("search-no-reply",res.data);
                    setAllMail(res.data.status)
                    setGroupsMail(res.data.status)
                })
                .catch(err => {
                    console.log(err);
                })
            checkBox.setRemainder && Axios.get(`${key}search-reminder/${id}`)
                .then(res => {
                    console.log("search-reminder",res.data);
                    setAllMail(res.data.status)
                    setGroupsMail(res.data.status)
                })
                .catch(err => {
                    console.log(err);
                })
        }, [checkBox.noReply, checkBox.quickReply, checkBox.setRemainder, id, setAllMail, setGroupsMail])
        
        
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <div className="input-group" id="searchRes">
                                <div className={classes.search}>
                                    <div className={classes.searchIcon} >
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        name="search"
                                        id="search"
                                        onKeyPress={handleKeyword}
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        style={{ color: '#2d2d2d' }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <FormGroup row style={{ color: '#2d2d2d', marginLeft: '1rem' }} className="d-flex flex-row">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkBox.quickReply}
                                                onChange={handleChange}
                                                size="small"
                                                name="quickReply"
                                                style={{ color: '#4195D1' }}
                                            />}
                                        label="Quick Reply"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkBox.noReply}
                                                onChange={handleChange}
                                                name="noReply"
                                                style={{ color: '#4195D1' }}
                                            />
                                        }
                                        label="No Reply"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checkBox.setRemainder}
                                                onChange={handleChange}
                                                name="setRemainder"
                                                style={{ color: '#4195D1' }}
                                            />
                                        }
                                        label="Remainder"
                                    />

                                    {/* <div className="pb-2" style={{color: '#2d2d2d'}}>
                                    <input onBlur={handleDate} name="date" type="date" className="dateInput"
                                        style={{ 
                                            color: '#2d2d2d',
                                            marginTop: '0.2rem',
                                            border: '1px solid gray',
                                            padding: '5px 6px',
                                            borderRadius: '0.5rem'
                                        }}
                                    />
                                </div> */}

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker

                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            // format="yyyy/MM/dd"
                                            margin="normal"
                                            id="date-picker-inline"
                                            // label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>


                                </FormGroup>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
            <Container>

            </Container>
        </React.Fragment>
    );
};

export default SearchFilter;