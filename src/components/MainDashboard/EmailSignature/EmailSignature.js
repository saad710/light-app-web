import { Button, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import 'suneditor/dist/css/suneditor.min.css';
import { key } from '../../../apiKey';
import avatar from '../../../images/avatar.png';
import AppBarDrawer from '../AppBarDrawer';
import '../Coompose/Compose.css';
import { useStyles } from './EmailSignatureStyle';

const EmailSignature = () => {
    const classes = useStyles();
    const [addEmailModal, setAddEmailModal] = useState(false);
    const [updateEmailModal, setUpdateEmailModal] = useState(false);
    const [formValue, setFormValue] = useState({});
    const [allSignatures, setAllSignatures] = useState(null)
    const [updateValue, setUpdateValue] = useState({})
    const [showOldValue, setShowOldValue] = useState({})
    const [updateName, setUpdateName] = useState({})
    const [updateDesignation, setUpdateDesignation] = useState({})
    const [updateAddress, setUpdateAddress] = useState({})
    const [updatePhone, setUpdatePhone] = useState({})
    const [signatureId, setSignatureId] = useState()
    const [newSignature, setNewSignature] = useState({})
    const [signSuccess, setSignSuccess] = useState(false)
    const [updateFacebook, setUpdateFacebook] = useState({})
    const [updateTwitter, setUpdateTwitter] = useState({})
    const [updateInstagram, setUpdateInstagram] = useState({})
    const [updateWebsite, setUpdateWebsite] = useState({})
    const [signClient, setSignClient] = useState({})
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");


    console.log(updateValue);
    console.log(showOldValue);

    const handleAddEmailModalOpen = () => {
        setAddEmailModal(true);
    };

    const handleAddEmailModalClose = () => {
        setAddEmailModal(false);
    };

    const handleUpdateEmailModalOpen = () => {
        setUpdateEmailModal(true);
    };

    const handleUpdateEmailModalClose = () => {
        setUpdateEmailModal(false);
    };
    const handleBlurSignature = (e) => {
        const editSignature = { ...newSignature }
        editSignature[e.target.name] = e.target.value;
        console.log(editSignature);
        setNewSignature(editSignature);
    }

    const handleBlurName = (e) => {
        const newName = { ...updateName }
        newName[e.target.name] = e.target.value;
        setUpdateName(newName);
    }
    const handleBlurDesignation = (e) => {
        const newDesignation = { ...updateDesignation }
        newDesignation[e.target.name] = e.target.value;
        setUpdateDesignation(newDesignation);
    }
    const handleBlurPhone = (e) => {
        const newPhone = { ...updatePhone }
        newPhone[e.target.name] = e.target.value;
        setUpdatePhone(newPhone);
    }
    const handleBlurAddress = (e) => {
        const newAddress = { ...updateAddress }
        newAddress[e.target.name] = e.target.value;
        setUpdateAddress(newAddress);
    }
    const handleBlurFacebook = (e) => {
        const newFacebook = { ...updateFacebook }
        newFacebook[e.target.name] = e.target.value;
        setUpdateFacebook(newFacebook);
    }
    const handleBlurTwitter = (e) => {
        const newTwitter = { ...updateTwitter }
        newTwitter[e.target.name] = e.target.value;
        setUpdateTwitter(newTwitter);
    }
    const handleBlurInstagram = (e) => {
        const newInstagram = { ...updateInstagram }
        newInstagram[e.target.name] = e.target.value;
        setUpdateInstagram(newInstagram);
    }
    const handleBlurWebsite = (e) => {
        const newWebsite = { ...updateWebsite }
        newWebsite[e.target.name] = e.target.value;
        setUpdateWebsite(newWebsite);
    }


    // const updateSignatureInfo = (singnature) => {
    //     singnature.preventDefault();
    //     const client_id = signatureId;

    //     const signatureUpdate = {...newSignature, ...updateName, ...updateDesignation, ...updatePhone, ...updateAddress, ...updateFacebook, ...updateTwitter, ...updateInstagram, ...updateWebsite};
    //     console.log(signatureUpdate);
    //     Axios.put(`${key}update-signature/${client_id}`,signatureUpdate)
    //     .then((response) => {
    //         console.log(response);
    //         setSignSuccess(true);
    //         reUpdate()

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    const updateSignatureInfo = (e) => {
        e.preventDefault();

        const client_id = signatureId;

        const signatureUpdate = { ...newSignature, ...updateName, ...updateDesignation, ...updatePhone, ...updateAddress, ...updateFacebook, ...updateTwitter, ...updateInstagram, ...updateWebsite };
        console.log(signatureUpdate);
        Axios.put(`${key}update-signature/${client_id}`, signatureUpdate)
            .then((response) => {
                console.log(response);
                setSignSuccess(true);
                reUpdate()

            })
            .catch((err) => {
                console.log(err);
            })
    }
    const reUpdate = () => {
        Axios(`${key}all-signature`)
            .then(res => {
                const signatures = res.data
                setAllSignatures(signatures)
            })
            .then(err => {
                console.log(err);
            })
    }



    const handleSignatureUpdate = (singnature) => {

        console.log(singnature)
        setSignClient(singnature)


        // console.log(singnature.id);

        setSignatureId(singnature.id);
    }
    // const handleSignatureUpdate = (id) => {
    //     // setSignClient(singnature);
    //     // console.log(signClient)

    //     setSignatureId(id);
    //     console.log(signatureId)
    // }

    const handleBlur = (e) => {
        const value = { ...formValue };
        value[e.target.name] = e.target.value;
        setFormValue(value);
    };

    //get all
    const getSignature = () => {
        Axios(`${key}all-signature`)
            .then(res => {
                const signatures = res.data
                setAllSignatures(signatures)
            })
            .then(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getSignature()
    }, [])

    const reFetch = () => {
        getSignature()
    }
    // create signature data
    const handleSubmit = (e) => {
        const finalValue = { ...formValue };
        finalValue.signature = "signature"
        finalValue.client_id = "1"
        console.log(finalValue);
        Axios.post(`${key}create-signature`, finalValue)
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
    // delete signature

    // delete feature
    const reDelete = () => {
        handleSignatureDelete();
    }
    const handleSignatureDelete = (client_id) => {
        Axios.delete(`${key}delete-signature/${client_id}`)
            .then(res => {
                console.log(res.data);
                const sign = allSignatures.filter(newSign => newSign.id !== res.data.id)
                setAllSignatures(sign)
                reDelete()
            })
            .catch(err => {
                console.log(err);
            })
    }

    // update feature
    // const handleOldValue = (id) => {
    //     console.log(id);
    //     setShowOldValue(id)
    // }
    const handleUpdateSignInput = (e) => {
        const updateTag = { ...updateValue }
        updateTag[e.target.name] = e.target.value
        setUpdateValue(updateTag)
    }

    // const handleUpdateSubmit = (e) => {
    //     const newSign = { ...updateValue }
    //     const client_id = showOldValue
    //     Axios.put(`${key}update-signature/${client_id}`, newSign)
    //         .then((res) => {
    //             console.log(res.data);
    //             reFetch()
    //         })
    //         .catch((error) => console.log(error));
    //     e.preventDefault();
    // }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className={classes.paper}>
                            <div style={{ margin: '0 auto' }}>
                                <Button onClick={handleAddEmailModalOpen} variant="contained" className={classes.emailBtn}>
                                    Add New
                                </Button>
                                {/* <Button  variant="contained" className={classes.emailBtn}
                                    
                                >
                                    Update
                                </Button> */}
                            </div>
                            {
                                allSignatures !== null &&
                                allSignatures.map((singnature) => (
                                    <div className={classes.signatureBox}>
                                        <div className="d-flex" style={{ marginLeft: '0.5rem' }}>
                                            <div>
                                                <img className="pt-2" width="50%" src={avatar} alt="" />
                                            </div>
                                            <div style={{ color: '#2d2d2d', marginLeft: '-1.5rem' }}>
                                                <EditIcon style={{ color: '#4195D1' }} className="ml-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handleSignatureUpdate(singnature)} />
                                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLongTitle">Update Your Signature</h5>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <form>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Signature</label>
                                                                            <input type="text" className="form-control" id="signature" name="signature" defaultValue={signClient.signature} onBlur={handleBlurSignature} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Name</label>
                                                                            <input type="text" className="form-control" id="name" name="name" defaultValue={signClient.name} onBlur={handleBlurName} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Designation</label>
                                                                            <input type="text" className="form-control" id="designation" name="designation" defaultValue={signClient.designation} onBlur={handleBlurDesignation} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Phone</label>
                                                                            <input type="tel" className="form-control" id="phone" name="phone" defaultValue={signClient.phone} onBlur={handleBlurPhone} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Address</label>
                                                                            <input type="url" className="form-control" id="address" name="address" defaultValue={signClient.address} onBlur={handleBlurAddress} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Facebook Profile Link</label>
                                                                            <input type="url" className="form-control" id="facebook" name="facebook" defaultValue={signClient.facebook} onBlur={handleBlurFacebook} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Twitter Profile Link</label>
                                                                            <input type="url" className="form-control" id="twitter" name="twitter" defaultValue={signClient.twitter} onBlur={handleBlurTwitter} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Instagram Profile Link</label>
                                                                            <input type="url" className="form-control" id="instagram" name="instagram" defaultValue={signClient.instagram} onBlur={handleBlurInstagram} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <label htmlFor="">Website Address</label>
                                                                            <input type="url" className="form-control" id="website" name="website" defaultValue={signClient.website} onBlur={handleBlurWebsite} />
                                                                        </div>
                                                                    </div>

                                                                </form>
                                                            </div>
                                                            <div class="modal-footer">
                                                                {signSuccess ? <div class="alert alert-success" role="alert">
                                                                    Updated Your Signature
                                                </div> : null}

                                                                <button type="button" class="btn btn-primary" onClick={(e) => updateSignatureInfo(e)}>Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Typography variant="body2" align="right" style={{ marginRight: '18rem', marginTop: '-1.4rem', color: '#4195D1' }}
                                                    onClick={() => handleSignatureDelete(singnature.client_id)}
                                                >
                                                    {/* <UpdateIcon /> */}
                                                    <DeleteForeverSharpIcon />
                                                </Typography>
                                                <h6> {singnature.name} </h6>
                                                <p> <strong> {singnature.designation} </strong> </p>
                                                <p>
                                                    <span> Phone : {singnature.phone} </span>
                                                    <span style={{ padding: '0 1rem' }}> Address : {singnature.address} </span>
                                                </p>

                                                <hr style={{ backgroundColor: '#4195D1', padding: '0.5px 0' }} />
                                                <div style={{ margin: '0 4.5rem' }}>
                                                    <a href={singnature.facebook} target="_blank" style={{ color: "#2d2d2d" }}>
                                                        <FacebookIcon style={{ margin: '0 1rem' }} />
                                                    </a>
                                                    <a href={singnature.twitter} target="_blank" style={{ color: "#2d2d2d" }}>
                                                        <TwitterIcon style={{ margin: '0 1rem' }} />
                                                    </a>
                                                    <a href={singnature.instagram} target="_blank" style={{ color: "#2d2d2d" }}>
                                                        <InstagramIcon style={{ margin: '0 1rem' }} />
                                                    </a>
                                                    <a href={singnature.website} target="_blank" style={{ color: "#2d2d2d" }}>
                                                        <LanguageIcon style={{ margin: '0 1rem' }} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }



                        </div>

                        <div>
                            {/* Add email Signature start */}
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={addEmailModal}
                                onClose={handleAddEmailModalClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={addEmailModal}>
                                    <div className={classes.emailModal}>
                                        <h6 className="text-center" style={{ color: '#fff', padding: '0.5rem 0' }}> Add new Signature </h6>
                                        <form className={classes.form} noValidate>
                                            {successAlert === true &&
                                                <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                                                    {/* <Alert.Heading>Successfull! Invitation link sended to the customer email!</Alert.Heading> */}
                                                    <p>
                                                        Email Signature Successfully created!
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
                                                    name='name'
                                                    autoComplete='name'
                                                    autoFocus
                                                    placeholder='Name'
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
                                                    id='designation'
                                                    name='designation'
                                                    autoComplete='designation'
                                                    autoFocus
                                                    placeholder='Designation'
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
                                                    id='phone'
                                                    name='phone'
                                                    autoComplete='phone'
                                                    autoFocus
                                                    placeholder='Phone'
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
                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='facebook'
                                                    name='facebook'
                                                    autoComplete='facebook'
                                                    autoFocus
                                                    placeholder='Facebook Profile link'
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
                                                    id='twitter'
                                                    name='twitter'
                                                    autoComplete='twitter'
                                                    autoFocus
                                                    placeholder='Twitter Profile link'
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
                                                    id='instagram'
                                                    name='instagram'
                                                    autoComplete='instagram'
                                                    autoFocus
                                                    placeholder='Instagram Profile link'
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
                                                    id='website'
                                                    name='website'
                                                    autoComplete='website'
                                                    autoFocus
                                                    placeholder='Website Address'
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
                                                Add
                                            </Button>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                            {/* Add email Signature end */}


                            {/* Update email Signature start */}
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={updateEmailModal}
                                onClose={handleUpdateEmailModalClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={updateEmailModal}>
                                    <div className={classes.emailModal}>
                                        <h6 className="text-center" style={{ color: '#fff', padding: '0.5rem 0' }}> Add new Signature </h6>
                                        <form className={classes.form} noValidate>
                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='name'
                                                    name='name'
                                                    autoComplete='name'
                                                    autoFocus
                                                    placeholder='Name'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>

                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='designation'
                                                    name='designation'
                                                    autoComplete='designation'
                                                    autoFocus
                                                    placeholder='Designation'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>

                                            <div style={{ margin: "1rem 0" }}>
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
                                                    onBlur={handleUpdateSignInput}
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
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>

                                            <br />
                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='facebook'
                                                    name='facebook'
                                                    autoComplete='facebook'
                                                    autoFocus
                                                    placeholder='Facebook Profile link'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>
                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='twitter'
                                                    name='twitter'
                                                    autoComplete='twitter'
                                                    autoFocus
                                                    placeholder='Twitter Profile link'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>
                                            <div style={{ margin: "1rem 0" }}>
                                                <TextField
                                                    style={{ backgroundColor: "#fff" }}
                                                    variant='outlined'
                                                    margin='normal'
                                                    required
                                                    fullWidth
                                                    id='instagram'
                                                    name='instagram'
                                                    autoComplete='instagram'
                                                    autoFocus
                                                    placeholder='Instagram Profile link'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>
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
                                                    placeholder='Website Address'
                                                    onBlur={handleUpdateSignInput}
                                                />
                                            </div>
                                            <Button
                                                type='submit'
                                                fullWidth
                                                variant='contained'
                                                className={classes.ticketBtn}
                                                // onClick={handleUpdateSubmit}
                                                style={{ marginTop: "1rem" }}
                                            >
                                                Update
                                            </Button>
                                        </form>
                                    </div>
                                </Fade>
                            </Modal>
                            {/* Update email Signature end */}
                        </div>

                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default EmailSignature;