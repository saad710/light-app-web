/* eslint-disable no-undef */
import { Button, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/Edit';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { key } from '../../../apiKey';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './CompanyDetailsStyle';



const CompanyDetails = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [formValue, setFormValue] = useState({});
    const [companies, setCompanies] = useState(null);
    const [show, setShow] = useState(false);
    const [companyInfo, setCompanyInfo] = useState({});
    const [updateLocation, setUpdateLocation] = useState({});
    const [updateEmail, setUpdateEmail] = useState({});
    const [updatePhone, setUpdatePhone] = useState({});
    const [updateWebsite, setUpdateWebsite] = useState({});
    const [updateName, setUpdateName] = useState({});
    const handleStop = () => setShow(false);
    const handleShow = () => setShow(true);
    const [updateUser, setUpdateUser] = useState();
    const [tagLine, setTagLine] = useState({});
    const [companyId, setCompanyId] = useState();
    const [Success, setSuccess] = useState(false)
    const [companyData, setCompanyData] = useState({})
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLocationBlur = (e) => {
        const newLocation = { ...updateLocation }
        console.log(newLocation);
        newLocation[e.target.name] = e.target.value

        setUpdateLocation(newLocation)

    }
    const handleEmailBlur = (e) => {
        const newEmail = { ...updateEmail }
        console.log(newEmail);
        newEmail[e.target.name] = e.target.value

        setUpdateEmail(newEmail)

    }
    const handlePhoneBlur = (e) => {
        const newPhone = { ...updatePhone }
        console.log(newPhone);
        newPhone[e.target.name] = e.target.value

        setUpdatePhone(newPhone)

    }
    const handleWebsiteBlur = (e) => {
        const newWebsite = { ...updateWebsite }
        console.log(newWebsite);
        newWebsite[e.target.name] = e.target.value

        setUpdateWebsite(newWebsite)

    }
    const handleCompanyBlur = (e) => {
        const newName = { ...updateName }
        console.log(newName);
        newName[e.target.name] = e.target.value

        setUpdateName(newName)

    }
    const handleTagBlur = (e) => {
        const newTag = { ...tagLine }
        console.log(newTag);
        newTag[e.target.name] = e.target.value

        setTagLine(newTag)

    }

    const handleBlur = (e) => {
        const value = { ...formValue };
        value[e.target.name] = e.target.value;
        setFormValue(value);
    };
    // create company details
    const handleSubmit = (e) => {
        const finalValue = { ...formValue };
        finalValue.client_id = updateUser.id;
        console.log(finalValue);
        Axios.post(`${key}create-company`, finalValue)
            .then(res => {
                console.log(res);
                setSuccessAlert(true)
                // reFetch()
                reSubmit()
            })
            .catch(err => {
                console.log(err);
            })

        e.preventDefault();
    };

    const reSubmit = () => {
        getComapnyDetails()
    }
    const updateCompanyInfo = (e) => {
        e.preventDefault();
        const id = companyId;
        const client_id = updateUser.id;

        const companyUpdate = { ...updateLocation, ...updateEmail, ...updatePhone, ...updateWebsite, ...updateName, ...tagLine, client_id };
        console.log(companyUpdate);
        Axios.put(`${key}update-company/${id}`, companyUpdate)
            .then((response) => {
                setSuccess(true);
                reFetch()
                console.log(response);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const reFetch = () => {
        getComapnyDetails()
    }

    const handleUpdate = (company) => {
        console.log(company);
        setCompanyData(company);
        setCompanyId(company.id);
    }

    const handleDelete = (id) => {
        console.log(id);
        // const id = companyId;
        // const client_id = updateUser.id;
        Axios.delete(`${key}delete-company/${id}`)
            .then(res => {
                console.log(res.data);
                reDelete()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const reDelete = () => {
        getComapnyDetails()
    }


    useEffect(() => {
        Axios.get(`${key}all-company`)
            .then((response) => {
                console.log(response.data);
                const companyDetails = response.data;
                // const singleCompany = companyDetails.filter(company=> company.email === localStorage.client);
                setCompanyInfo(...companyDetails);
                // console.log(singleCompany);
            })
    }, [])

    useEffect(() => {
        Axios.get(`${key}clients`)
            .then((response) => {
                console.log(response.data);
                const clients = response.data;
                const singleClient = clients.filter(client => client.email === localStorage.client);
                setUpdateUser(...singleClient);
                console.log(singleClient);
            })
    }, [])



    //get all
    const getComapnyDetails = () => {
        Axios(`${key}all-company`)
            .then(res => {
                const allCompany = res.data
                console.log(res.data);
                setCompanies(allCompany)
            })
            .then(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getComapnyDetails()
    }, [])



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {/* <ToolBar /> */}
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs>
                            <div style={{ marginLeft: '20rem' }}>
                                <div style={{ marginLeft: '6rem' }}>
                                    <Button onClick={handleOpen} variant="contained" size="small"
                                        style={{
                                            fontSize: '12px',
                                            margin: '0 3rem',
                                            backgroundColor: '#4195D1',
                                            color: '#fff',
                                            fontWeight: 'bold'
                                        }}>
                                        Add Info
                                    </Button>
                                </div>
                                {companies !== null &&
                                    companies.map(company => (
                                        <div style={{ marginTop: '2rem' }}>
                                            <div className="d-flex align-items-center"
                                                style={{ marginBottom: '2rem' }}
                                            >
                                                <div>
                                                    <Typography variant="h5" align="center"> {company.org_name} </Typography>
                                                    <Typography variant="caption"> {company.tag_line} </Typography>
                                                </div>
                                                <EditIcon style={{ color: '#4195D1' }} className="ml-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handleUpdate(company)} />
                                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Company name</label>
                                                                            <input type="text" className="form-control" id="org_name" name="org_name" defaultValue={companyData.org_name} onBlur={handleCompanyBlur} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Location</label>
                                                                            <input type="text" className="form-control" id="address" name="address" defaultValue={companyData.address} onBlur={handleLocationBlur} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Email</label>
                                                                            <input type="email" className="form-control" id="email" name="email" defaultValue={companyData.email} onBlur={handleEmailBlur} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Phone</label>
                                                                            <input type="tel" className="form-control" id="phone" name="phone" defaultValue={companyData.phone} onBlur={handlePhoneBlur} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Website</label>
                                                                            <input type="url" className="form-control" id="website" name="website" defaultValue={companyData.website} onBlur={handleWebsiteBlur} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">TagLine</label>
                                                                            <input type="text" className="form-control" id="tag_line" name="tag_line" defaultValue={companyData.tag_line} onBlur={handleTagBlur} />
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                {Success ? <div class="alert alert-success" role="alert">
                                                                    Updated Your Organization Info
                                                </div> : null}

                                                                <button type="button" class="btn btn-primary" onClick={updateCompanyInfo}>Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Typography variant="body2" align="right" style={{ color: "rgb(65, 149, 209)", marginLeft: "40px" }}
                                                    onClick={() => handleDelete(company.id)}
                                                >
                                                    {/* <UpdateIcon /> */}
                                                    <DeleteForeverSharpIcon />
                                                </Typography>


                                            </div>
                                            <div className="mt-3 d-flex">
                                                <div className="pr-5">
                                                    <div className="">
                                                        <Typography varient="body1"> Location </Typography>
                                                        <div
                                                            style={{
                                                                border: '2px solid #4195D1',
                                                                width: '50%',
                                                                margin: '0.4rem 0'
                                                            }}
                                                        >

                                                        </div>
                                                        <Typography variant="body2"> {company.address} </Typography>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Typography varient="body1"> Phone </Typography>
                                                        <div
                                                            style={{
                                                                border: '2px solid #4195D1',
                                                                width: '50%',
                                                                margin: '0.4rem 0'
                                                            }}
                                                        >

                                                        </div>
                                                        <Typography variant="body2"> {company.phone} </Typography>
                                                    </div>
                                                </div>

                                                <div className="pl-5">
                                                    <div >
                                                        <Typography varient="body1"> Email </Typography>
                                                        <div
                                                            style={{
                                                                border: '2px solid #4195D1',
                                                                width: '50%',
                                                                margin: '0.4rem 0'
                                                            }}
                                                        >

                                                        </div>
                                                        <Typography variant="body2"> {company.email} </Typography>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Typography varient="body1"> Website </Typography>
                                                        <div
                                                            style={{
                                                                border: '2px solid #4195D1',
                                                                width: '50%',
                                                                margin: '0.4rem 0'
                                                            }}
                                                        >

                                                        </div>
                                                        <Typography variant="body2"> {company.website} </Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                        </Grid>


                        {/* <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> # </TableCell>
                                        <TableCell align="center"> Organisation Name </TableCell>
                                        <TableCell align="center"> Address </TableCell>
                                        <TableCell align="center"> Website </TableCell>
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
                                                <TableCell align="center"> 38, Park Road, NY </TableCell>
                                                <TableCell align="center"> websitedemo.com </TableCell>
                                                {/* <TableCell align="center">
                                                    <div>
                                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                            <Button size="small" style={{fontSize: '10px'}} onClick={handleOpen}>UPDATE</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            <div className={classes.paginationBox} style={{marginBottom: '20px'}}>
                                <Pagination count={10} className={classes.pagination} />
                            </div>
                        </TableContainer> */}

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
                                <div className={classes.modalPaper}>
                                    <div className="mt-3">
                                        <form className={classes.form} noValidate>
                                            {successAlert === true &&
                                                <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                                                    {/* <Alert.Heading>Successfull! Invitation link sended to the customer email!</Alert.Heading> */}
                                                    <p>
                                                        Company Info Successfully created!
                                                                    </p>
                                                </Alert>
                                            }
                                            {errorAlert === true &&
                                                <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
                                                    {/* <Alert.Heading>Please enter valid information! or Try again later!</Alert.Heading> */}
                                                    <p>
                                                        Please enter valid information
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
                                                    id='name'
                                                    name='org_name'
                                                    autoComplete='name'
                                                    autoFocus
                                                    placeholder='Company'
                                                    onBlur={handleBlur}
                                                />
                                            </div>

                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='tagline'
                                                    name='tag_line'
                                                    autoComplete='tagline'
                                                    autoFocus
                                                    placeholder='Tagline'
                                                    onBlur={handleBlur}
                                                />
                                            </div>

                                            <div className='mt-3'>
                                                <TextareaAutosize
                                                    style={{
                                                        backgroundColor: "#fff",
                                                        borderRadius: "0.2rem",
                                                        height: "50px",
                                                    }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    width='100%'
                                                    id='address'
                                                    name='address'
                                                    autoComplete='address'
                                                    autoFocus
                                                    aria-label='minimum height'
                                                    rowsMin={3}
                                                    placeholder='Address..'
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
                                                    id='website'
                                                    name='website'
                                                    autoComplete='website'
                                                    autoFocus
                                                    placeholder='Website'
                                                    onBlur={handleBlur}
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
                                                    placeholder='Email'
                                                    onBlur={handleBlur}
                                                />
                                            </div>

                                            <div>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='phone'
                                                    name='phone'
                                                    autoComplete='phone'
                                                    autoFocus
                                                    placeholder='Phone'
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
                                                ADD
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </Fade>
                        </Modal>
                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default CompanyDetails;