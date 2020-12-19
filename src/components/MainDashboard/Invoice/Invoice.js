import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Divider, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CancelIcon from '@material-ui/icons/Cancel';
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff'
    },

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
}));


const Invoice = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div>
                                <Typography align="right">
                                    <Link to="/dashboard">
                                        <CancelIcon color="action" />
                                    </Link>
                                </Typography>
                                <div className="d-flex justify-content-between py-4">
                                    <div>
                                        <Typography variant="h5" className="my-2"> Company </Typography>
                                        <Typography variant="body1"> 
                                            4098 Water Street, USA
                                            <br/>
                                            P: +33 434 545 5453
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h5" align="right"> Invoice </Typography>
                                        <Link to="/dashboard">
                                            <Button variant="contained" color="primary"
                                                className="my-2"
                                                style={{
                                                    backgroundColor: '#2d2d2d',
                                                    padding: '0.3rem 2rem',
                                                    color: '#fff',
                                                }}
                                            >
                                                Print
                                        </Button>
                                        </Link>
                                    </div>
                                </div>
                                <Divider />
                                <div className="d-flex justify-content-between py-4">
                                    <div>
                                        <Typography variant="body2">
                                            <small>
                                                <span>
                                                    <b> Invoice to </b>
                                                </span>
                                                <br/>
                                                <span>
                                                    Marie Winter
                                                </span>
                                                <br/>
                                                <span>
                                                    4097 Water Street, Suite 600
                                                </span>
                                                <br/>
                                                <span>
                                                    San Francisco, CA 4554
                                                </span>
                                            </small>
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="body2">
                                            <small>
                                                <span>
                                                    <b> Order Date </b> : March 15, 2020
                                                    <br/>
                                                    <b> Order Id </b> : #23434

                                                </span>
                                            </small>
                                        </Typography>
                                    </div>
                                </div>
                                <TableContainer>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead style={{ backgroundColor: '#F5F6FA'}}>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell align="center">PACKAGE</TableCell>
                                                <TableCell align="center">DESCRIPTION</TableCell>
                                                <TableCell align="center">DATE OF PURCHASE</TableCell>
                                                <TableCell align="center">DATE OF NEXT RENEWAL</TableCell>
                                                <TableCell align="center">PRICE</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">1</TableCell>
                                                    <TableCell align="center">
                                                        Starter features for your business grow
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        10/11/2020
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        10/11/2021
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        $48
                                                    </TableCell>
                                                </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div className="py-3">
                                    <Typography variant="body2" align="right">
                                        <span>
                                            <b> Sub-total: </b> $48
                                            <br/>
                                            <b> Discount: </b> 12.9%
                                            <br/>
                                            <b> Vat: </b> 12.9%
                                        </span>
                                    </Typography>
                                    <Typography variant="h6" align="right">
                                        <b> USD 50.00 </b>
                                    </Typography>
                                    <Typography align="right">
                                        <Link to="/dashboard">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="my-3"
                                                style={{
                                                    backgroundColor: '#4195D1',
                                                    padding: '0.3rem 2rem'
                                                }}

                                            >
                                                Download
                                        </Button>
                                        </Link>
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default Invoice;