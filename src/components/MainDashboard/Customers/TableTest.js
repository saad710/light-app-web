import { Button, ButtonGroup, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from "@material-ui/lab";
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { key } from '../../../apiKey';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './CustomersStyle';

const TableTest = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [customers, setCustomers] = useState(null)
    console.log(customers);
    useEffect(() => {
        Axios(`${key}customers`)
            .then(res => {
                const data = res.data
                setCustomers(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const refetch = () => {
        Axios(`${key}customers`)
            .then(res => {
                const data = res.data
                setCustomers(data)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleRemoveCustomer = (id) => {
        console.log(id);
        Axios.delete(`${key}customer-trash/${id}`)
            .then(res => {
                console.log(res);
                refetch()
                // const newCustomers = customers.filter(customer => customer.id !== res.data.id)
                // setCustomers(newCustomers)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handelUserModelOpen = () => {
        setUserModelOpen(true)
    }
    const handelUserModelClise = () => {
        setUserModelOpen(false)
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {/* <ToolBar /> */}
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Button onClick={handelUserModelOpen} style={{ margin: '1.2rem auto' }} variant="contained" className={classes.btnStyle} >
                            ADD CONTACT
                        </Button>
                        {/* <Button onClick={handleOpen} style={{ margin: '1rem auto' }} variant="contained" className={classes.btnStyle} >
                            ADD GROUP
                        </Button> */}
                        <TableContainer component={Paper} square elevation={0} className="mt-4">
                            <Table className={classes.table} aria-label="simple table"
                                size='small'
                            >
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell> # </TableCell>
                                        <TableCell align="center"> NAME </TableCell>
                                        <TableCell align="center"> EMAIL </TableCell>
                                        <TableCell align="center"> PHONE </TableCell>
                                        <TableCell align="center"> GROUP </TableCell>
                                        <TableCell align="center"> TAG </TableCell>
                                        <TableCell align="center"> PHYSICAL ADDRESS </TableCell>
                                        <TableCell align="center"> STATUS </TableCell>
                                        <TableCell align="center"> ACTION </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { customers !== null &&
                                        customers.map((customer, i) => (
                                            <TableRow key={customer.id}>
                                                <TableCell component="th" scope="row">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell align="center">{ `${customer.first_name} ${customer.last_name}` }</TableCell>
                                                <TableCell align="center">{customer.email === null ? 'N/A' : customer.email}</TableCell>
                                                <TableCell align="center"> {customer.phone === null ? 'N/A' : customer.phone} </TableCell>
                                                <TableCell align="center">{customer.group === null ? 'N/A': customer.group}</TableCell>
                                                <TableCell align="center"> Tag-1 </TableCell>
                                                <TableCell align="center"> {customer.address === null ? 'N/A' : customer.address} </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        variant="text"
                                                        color="primary"
                                                        size="small"
                                                        style={{ fontSize: '12px' }}>
                                                            { customer.status }
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div>
                                                        <ButtonGroup
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            aria-label="contained primary button group"
                                                        >
                                                            <Button
                                                                onClick={() => handleRemoveCustomer(customer.id)}
                                                                style={{fontSize: '10px'}} color="secondary">REMOVE</Button>
                                                        </ButtonGroup>
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
                        

                        {/* update/delete modal */}

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
                                <div className={classes.customerPaper}>
                                    <div className="mt-3">
                                        <Card className={classes.cardRoot}>
                                            <CardContent style={{ background: 'none !important' }}>

                                                <div className={classes.paper}>
                                                    <Typography component="body1" variant="body1">
                                                        CREATE GROUP
                                                    </Typography>
                                                    <form className={classes.form} noValidate>


                                                        <div>
                                                            <label htmlFor=""> Email </label>
                                                            <TextField
                                                                style={{ backgroundColor: '#fff' }}
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="email"
                                                                name="email"email
                                                                autoComplete="email"
                                                                autoFocus
                                                                placeholder="email"
                                                            />
                                                        </div>

                                                        <div class="form-group">
                                                            <label for="exampleFormControlSelect1">Group</label>
                                                            <select class="form-control" id="role" name="role">
                                                                <option> Group-1 </option>
                                                                <option> Group-2 </option>
                                                                <option> Group-3 </option>
                                                                <option> Group-4 </option>
                                                            </select>
                                                        </div>

                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                        >
                                                            ADD GROUP
                                                        </Button>
                                                    </form>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>


                        {/* create user modal  */}

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={userModelOpen}
                            onClose={handelUserModelClise}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={userModelOpen}>
                                <div className={classes.customerPaper}>
                                    <div className="mt-3">
                                        <Card className={classes.cardRoot}>
                                            <CardContent style={{ background: 'none !important' }}>
                                                
                                                <div className={classes.paper}>
                                                    <Typography component="body1" variant="body1">
                                                        ADD CONTACT
                                                    </Typography>
                                                    <form className={classes.form} noValidate>
                                                        <div class="btn-group" style={{width: '100%', height: '2.5rem'}}>
                                                            <input
                                                                id="search"
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '1rem 1rem',
                                                                    borderRadius: '0.4rem'
                                                                }}
                                                                // onChange={handleChange}
                                                                placeholder="Add Contacts..."
                                                                className="dropdown-toggle"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                // aria-expanded="false"
                                                                autoComplete="off"
                                                                // value={currentItem}
                                                            />
                                                            <div class="dropdown-menu" id="contact-dropdown">
                                                                {/* {
                                                                    products.map(item => (
                                                                        <a class="dropdown-item" onClick={() => handleSubmit(item)}>  {item.name} </a>
                                                                        <li class="dropdown-item" onClick={() => handleSubmit(item)}>  {item.name} </li>
                                                                    ))
                                                                } */}
                                                                <div className="d-flex py-1">
                                                                    <li class="dropdown-item">  mariewinter@gmail.com </li>
                                                                    <Button variant="outlined" color="primary" size="small"> invite </Button>
                                                                </div>
                                                                <div className="d-flex py-1">
                                                                    <li class="dropdown-item">  mariewinter@gmail.com </li>
                                                                    <Button variant="outlined" color="primary" size="small"> invite </Button>
                                                                </div>
                                                                <div className="d-flex py-1">
                                                                    <li class="dropdown-item">  mariewinter@gmail.com </li>
                                                                    <Button variant="outlined" color="primary" size="small"> invite </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                        >
                                                            ADD CONTACT
                                                        </Button>
                                                    </form>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>

                        {/* group modal  */}

                        {/* create user modal  */}

                        {/* <Modal
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
                            <Fade in={handleOpen}>
                                <div className={classes.customerPaper}>
                                    <div className="mt-3">
                                        <Card className={classes.cardRoot}>
                                            <CardContent style={{ background: 'none !important' }}>
                                                <div className={classes.paper}>
                                                    <Typography component="body1" variant="body1">
                                                        CREATE GROUP
                                                    </Typography>
                                                    <form className={classes.form} noValidate>
                                                        
                                                        <div>
                                                            <label htmlFor=""> Group </label>
                                                            <TextField
                                                                style={{ backgroundColor: '#fff' }}
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                id="group"
                                                                name="group"
                                                                autoComplete="group"
                                                                autoFocus
                                                                placeholder="grooup name"
                                                            />
                                                        </div>
                                                        <Button
                                                            type="submit"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                        >
                                                            CREATE GROUP
                                                        </Button>
                                                    </form>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </Fade>
                        </Modal> */}


                    </Grid>
                    
                </Container>
            </main>
        </div>
    );
};

export default TableTest;