import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBarDrawer from '../AppBarDrawer';
import { useParams } from 'react-router-dom';
import inboxData from '../../../data/inboxData';
import { Avatar, Button, Chip, Typography } from '@material-ui/core';
import avatar from '../../../images/avatar.png'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff',
        // fontFamily: 'Montserrat'
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',

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
    btnStyle: {
        backgroundColor: '#213F7E',
        color: '#fff',
        borderRadius: 0,
        padding: '0.5rem 5rem',
    }
}));
const SentDetails = () => {
    const classes = useStyles();
    const { sentId } = useParams()
    const message = inboxData.filter(singleMsg => singleMsg.id == sentId)
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className="d-flex align-items-center my-3" style={{ color: '#2d2d2d' }}>
                            <Avatar aria-label="recipe" variant="rounded" className={classes.avatar}>
                                <img width="100%" src={avatar} alt="" />
                            </Avatar>
                            <Typography variant="body1" style={{ margin: '0.5rem 0.5rem', color: '#2d2d2d' }}>
                                <strong style={{ marginLeft: '1rem' }}> {message[0].name} </strong> <br />
                                <strong style={{ marginLeft: '1rem' }}> {message[0].email} </strong>
                                <br />
                                <Chip
                                    style={{
                                        marginLeft: '1rem',
                                        marginTop: '0.5rem',
                                        fontSize: '11px',
                                        backgroundColor: '#203D79',
                                        height: '1.5rem',
                                        width: '5rem',
                                        color: '#fff',
                                    }}
                                    label={message[0].type}

                                />
                            </Typography>
                        </div>
                        <Typography variant="body1" style={{ marginLeft: '4rem', color: '#2d2d2d', lineHeight: '2' }}>
                            {message[0].message}
                        </Typography>
                        <div style={{
                            width: '40%',
                            height: '10rem',
                            backgroundColor: '#8797B9',
                            margin: '3rem 4rem'
                        }}>

                        </div>

                    </Grid>
                    <div style={{ marginLeft: '3rem' }}>
                        <Button variant="contained" className={classes.btnStyle} color="primary">
                            REPLY
                        </Button>

                        <Button style={{ margin: '0rem 1rem' }} variant="contained" className={classes.btnStyle} color="primary">
                            CLOSE
                        </Button>
                    </div>
                </Container>
            </main>
        </div>
    );
};

export default SentDetails;