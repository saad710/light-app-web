import { Button, ButtonGroup, TablePagination, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { key } from '../../../apiKey';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './CustomersStyle';

const columns = [
  { id: 'first_name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  { id: 'group', label: 'Group', minWidth: 100 },
//   { id: 'tag', label: 'Tag', minWidth: 100 },
  { id: 'address', label: 'Physical Address', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
  
];

const Customers = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [customers, setCustomers] = useState(null)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [email, setEmail] = useState("")
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        // const validate = customers !== null && customers.filter(customer => customer.email !== email)
  
        const value = {...email}
        Axios.post(`${key}invite-customer`, value)
            .then(res => {
                console.log(res);
                setSuccessAlert(true)
            })
            .catch(err => {
                console.log(err);
                setErrorAlert(true)
            })
    }

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
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                            Add new Contact
                        </Button>
                        {/* <Button onClick={handleOpen} style={{ margin: '1rem auto' }} variant="contained" className={classes.btnStyle} >
                            ADD GROUP
                        </Button> */}
                        <TableContainer className={classes.container} style={{ margin: '1.2rem auto' }} >
                            <Table stickyHeader aria-label="sticky table">
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
                                {customers !== null && customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell align='left' component='th' scope='row'>
                                            {`${row.first_name} ${row.last_name}`}
                                        </TableCell>
                                        <TableCell align='left'>{row.email}</TableCell>
                                        <TableCell align='center'>{row.phone}</TableCell>
                                        <TableCell align='center'>{row.group}</TableCell>
                                        {/* <TableCell align='center'>{row.tag}</TableCell> */}
                                        <TableCell align='center'>{row.address}</TableCell>
                                        <TableCell align='center'>{row.status}</TableCell>
                                        <TableCell align="left">
                                            <div>
                                                <ButtonGroup
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    aria-label="contained primary button group"
                                                >
                                                    <Button
                                                        onClick={() => handleRemoveCustomer(row.id)}
                                                        style={{fontSize: '10px'}} color="secondary">REMOVE</Button>
                                                </ButtonGroup>
                                            </div>
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
                            count={customers !== null && customers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                        

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
                                                        Invite new customer
                                                    </Typography>
                                                    {successAlert === true &&
                                                        <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                                                            <Alert.Heading>Successfull! Invitation link sended to the customer email!</Alert.Heading>
                                                            {/* <p>
                                                                Change this and that and try again. Duis mollis, est non commodo
                                                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                                                Cras mattis consectetur purus sit amet fermentum.
                                                            </p> */}
                                                        </Alert>
                                                    }
                                                    { errorAlert === true &&
                                                        <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
                                                            <Alert.Heading>Please enter valid information! or Try again later!</Alert.Heading>
                                                            {/* <p>
                                                                Change this and that and try again. Duis mollis, est non commodo
                                                                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                                                                Cras mattis consectetur purus sit amet fermentum.
                                                            </p> */}
                                                        </Alert>
                                                    }
                                                    <form className={classes.form} noValidate onSubmit={onFormSubmit}>
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            style={{
                                                                width: '100%',
                                                                padding: '0.7rem 1rem',
                                                                borderRadius: '0.4rem'
                                                            }}
                                                            placeholder="Enter Email..."
                                                         
                                                        />
                                                        {/* <div class="btn-group" style={{width: '100%', height: '2.5rem'}}>
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
                                                        </div> */}
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

export default Customers;