import { Button, ButtonGroup, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from '@material-ui/lab';
import Axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import { key } from '../../../apiKey';
import bar1 from '../../../images/bar1.svg';
import { ReportContext } from '../../../Providers/ReportProvider';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './ReportPageStyle';

const ReportPage = () => {
    const classes = useStyles();
    const { groupMailId, setGroupMailId } = useContext(ReportContext)
    const [checked, setChecked] = React.useState(false);
    const [state,setState] = useState([]);
    const [remainder, setRemainder] = useState([]);
    const [userEmails, setEmails] = useState([]);
    const [userData, setUserData] = useState([]);
    console.log(userData);

    console.log(checked);

    const handleChange = event => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        Axios.get(`${key}group-report/${groupMailId}`)
            .then(res => {
                console.log(res.data);
                setState(res.data);
                setRemainder(res.data.remainder);
                setEmails(res.data.customer_list);
                setUserData(res.data.who_responded);
            })
            .catch(err => {
                console.log(err.message);
            })
    },[groupMailId])

    const closeMail = () => {
        Axios.put(`${key}close-mail/${groupMailId}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return <div className={classes.root}>
        <CssBaseline />
        <AppBarDrawer />
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Responded
                                        </Typography>
                                        <Typography align="center">
                                            <br/>
                                            <strong > {state.responded} </strong>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Total Open
                                        </Typography>
                                        <Typography align="center">
                                            <strong > {state.total_open} </strong>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Total Read
                                        </Typography>
                                        <Typography align="center">
                                            <strong > {state.total_open} </strong>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Total Unread
                                        </Typography>
                                        <Typography align="center">
                                            <strong > {state.total_unread} </strong>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Deadline
                                        </Typography>
                                        <Typography align="center">
                                            <strong > {moment(state.deadline).format("MMMM D YYYY")} </strong>
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper>
                            <Card className={classes.cardRoot}>
                                <CardContent>
                                    <div style={{ marginRight: '13rem' }}>
                                        <Typography align="center">
                                            Remainder
                                        </Typography>
                                        <Typography align="center">
                                            {remainder !== null && remainder.map((data,index) =><strong> {moment(data).format("l")} </strong>)}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardMedia>
                                    <img className={classes.media} src={bar1} alt="" />
                                </CardMedia>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4} style={{margin: ' 0 auto'}}>
                        <div style={{marginTop: '1rem', marginLeft: '5rem'}}>
                            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                <Button onClick={closeMail} size="small" style={{ fontSize: '10px' }}>
                                    Close This Mail
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> # </TableCell>
                                    <TableCell align="center"> Email </TableCell>
                                    <TableCell align="center"> Group </TableCell>
                                    {/* <TableCell align="center"> Tag </TableCell> */}
                                    <TableCell align="center"> Status </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    userEmails.map((customer, i) => <TableRow key={customer.id}>
                                            <TableCell component="th" scope="row">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="center">{customer}</TableCell>
                                            <TableCell align="center"> {state.group_name} </TableCell>
                                            {/* <TableCell align="center"> quick reply, no-reply </TableCell> */}
                                            <TableCell align="center">
                                                <div>
                                                   
                                                    {userData.length === 0 && (
                                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                            <Button size="small" style={{ fontSize: '10px' }}>
                                                                Not Responded
                                                            </Button>
                                                        </ButtonGroup>
                                                    )}
                                                    {userData.length > 0 && (
                                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                            <Button size="small" style={{ fontSize: '10px' }}>
                                                                Responded
                                                            </Button>
                                                        </ButtonGroup>
                                                    )}

                                                </div>
                                            </TableCell>
                                        </TableRow>)
                                }
                            </TableBody>
                        </Table>
                        <div className={classes.paginationBox} style={{ marginBottom: '20px' }}>
                            <Pagination count={10} className={classes.pagination} />
                        </div>
                    </TableContainer>
                </Grid>

            </Container>
        </main>
    </div>;
};

export default ReportPage;