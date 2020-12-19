import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Checkbox, Typography } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useStyles } from './ToolStyle';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         backgroundColor: '#fff'
//     },

//     appBarSpacer: theme.mixins.toolbar,
//     content: {
//         flexGrow: 1,
//         height: 'auto',
//         overflow: 'auto',

//     },
//     container: {
//         paddingTop: '0rem',
//     },
//     paper: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         overflow: 'auto',
//         flexDirection: 'column',
//     },
//     fixedHeight: {
//         height: 'auto',
//     },
// }));


const ToolBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid >
                        <div className="d-flex align-items-center">
                            <div>
                                <Checkbox
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                                <RefreshIcon />
                            </div>
                            <div className="d-flex" style={{marginLeft: '50rem'}}>
                                 <div style={{padding: '0 2rem'}}>
                                    1 of 21
                                 </div>
                                <div>
                                    <ArrowBackIosIcon fontSize="small" />
                                    <ArrowForwardIosIcon fontSize="small" />
                                </div>
                            </div>
                        </div>
                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default ToolBar;