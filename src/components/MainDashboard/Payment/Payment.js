import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { key } from '../../../apiKey';
import paymentImg from '../../../images/cardIcon.svg';
import visa from '../../../images/Input.svg';
import './Payment.css';


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

const Payment = () => {
    const { register, handleSubmit, errors } = useForm();
    const classes = useStyles();
    // For Billing Info
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    //For Credit Card Info
    const [card_number, setCardnum] = useState();
    const [card_holder_name, setCardholder] = useState();
    const [expire_date, setExpdate] = useState();
    const [cvv, setCvv] = useState();
    const client_id = 1;
    const type = "STARTER";

    const onSubmit = () => {
        const newCustomer = {
            name,
            address,
            city,
            zip,
            country,
            card_number,
            card_holder_name,
            expire_date,
            cvv,
            client_id,
            type
        };

        console.log(newCustomer);

        axios
            .post(`${key}store-payment`, newCustomer)
            .then((res) => {
                console.log(res);
                setName("");
                setAddress("");
                setCity("");
                setZip("");
                setCountry("");
                setCardnum("");
                setCardholder("");
                setExpdate("");
                setCvv("");
                window.location = './invoice'
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div>
                                <div style={{ textAlign: 'center', paddingBottom: '3rem'}}>
                                    <h1 style={{
                                        fontSize: '40px',
                                        fontWeight: 'bold'
                                    }}>
                                        Payment
                                    </h1>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: '400'
                                        }}>

                                        Choose payment method bellow
                                    </p>
                                    <div >
                                        <img style={{ border: '2px solid #4195D1', padding: '1.5rem 5rem' }} src={paymentImg} alt=""/>
                                    </div>
                                </div>
                                <form className='paymentForm' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='d-flex'>
                                        <div className='' style={{ width: '40%', margin: '0 2rem'}}>
                                            <h6 className="my-4"
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Billing Info
                                            </h6>
                                            <div>
                                                <label htmlFor="name"> FULL NAME </label>
                                                {errors.name && (
                                                    <li style={{ color: "red" }}>Username is required!</li>
                                                )}
                                                <input
                                                    name='name'
                                                    className='mr-2'
                                                    ref={register({ required: true })}
                                                    placeholder='Marie Winter'
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <br/>
                                            <div>
                                                <label htmlFor="address"> ADDRESS </label>
                                                {errors.address && (
                                                    <li style={{ color: "red" }}>Address is required!</li>
                                                )}
                                                <input
                                                    name='address'
                                                    ref={register({ required: true })}
                                                    placeholder='4098 Water Street'
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <br/>
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <label htmlFor="city"> CITY </label>
                                                    {errors.city && (
                                                        <li style={{ color: "red" }}>City is required!</li>
                                                    )}
                                                    <input
                                                        style={{width: '95%'}}
                                                        name='city'
                                                        ref={register({ required: true })}
                                                        placeholder='San Francisco'
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="zipCode"> ZIP CODE </label>
                                                    {errors.zipCode && (
                                                        <li style={{ color: "red" }}>Zip Code is required!</li>
                                                    )}
                                                    <input
                                                        name='zipCode'
                                                        ref={register({ required: true })}
                                                        placeholder='45546'
                                                        onChange={(e) => setZip(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <br/>
                                            <div>
                                                <label htmlFor="country"> COUNTRY </label>
                                                {errors.country && (
                                                    <li style={{ color: "red" }}>Country is required!</li>
                                                )}
                                                <select
                                                    name='country'
                                                    className='mr-2'
                                                    ref={register({ required: true })}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                >

                                                    <option value='United States'>United States</option>
                                                    <option value='Canada'>Canada</option>
                                                    <option value='Australia'>Australia</option>
                                                    <option value='United Kingdom'>United Kingdom</option>
                                                </select>
                                            </div>
                                            <br/>
                                        </div>

                                        <div className='' style={{ width: '40%', margin: '0 2rem' }}>
                                            <h6 className="my-4"
                                                style={{
                                                    fontSize: '20px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Credit Card Info
                                            </h6>
                                            <div>
                                                <label htmlFor="cardNumber"> CARD NUMBER </label>
                                                {errors.cardNumber && (
                                                    <li style={{ color: "red" }}>Card Number is required!</li>
                                                )}
                                                <div className="d-flex">
                                                    <input
                                                        name='cardNumber'
                                                        className='mr-2'
                                                        ref={register({ required: true })}
                                                        placeholder='4242 4242 4242 4242'
                                                        onChange={(e) => setCardnum(e.target.value)}
                                                    />
                                                    <img src={visa} alt="" />
                                                </div>
                                            </div>
                                            <br/>
                                            <div>
                                                <label htmlFor="cardHolder"> CARD HOLDER NAME </label>
                                                {errors.cardHolder && (
                                                    <li style={{ color: "red" }}>Card Holder Name is required!</li>
                                                )}
                                                <input
                                                    name='cardHolder'
                                                    ref={register({ required: true })}
                                                    placeholder='Marie Winter'
                                                    onChange={(e) => setCardholder(e.target.value)}
                                                />
                                            </div>
                                            <br/>

                                            <div>
                                                <label htmlFor="expireDate"> EXPIRE DATE </label>
                                                {errors.expireDate && (
                                                    <li style={{ color: "red" }}>Expire date is required!</li>
                                                )}
                                                <input
                                                    name='expireDate'
                                                    ref={register({ required: true })}
                                                    placeholder='05/22'
                                                    onChange={(e) => setExpdate(e.target.value)}
                                                />
                                            </div>
                                            <br/>

                                            <div>
                                                <label htmlFor="cvv"> CVV </label>
                                                {errors.expireDate && (
                                                    <li style={{ color: "red" }}>CVV date is required!</li>
                                                )}
                                                <input
                                                    name='cvv'
                                                    ref={register({ required: true })}
                                                    placeholder='4098'
                                                    onChange={(e) => setCvv(e.target.value)}
                                                />
                                            </div>
                                            <br/>
                                        </div>

                                    </div>
                                    <input id="payment-btn" value='Continue' type='submit' />
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default Payment;