import React, { useState } from 'react';
import { Checkbox, Container, CssBaseline, Divider, FormControlLabel, FormGroup, Grid, InputBase } from '@material-ui/core';
import { useStyles } from './SearchFilterStyle';
import './SearchFilter.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SentFilter from '../SentFilter/SentFilter';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './SearchFilter.css'

const SearchFilter = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const date = new Date()
    const [scheduleDate, setScheduleDate] = useState(date.setDate(date.getDate()))
    console.log("schedule date", scheduleDate);
    const handleScheduleDate = (date) => {
        setScheduleDate(date.toDateString());
    };
    // check box state
    const [checkBox, setCheckBox] = useState({
        quickReply: false,
        // noReply: false,
        setRemainder: false,
        setDeadLine: false
    });

    // checkbox handle
    const handleChange = (event) => {
        setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    };

    const handleDate = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className="input-group" style={{ width: '53rem' }}>
                            {/* <SearchIcon color="primary" /> */}
                            {/* <input type="text" className="form-control" placeholder="Search..."
                                style={{ borderRadius: '1rem' }}
                            /> */}
                            <div className={classes.search}>
                                <div className={classes.searchIcon} >
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    style={{ color: '#2d2d2d' }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <div class="input-group-btn">
                                <div class="btn-group" role="group">
                                    <div class="dropdown dropdown-lg" id="dropdown-icon">
                                        <FilterListIcon
                                            color="primary"
                                            // onClick={() => setOpenFilter(!openFilter)}
                                            type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"
                                        />
                                        {/* <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button> */}
                                        <div class="dropdown-menu dropdown-menu-right" role="menu">
                                            <form>
                                                <div>
                                                    <label> Select Tag </label>
                                                    <FormGroup row style={{ color: '#fff' }} className="d-flex flex-column">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={checkBox.quickReply}
                                                                    onChange={handleChange}
                                                                    name="quickReply"
                                                                    style={{ color: '#4195D1' }}
                                                                />}
                                                            label="Quick Reply (10)"
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
                                                            label="No Reply (14)"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={checkBox.setDeadLine}
                                                                    onChange={handleChange}
                                                                    name="setDeadLine"
                                                                    style={{ color: '#4195D1' }}
                                                                />
                                                            }
                                                            label="Schedule Date (22)"
                                                        />
                                                    </FormGroup>

                                                </div>
                                                <br />
                                                <div>
                                                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <Grid container justify="space-around">
                                                            <KeyboardDatePicker
                                                                margin="normal"
                                                                id="date-picker-dialog"
                                                                variant="inline"
                                                                label="Select Remainder"
                                                                format="MM/dd/yyyy"
                                                                disablePast="true"
                                                                value={scheduleDate}
                                                                onChange={handleScheduleDate}
                                                                style={{ backgroundColor: '#fff' }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider> */}
                                                    <div className="pb-2">
                                                        <label> Select Date </label>
                                                        <br />
                                                        <input onBlur={handleDate} name="date" type="date" className="dateInput" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Container>
            </main>
            <Container>

            </Container>
        </React.Fragment>
    );
};

export default SearchFilter;