import { Avatar, Card, CardContent, CardHeader, Chip, Container, Grid, IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css';
import { key } from '../../../apiKey';
import avatar from '../../../images/avatar.png';
import AppBarDrawer from '../AppBarDrawer';
import { useStyles } from './InboxDetailsStyle';
const GroupDetails = () => {
    const { inboxId } = useParams()
    const classes = useStyles();
    const [mailDetails, setMailDetails] = useState(null)
    const [allReply, setReply] = useState(null)
    const [customerInfo, setCustomerInfo] = useState(null)
    // const [mail_body, setMailBody] = useState("");
    // const [mail_file, setMailfile] = useState("");
    useEffect(() => {
        Axios(`${key}specific-group-mail/${inboxId}`)
            .then(res => {
                console.log(res);
                const mails = res.data.mail_details
                setMailDetails(mails)
                const customer_info = res.data.customer_info
                setCustomerInfo(customer_info)
                const all_reply_mail = res.data.all_reply
                setReply(all_reply_mail)
            })
            .then(err => {
                console.log(err);
            })
    }, [inboxId])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarDrawer />
            {
                mailDetails !== null &&
                <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={3}>
                        <div className="d-flex align-items-center my-3" style={{ color: '#2d2d2d' }}>
                            <Avatar aria-label="recipe" variant="rounded" className={classes.avatar}>
                                <img width="100%" src={avatar} alt="" />
                            </Avatar>
                            <Typography variant="body1" style={{ margin: '0.5rem 0.5rem', color: '#2d2d2d' }}>
                                    <strong style={{ marginLeft: '1rem' }}> {mailDetails.group_name}</strong> <br />
                                <small style={{ marginLeft: '1rem' }}> 
                                        From : {mailDetails.sender}
                                </small>
                                <br/>
                                
                                <small style={{ marginLeft: '1rem' }}>
                                        To : {mailDetails.receiver}
                                </small>
                                <br />
                                <small style={{ marginLeft: '1rem' }}>
                                        Cc : {mailDetails.cc }
                                </small>
                                <br />
                                <small style={{ marginLeft: '1rem' }}>
                                        Subject : {mailDetails.subject }
                                </small>
                                <br />

                                    <div className="d-flex align-items-center justify-content-between">
                                        <Chip
                                            style={{
                                                marginLeft: '1rem',
                                                marginTop: '0.5rem',
                                                fontSize: '11px',
                                                backgroundColor: '#203D79',
                                                height: '1.5rem',
                                                width: '5rem',
                                                color: '#fff',
                                            }}
                                            label={mailDetails.type}

                                        />
                                        <div className="mx-2"> 
                                            {
                                                mailDetails.deadline && `Deadline : ${moment(mailDetails.deadline).subtract(10, 'days').calendar()}`
                                            }
                                        </div>
                                        <div className="mx-2">
                                            {
                                                mailDetails.remainder !== null  && `Remainder : ${moment(mailDetails.remainder).subtract(10, 'days').calendar()}`
                                            }
                                        </div>
                                </div>

                            </Typography>
                        </div>
                        <Typography variant="body1" style={{ marginLeft: '4rem', color: '#2d2d2d', lineHeight: '2' }}>
                                {ReactHtmlParser(mailDetails.mail_body)}
                        </Typography>
                            {mailDetails.mail_file !== null &&
                                <div className={classes.downloadfileStyle}>
                                    <Typography variant="h6" component="h6" align="center"> {mailDetails.mail_file} </Typography>
                                <a href={`${key}group-mail-file-down/${mailDetails.mail_file}`}>
                                        <Button
                                            style={{ marginLeft: '4rem' }}
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<CloudDownloadIcon />}
                                        >
                                            Download
                                        </Button>
                                    </a>
                                </div>
                            }

                    </Grid>
                        {mailDetails.reply_status !== null &&
                            <div style={{ marginLeft: '3rem', marginTop: '35vh' }}>
                                {allReply !== null && allReply.map((reply) => (
                                    <div>
                                        <hr />
                                        <Card className={classes.root}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                                        <img src={`http://lightletters.sswarehouses.com/uploads/customer_pro_pic/${customerInfo !== null && customerInfo.profile_picture}`} alt="" style={{ width: '100%' }} />
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="settings">
                                                        {/* <MoreVertIcon /> */}
                                                    </IconButton>
                                                }
                                                title={customerInfo !== null && `${customerInfo.first_name} ${customerInfo.last_name}`}
                                                subheader={moment(reply.created_at).fromNow()}

                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {ReactHtmlParser(reply.mail_body)}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                        <hr />
                                    </div>
                                ))

                                }
                            </div>
                        }
                    {/* {   showReplyBox &&
                        <div className="my-5">
                            <form noValidate onSubmit={onFormSubmit} autoComplete="off" method="POST" encType="multipart/form-data">
                                <SunEditor
                                    width="100%"
                                    placeholder="Details..."
                                    name="editor"
                                    setOptions={{
                                        height: 100,
                                        buttonList: [
                                            ['font', 'fontSize', 'formatBlock'],
                                            ['bold', 'underline', 'italic',],
                                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                                            // ['link','image'],
                                            ['fullScreen', 'codeView'],
                                        ]
                                    }}
                                    onChange={(e) => setMailBody(e)}
                                // onImageUpload={handleImageUpload}
                                />
                                <input type="file" id="mail_file" name="mail_file" onChange={(e) => setMailfile(e.target.files[0])} />
                                <Button type="submit" variant="contained" className={classes.btnStyle} color="primary">
                                    SEND
                                </Button>
                        </form>
                    </div>
                    } */}
                </Container>
            </main>
            }
        </div>
    );
};

export default GroupDetails;