import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBarDrawer from '../AppBarDrawer';
import {MenuItem, TextField, Typography } from '@material-ui/core';
import avatar from '../../../images/avatar.png'
import { useStyles } from '../Privacy/PrivacyStyle';
import { useState } from 'react';

const Privacy = () => {
    const classes = useStyles();

    const [privacy, setPrivacy] = useState("");
    console.log(privacy);

    const handleChange = (e) => {
        const newPrivacy = {...privacy}
        newPrivacy[e.target.name] = e.target.value
        setPrivacy(newPrivacy)
        
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className={classes.paper}>
                            <img className="pt-2" style={{ margin: ' 0 auto ' }} width="20%" src={avatar} alt="" />
                            <Typography component="body1" variant="body1">
                                Privacy
                            </Typography>
                            <Typography component="body1" variant="body1">
                                Who can see your contact information?
                            </Typography>
                            <form className={classes.form} noValidate>
                                {/* <div style={{ margin: '1rem 0' }}>
                                    <label htmlFor=""> Name </label>
                                    <TextField
                                        style={{ borderRadius: '4px' }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        placeholder="Marie Winter"
                                    />
                                   
                                </div> */}

                                <label htmlFor="" style={{ margin: '1rem 0' }}> Name </label>
                                <div className="input-group">
                                    <input style={{ width: '65%' }} defaultValue="Marie Winter" type="text" class="form-control" aria-label="Text input with dropdown button" />
                                    <select class="form-control" name="name" id="name" onChange={handleChange}>
                                        <option> Private </option>
                                        <option> Public </option>
                                    </select>
                                </div>
                                <br/>
                                <label htmlFor=""> Email </label>
                                <div className="input-group">
                                    <input style={{ width: '65%' }} defaultValue="mariewinter@email.com" type="text" class="form-control" aria-label="Text input with dropdown button" />
                                    <select class="form-control" name="email" id="email" onChange={handleChange}>
                                        <option> Private </option>
                                        <option> Public </option>
                                    </select>
                                </div>
                                
                            </form>
                            
                        </div>
                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default Privacy;