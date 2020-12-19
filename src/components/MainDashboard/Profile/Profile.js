import { Button, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { key } from '../../../apiKey';
import editIcon from '../../../images/editIcon.png';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './ProfileStyle';


const Profile = () => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [profile_picture, setProfile] = useState('');

    const [disable, setDisable] = useState(true)
    const [updateClient, setUpdateClient] = useState({})
    const [oldPassword, setOldPassword] = useState({})
    const [newPassword, setNewPassword] = useState({})
    const [confirmPassword, setConfirmPassword] = useState({})
    // const [updateImage, setUpdateImage] = useState('')
    const [errorAlert, setErrorAlert] = useState("");
    const [successAlert, setSuccessAlert] = useState("");


    const [success, setSuccess] = useState(false)


    // const handleBlur = (e) => {
    //     const newProfile = { ...name }
    //     newProfile[e.target.name] = e.target.value
    //     setName(newProfile)
    // }
    const handleOldPasswordBlur = (e) => {
        let oldPass = { ...oldPassword }
        console.log(oldPass);
        oldPass[e.target.name] = e.target.value
        setOldPassword(oldPass);
    }
    const handleNewPasswordBlur = (e) => {
        const newPass = { ...newPassword }
        console.log(newPass);
        newPass[e.target.name] = e.target.value

        setNewPassword(newPass)

    }

    const handleConfirmPasswordBlur = (e) => {
        const confirmPass = { ...confirmPassword }
        console.log(confirmPass);
        confirmPass[e.target.name] = e.target.value
        setConfirmPassword(confirmPass)
    }

    console.log(name)

    // const updateForm = (e) => {
    //     e.preventDefault();

    //     const id = updateClient.id;
    //     const data = new FormData()

    //     data.append('name', name)
    //     data.append('profile_picture', profile_picture)
    //     // data.append('id',id)
    //     console.log(data);

    //     Axios.put(`${key}client-update/${id}`,data)
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("name:", name);
        const client_id = updateClient.id;
        // console.log("file:", profile_picture);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('profile_picture', profile_picture);
        // const newData = {
        //     name
        // }
        // console.log(newData);
        Axios.post(`${key}client-update/${client_id}`, formData)
            .then((res) => {
                setSuccessAlert(true)
                reFetch()
                console.log("done", res)

            }).catch((err) => {
                console.log(err.message)
            })
    }

    const updatePasswordInfo = (e) => {
        e.preventDefault();
        // console.log(profileInfo);
        const client_id = updateClient.id;

        const clientUpdatePassword = { ...oldPassword, ...newPassword, ...confirmPassword };
        console.log(clientUpdatePassword);
        Axios.put(`${key}client-pass-change/${client_id}`, clientUpdatePassword)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
                setSuccess(true);
            })
    }



    useEffect(() => {
        Axios.get(`${key}clients`)
            .then((response) => {
                console.log(response.data);
                const clients = response.data;
                const singleClient = clients.filter(client => client.email === localStorage.client);
                setUpdateClient(singleClient[0]);
                console.log(singleClient);
            })
    }, [])
    const reFetch = () => {
        Axios.get(`${key}clients`)
            .then((response) => {
                console.log(response.data);
                setUpdateClient(response.data)
                // const clients = response.data;
                // const singleClient = clients.filter(client=> client.email === localStorage.client);
                // setUpdateClient(singleClient[0]);
                // console.log(singleClient);
            })
    }


    console.log(updateClient.profile_picture);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={3}>


                        <div className={classes.paper}>
                            <Form onSubmit={onFormSubmit} method="post" encType="multipart/form-data">
                                {successAlert === true &&
                                    <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
                                        {/* <Alert.Heading>Successfull! Invitation link sended to the customer email!</Alert.Heading> */}
                                        <p>
                                            Profile Successfully Update!
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
                                <div style={{ margin: ' 0 auto', textAlign: 'center' }}>
                                    <img className="pt-2" style={{ position: 'relative' }} width="20%" src={`http://lightletters.sswarehouses.com/uploads/client_pro_pic/${updateClient.profile_picture}`} alt="" />
                                    {/* <Form.Group>
                                    <Form.File   id="icon-button-file" label="Change your picture" style={{color:"black"}} name="profile_picture" onChange={ (e)=>setProfile(e.target.files[0])} />
                                    
                                </Form.Group> */}
                                    <input accept="image/*" className={classes.input} id="icon-button-file" type="file" style={{ display: "none" }} name="profile_picture" onChange={(e) => setProfile(e.target.files[0])} />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            {/* <PhotoCamera style={{position:"absolute"}} /> */}
                                            <img style={{ position: 'absolute', top: '2.5rem', right: '1.4rem' }} src={editIcon} alt="" />
                                        </IconButton>
                                    </label>
                                    {/* <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Upload Image</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group>
                                                <Form.File id="exampleFormControlFile1" label="Example file input" onBlur={handleImageBlur} name="profile_picture"/>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                        Close
                                        </Button>
                                        <Button variant="primary" onClick={updateForm}>
                                        Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal> */}
                                </div>
                                <br></br>
                                <br></br>
                                <Typography style={{ color: '#2d2d2d', marginTop: '1rem' }} component="body2" variant="body2">
                                    Personal Details
                            </Typography>
                                <EditIcon onClick={() => setDisable(!disable)} fontSize="small" style={{ marginLeft: '32.5rem', marginTop: '-1.5rem', color: '#2d2d2d' }} />
                                {/* <form onSubmit={updateForm}  method="put" className={classes.form} noValidate style={{color: '#2d2d2d'}}> */}
                                <div style={{ marginBottom: "1rem" }}>
                                    <label htmlFor="" style={{ color: "black" }}> Name </label>
                                    <TextField
                                        disabled={disable ? disable : ''}
                                        style={{ borderRadius: '4px' }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        autoComplete="name"

                                        autoFocus
                                        placeholder="Enter Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </div>
                                <div className="pb-2">
                                    <label htmlFor="" style={{ color: "black" }}> Email </label>
                                    <br/>
                                    <small style={{color:'#2d2d2d'}}> NB: Email not changeable </small>
                                    <TextField
                                        // disabled={disable ? disable : ''}
                                        disabled
                                        style={{ borderRadius: '4px'}}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        placeholder="user@email.com"
                                    // onBlur={handleBlur}
                                    />
                                </div>

                                <Button
                                    style={{ padding: '0.6rem 0', margin: '1rem 0' }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={onFormSubmit}

                                >
                                    SAVE
                                </Button>

                            </Form>


                            <form onSubmit={updatePasswordInfo} method="put">
                                <div className="pb-2">
                                    <label htmlFor="" style={{ color: "black" }}> Old Password </label>
                                    <TextField
                                        // disabled={disable ? disable : ''}
                                        style={{ borderRadius: '4px' }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        autoFocus
                                        placeholder="***********"
                                        // onBlur={handleBlur}
                                        onBlur={handleOldPasswordBlur}
                                        type="password"
                                    />
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="" style={{ color: "black" }}> New password </label>
                                    <TextField
                                        // disabled={disable ? disable : ''}
                                        style={{ borderRadius: '4px' }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="new_password"
                                        name="new_password"
                                        autoComplete="new_password"
                                        autoFocus
                                        placeholder="***********"
                                        onBlur={handleNewPasswordBlur}
                                        type="password"
                                    />
                                </div>
                                <div className="pb-2">
                                    <label htmlFor="" style={{ color: "black" }}> Retype New Password </label>
                                    <TextField
                                        // disabled={disable ? disable : ''}
                                        style={{ borderRadius: '4px' }}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="confirm_password"
                                        name="confirm_password"
                                        autoComplete="confirm_password"
                                        autoFocus
                                        placeholder="***********"
                                        // onBlur={handleBlur}
                                        onBlur={handleConfirmPasswordBlur}
                                        type="password"
                                    />
                                    {success ? <h5 style={{ color: "red", fontWeight: "600" }}>password doesn't match !</h5> : null}
                                </div>
                                <Button
                                    style={{ padding: '0.6rem 0', margin: '1rem 0' }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={updatePasswordInfo}

                                >
                                    CHANGE PASSWORD
                                </Button>
                            </form>




                            {/* <Typography component="body2" variant="body2">
                                Change Password
                                </Typography>
                            <EditIcon fontSize="small" style={{ marginLeft: '24.5rem' }} />
                            <div className="mt-3">
                                <label htmlFor=""> Enter your old password </label>
                                <TextField
                                    disabled={disable ? disable : ''}
                                    style={{ borderRadius: '4px' }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="oldPass"
                                    type="password"
                                    id="oldPass"
                                    autoComplete="current-password"
                                    placeholder="***********"
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="mt-3">
                                <label htmlFor=""> Enter new password </label>
                                <TextField
                                    disabled={disable ? disable : ''}
                                    style={{ borderRadius: '4px' }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPass"
                                    type="password"
                                    id="newPass"
                                    autoComplete="current-password"
                                    placeholder="***********"
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="mt-3">
                                <label htmlFor=""> Confrim password </label>
                                <TextField
                                    disabled={disable ? disable : ''}
                                    style={{ borderRadius: '4px' }}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newPass"
                                    type="password"
                                    id="newPass"
                                    autoComplete="current-password"
                                    placeholder="***********"
                                    onBlur={handleBlur}
                                />
                            </div> */}
                        </div>
                    </Grid>

                </Container>
            </main>
        </div>
    );
};

export default Profile;