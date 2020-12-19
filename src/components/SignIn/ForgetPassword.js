import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { key } from '../../apiKey';
import './SignIn.css';


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    signInRight: {
        width: '100vh',
        // backgroundColor: '#213F7E'
        backgroundImage: "linear-gradient(#213F7E, #4195D1)",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        marginTop: '130px'

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: '#2d2d2d'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#213F7E',
        borderRadius: '0.5rem',
        padding: '0.5rem 0'
    },
}));

export default function ForgetPassword() {
    const classes = useStyles();
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState({
        email: ''
        // password: ''
    })
    console.log(loggedIn)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (loggedIn.email) {
            console.log(loggedIn.email);
            const loginData = {
                email: loggedIn.email,
                // password: loggedIn.password
            }
            console.log(loginData);
            Axios.post(`${key}client-generate-password`, loginData)
                .then(res => {
                    console.log(res.data);
                    // if (res.data.login_status === "success") {
                    //     history.push("/dashboard");
                    // }
                    // else {
                    // }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.signInRight} >
                <div style={{ margin: '8.5rem 0' }}>
                    <Typography variant="h6" style={{ textAlign: 'center', color: '#fff', fontSize: '52px' }}>
                        Welcome to <br /> Client Web App
                </Typography>
                    <Typography
                        style={{
                            width: '60%',
                            color: '#fff',
                            fontSize: "14px",
                            textAlign: 'center',
                            margin: '2rem auto',
                            fontWeight: 'normal'
                        }}>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square
                style={{ backgroundColor: '#fff' }}
            >
                <div className={classes.paper}>
                    <Typography component="h1" variant="body1" style={{ color: '#2d2d2d' }}>
                        Type your email
                    </Typography>
                    <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor=""> Email </label>
                            <TextField
                                style={{ backgroundColor: '#fff' }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="user@email.com"
                                onChange={(e) => setLoggedIn({ ...loggedIn, email: e.target.value })}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            GET NEW PASSWORD
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}