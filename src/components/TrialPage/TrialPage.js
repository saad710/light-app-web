import { Button, Container } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { key } from '../../apiKey';
import Payment from '../MainDashboard/Payment/Payment';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'auto',
        margin: '7rem auto'
    },
    paper: {
        display: 'flex',
        // flexDirection: 'column',
    },
    trialCard: {
        width: 250,
        color: '#fff !important',
        textAlign: 'center',
        borderRadius: '0',
        margin: '0 1rem',
        padding: '1.5rem 0'
    },
    ulBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#2F2E41',
        color: '#fff',
        width: '45%',
        margin: '1rem auto'
    },
    trialBtn: {
        backgroundColor: '#2d2d2d !important',
        color: '#fff',
        width: '45%',
        padding: '0.5rem 0',
        margin: 'auto',
        fontSize: '8px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

}));


const TrialPage = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [starter, setStarter] = useState([]);
    const [prof, setProf] = useState([]);
    const [advanced, setAdvanced] = useState([]);
    

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get(`${key}get-payment-package`)
            .then((res) => {
                console.log(res.data);
                setStarter(res.data[0]);
                setProf(res.data[1]);
                setAdvanced(res.data[2]);
            })
            .catch((err) => {
                console.log(err.message);
            })

        
    }, [])

    


    return (
        <React.Fragment>
            <Container>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    {/* <Grid item xs={false} sm={4} md={4} className={classes.paper} >
                <div style={{ width: '80%' }} className="container">
                    <Typography variant="h6" style={{fontSize: '32px'}}>
                        Start Your Free Trial
                    </Typography>
                    <Typography variant="body1"
                        style={{ 
                            fontSize: '14px',
                            color: '#707070',
                            margin: '0.5rem 0'
                        }}
                    
                    >
                        You will not be billed during your free trial.
                        To keep your account running after the trial end upgrade to
                        a paid option.
                    </Typography>
                    <Typography
                        style={{
                            fontSize: '14px',
                            color: '#707070',
                            margin: '0.5rem 0'
                        }}
                    >
                        <ul className="pt-3">
                            <li className="py-2"> 5 days trail </li>
                            <li className="py-2"> 10 emails per day </li>
                            <li className="py-2"> Limited Access </li>
                        </ul>
                    </Typography>
                    <Link to="/dashboard">
                        <Button className={classes.ulBtn} variant="contained" color="primary" size="small"> Continue </Button>
                    </Link>
                </div>
            </Grid> */}
                    
                    {/* {data.map((item, index) => (
                        <p>{ item.package_name}</p>
                    ))} */}

                   

                    <Grid item xs={12} sm={8} md={8} elevation={6} square style={{margin: '0 auto'}}>
                        <Typography variant="body1" className="mb-3">
                            Your are in Starter package valid till Jan, 2021. <Link to="/dashboard"> Go Back. </Link> To upgrade please select a package from bellow.
                        </Typography>
                        <div className={classes.paper}>
                            <Card className={classes.trialCard} variant="outlined" style={{ backgroundColor: '#213F7E' }}>
                                <CardContent>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                     
                                         {starter.package_name}
                            </Typography>
                                    <div style={{ padding: '2rem 0' }}>
                                        <Typography variant="h3"
                                            style={{
                                                fontSize: '60px',
                                                fontWeight: 'regular',
                                            }}
                                        >
                                            ${starter.price}
                                </Typography>
                                        <Typography variant="body1"
                                            style={{
                                                color: '#fff',
                                                opacity: 0.5
                                            }}
                                        >
                                            <small> per month </small>
                                        </Typography>
                                    </div>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                       {starter.short_description}
                            </Typography>
                                </CardContent>
                                <Link onClick={handleOpen}>
                                    <CardActions >
                                        <Button className={classes.trialBtn} size="small" variant="contained" color="primary"> Continue </Button>
                                    </CardActions>
                                </Link>
                            </Card>

                            <Card className={classes.trialCard} variant="outlined" style={{ backgroundColor: '#4195D1' }}>
                                <CardContent>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                         {prof.package_name}
                            </Typography>
                                    <div style={{ padding: '2rem 0' }}>
                                        <Typography variant="h3"
                                            style={{
                                                fontSize: '60px',
                                                fontWeight: 'regular',
                                            }}
                                        >
                                            ${prof.price}
                                </Typography>
                                        <Typography variant="body1"
                                            style={{
                                                color: '#fff',
                                                opacity: 0.5
                                            }}
                                        >
                                            <small> per month </small>
                                        </Typography>
                                    </div>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                       {prof.short_description}
                            </Typography>
                                </CardContent>
                                <Link onClick={handleOpen}>
                                    <CardActions >
                                        <Button className={classes.trialBtn} size="small" variant="contained" color="primary"> Continue </Button>
                                    </CardActions>
                                </Link>
                            </Card>

                            <Card className={classes.trialCard} variant="outlined" style={{ backgroundColor: '#43425D' }}>
                                <CardContent>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                       {advanced.package_name}
                            </Typography>
                                    <div style={{ padding: '2rem 0' }}>
                                        <Typography variant="h3"
                                            style={{
                                                fontSize: '60px',
                                                fontWeight: 'regular',
                                            }}
                                        >
                                            ${advanced.price}
                                </Typography>
                                        <Typography variant="body1"
                                            style={{
                                                color: '#fff',
                                                opacity: 0.5
                                            }}
                                        >
                                            <small> per month </small>
                                        </Typography>
                                    </div>
                                    <Typography variant="body1"
                                        style={{
                                            fontSize: '20px',
                                            fontWeight: '400',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        {advanced.short_description}
                            </Typography>
                                </CardContent>
                                <Link onClick={handleOpen}>
                                    <CardActions >
                                        <Button className={classes.trialBtn} size="small" variant="contained" color="primary"> Continue </Button>
                                    </CardActions>
                                </Link>
                            </Card>

                        </div>
                    </Grid>
                    <div>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.modalPaper}>
                                    <div className="mt-3">
                                        <Payment />
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </div>

                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default TrialPage;