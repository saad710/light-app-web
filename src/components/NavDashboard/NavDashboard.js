import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../../apiKey';
import AppBarDrawer from '../MainDashboard/AppBarDrawer';
import Chart from './Chart/Chart';
import MailCount from './MailCount/MailCount';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff'
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        // overflow: 'auto',

    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function NavDashboard() {
    const classes = useStyles();
    const [loggedInClient, setLoggedInClient] = useState({})
    const [countMailInfo, setCountMailInfo] = useState(null)
    // console.log(countMailInfo);
    useEffect(() => {
        Axios.get(`${key}clients`)
        .then(res => {
            const data = res.data
            const clients = data.filter(client => client.email === localStorage.client)
            setLoggedInClient(clients[0])
        })
        .catch(err => {
            // console.log(err);
        })
        Axios.get(`${key}count-client-mail-data/${loggedInClient.id}`)
            .then(res => {
                setCountMailInfo(res.data)
            })
            .catch(err => {
                // console.log(err);
            })
    }, [loggedInClient.id])
    const [requiredActions, setRequiredActions] = useState([])
    useEffect(() => {
    Axios.get(`${key}action-required`)
      .then(res => {
        // console.log(res.data);
        setRequiredActions(res.data)
      })
      .catch(err => {
        // console.log(err);
      })
  }, [])
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MailCount countMailInfo={countMailInfo} requiredActions={requiredActions} />
                            <Chart countMailInfo={countMailInfo} />
                            {/* <VerifiedCustomer />
                            <UnverifiedCustomer />
                            <PendingCustomers /> */}
                            {/* useEffect(() => {
                                const interval = setInterval(() => {
                                                        handleUpdate()
                                                    }, 4000);
                                return () => clearInterval(interval);
                            },) */}
                            {/* <UpdateSchedule /> */}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
