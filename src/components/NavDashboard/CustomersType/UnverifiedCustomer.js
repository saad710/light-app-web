import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import customerData from '../../../data/customerData'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';

import { Pagination } from "@material-ui/lab";
import { useStyles } from './CustomersTypeStyle';

const UnverifiedCustomer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Typography> Verified Customers List </Typography>
                        <TableContainer component={Paper} square elevation={0} className="mt-4">
                            <Table className={classes.table} aria-label="simple table"
                                size='small'
                            >
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell> # </TableCell>
                                        <TableCell align="center"> NAME </TableCell>
                                        <TableCell align="center"> EMAIL </TableCell>
                                        <TableCell align="center"> DESCRIPTION </TableCell>
                                        <TableCell align="center"> DATE OF PURCHASES </TableCell>
                                        <TableCell align="center"> DATE OF RENEWAL </TableCell>
                                        {/* <TableCell align="center"> GROUP </TableCell> */}
                                        <TableCell align="center"> STATUS </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        customerData.map((customer, i) => (
                                            <TableRow key={customer.id}>
                                                <TableCell component="th" scope="row">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell align="center">{customer.name}</TableCell>
                                                <TableCell align="center">{customer.email}</TableCell>
                                                <TableCell align="center">{customer.description}</TableCell>
                                                <TableCell align="center">{customer.dateOfPurchase}</TableCell>
                                                <TableCell align="center">{customer.dateOfRenewwal}</TableCell>
                                                {/* <TableCell align="center">{customer.group}</TableCell> */}
                                                <TableCell align="center">
                                                    <div>
                                                        <Button style={{ fontSize: '10px', backgroundColor: '#E62525', color: '#fff' }} >
                                                                UNVERIFIED
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            <div className={classes.paginationBox}>
                                <Pagination count={10} className={classes.pagination} />
                            </div>
                        </TableContainer>
                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default UnverifiedCustomer;