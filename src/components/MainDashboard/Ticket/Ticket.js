import { Backdrop, Button, Card, CardContent, CardHeader, Fade, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { key } from '../../../apiKey';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './TicketStyle';

const columns = [
  { id: '#', label: '#', minWidth: 100 },
  { id: 'ticket_num', label: 'Ticket Num', minWidth: 100 },
  { id: 'subject', label: 'Subject', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  
];

const Ticket = () => {
    const classes = useStyles();
    const [ticketModal, setTicketModal] = React.useState(false);
    const [ticketDetails, setTicketDetails] = React.useState(false);
    const [ticketValue, setTicketValue] = useState({});
    const [tickets, setTickets] = useState(null)
    const [singleDetails, setSingleDetails] = useState({})

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");

    const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpen = () => {
        setTicketModal(true);
    };
    const handleClose = () => {
        setTicketModal(false);
    };

    const handleDetailsOpen = (ticket) => {
        setSingleDetails(ticket)
        setTicketDetails(true);
    };
    const handleDetailsClose = () => {
        setTicketDetails(false);
    };

    const handleBlur = (e) => {
        const value = { ...ticketValue };
        console.log(value);
        value[e.target.name] = e.target.value;
        setTicketValue(value);
    };

    const handleSubmit = (e) => {
        const createTicket = { ...ticketValue };
        createTicket.client_id = 1
        createTicket.date = '11/11/21'
        // createTicket.status = 'pending'
        // createTicket.type = 'idk'
        // createTicket.ticket_id = 2
        console.log(createTicket);
        Axios.post(`${key}create-ticket`, createTicket)
            .then(res => {
                console.log(res);
                setSuccessAlert(true)
                reFetch()
            })
            .catch(err => {
                console.log(err);
            })

        e.preventDefault();
    };
    useEffect(() => {
        Axios(`${key}all-ticket`)
            .then(res => {
                const tickets = res.data
                setTickets(tickets)
            })
            .then(err => {
                console.log(err);
            })
    }, [])
    const reFetch = () => {
        Axios(`${key}all-ticket`)
            .then(res => {
                const tickets = res.data
                setTickets(tickets)
            })
            .then(err => {
                console.log(err);
            })
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className={classes.paper}>
                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                color="primary"
                                style={{width: '25%', margin: '0 auto'}}
                            >
                                Add Ticket
                            </Button>
                            <div>
                            
                            <TableContainer className={classes.container} style={{ margin: '1.2rem auto' }} >
                                        <Table stickyHeader aria-label="sticky table"  size='small'>
                                        <TableHead>
                                            <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                >
                                                {column.label}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tickets !== null && tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket,i) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={ticket.code} onClick={() => handleDetailsOpen(ticket)}>
                                                    <TableCell component="th" scope="row">
                                                            {i + 1}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            { ticket.ticket_id }
                                                        </TableCell>
                                                        <TableCell align="center"> {ticket.subject} </TableCell>
                                                        <TableCell align="center">
                                                            <Typography variant="body2" color="textPrimary"> {ticket.status} </Typography>
                                                        </TableCell>
                                                </TableRow>
                                            );
                                            })}
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[1,5,10, 25, 100]}
                                        component="div"
                                        count={tickets !== null && tickets.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />

                            </div>

                            <div>
                                <Modal
                                    aria-labelledby='transition-modal-title'
                                    aria-describedby='transition-modal-description'
                                    className={classes.modal}
                                    open={ticketModal}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={ticketModal}>
                                        <div className={classes.modalPaper}>
                                            <div className='mt-3'>
                                                <Card className={classes.ticketCard}>
                                                    <CardHeader
                                                        action={
                                                            <IconButton
                                                                onClick={handleClose}
                                                                aria-label='settings'
                                                                style={{ color: "#2d2d2d" }}
                                                            >
                                                                <CancelOutlinedIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                    <CardContent>
                                                        <form className={classes.form} noValidate>
                                                            {successAlert === true &&
                                                                <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                                                                    {/* <Alert.Heading>Successfull! Invitation link sended to the customer email!</Alert.Heading> */}
                                                                    <p>
                                                                        Report Successfully created!
                                                                    </p>
                                                                </Alert>
                                                            }
                                                            {errorAlert === true &&
                                                                <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
                                                                    {/* <Alert.Heading>Please enter valid information! or Try again later!</Alert.Heading> */}
                                                                    <p>
                                                                        Please enter valid information!
                                                                    </p>
                                                                </Alert>
                                                            }
                                                            <div style={{ margin: "1rem 0" }}>
                                                                <TextField
                                                                    style={{ backgroundColor: "#fff" }}
                                                                    variant='outlined'
                                                                    margin='normal'
                                                                    required
                                                                    fullWidth
                                                                    id='title'
                                                                    name='title'
                                                                    autoComplete='title'
                                                                    autoFocus
                                                                    onBlur={handleBlur}
                                                                    placeholder='Name'
                                                                />
                                                            </div>
                                                            <div>
                                                                <TextField
                                                                    style={{ backgroundColor: "#fff" }}
                                                                    variant='outlined'
                                                                    margin='normal'
                                                                    required
                                                                    fullWidth
                                                                    id='email'
                                                                    name='email'
                                                                    autoComplete='email'
                                                                    autoFocus
                                                                    onBlur={handleBlur}
                                                                    placeholder='Email'
                                                                />
                                                            </div>
                                                            <br />
                                                            <div>
                                                                <TextField
                                                                    style={{ backgroundColor: "#fff" }}
                                                                    variant='outlined'
                                                                    margin='normal'
                                                                    required
                                                                    fullWidth
                                                                    id='cc'
                                                                    name='cc'
                                                                    autoComplete='cc'
                                                                    autoFocus
                                                                    placeholder="cc"
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                            <br />
                                                            <div>
                                                                <TextField
                                                                    style={{ backgroundColor: "#fff" }}
                                                                    variant='outlined'
                                                                    margin='normal'
                                                                    required
                                                                    fullWidth
                                                                    id='subject'
                                                                    name='subject'
                                                                    autoComplete='subject'
                                                                    autoFocus
                                                                    placeholder='Subject'
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                            <div className='mt-3'>
                                                                <TextareaAutosize
                                                                    style={{
                                                                        backgroundColor: "#fff",
                                                                        borderRadius: "0.2rem",
                                                                        height: "130px",
                                                                        width: '100%'
                                                                    }}
                                                                    variant='outlined'
                                                                    margin='normal'
                                                                    required
                                                                    width='100%'
                                                                    id='description'
                                                                    name='description'
                                                                    autoComplete='description'
                                                                    autoFocus
                                                                    aria-label='minimum height'
                                                                    // rowsMin={3}
                                                                    placeholder='Details'
                                                                    onBlur={handleBlur}
                                                                />
                                                            </div>
                                                            <Button
                                                                type='submit'
                                                                fullWidth
                                                                variant='contained'
                                                                className={classes.ticketBtn}
                                                                onClick={handleSubmit}
                                                                style={{ marginTop: "1rem" }}
                                                            >
                                                                SEND
                                                            </Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>


                            <div>
                                <Modal
                                    aria-labelledby='transition-modal-title'
                                    aria-describedby='transition-modal-description'
                                    className={classes.modal}
                                    open={ticketDetails}
                                    onClose={handleDetailsClose}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={ticketDetails}>
                                        <div className={classes.modalPaper}>
                                            <div className='mt-3'>
                                                <Card className={classes.ticketCard}>
                                                    <CardHeader
                                                        action={
                                                            <IconButton
                                                                onClick={handleDetailsClose}
                                                                aria-label='settings'
                                                                style={{ color: "#2d2d2d" }}
                                                            >
                                                                <CancelOutlinedIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                    <CardContent>
                                                        <div style={{color: '#2d2d2d'}}>
                                                            <Typography variant="body1" align="left">
                                                                <strong>Subject : </strong> {singleDetails.subject}
                                                            </Typography>
                                                            <Typography variant="subtitle2" align="left">
                                                                <strong>Details : </strong> <small> {singleDetails.description} </small>
                                                            </Typography>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                    </Grid>


                </Container>
            </main>
        </div>
    );
};

export default Ticket;