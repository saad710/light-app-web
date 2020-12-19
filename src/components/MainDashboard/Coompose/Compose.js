import DateFnsUtils from '@date-io/date-fns';
import { Backdrop, Button, Card, CardContent, CardHeader, Checkbox, CircularProgress, Fade, FormControl, FormControlLabel, FormGroup, InputAdornment, Modal, Slide, Snackbar, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Axios from 'axios';
import 'date-fns';
import React, { useContext, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { key } from '../../../apiKey';
import { ComposeContext } from '../../../Providers/ComposeProvider';
import AppBarDrawer from '../AppBarDrawer';
import './Compose.css';
import { useStyles } from './ComposeStyle';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}


const MailCompose = () => {
    const date = new Date()
    
    const { groups, allTag } = useContext(ComposeContext)
    const classNamees = useStyles();
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    console.log("receiver test", receiver);
    const [client_id] = useState(1);
    const [cc, setCc] = useState([]);
    console.log("cc test", cc);
    const [bcc, setBcc] = useState("");
    const [mail_body, setMailBody] = useState("");
    const [mail_file, setMailfile] = useState("");
    const [selectGroup, setSelectGroup] = useState("");
    const [selectTag, setSelectTag] = useState("");
    const [subject, setSubject] = useState("");
    const [allRemainder, setAllRemainder] = useState([])
    const [quickReply, setQuickReply] = useState([])
    const [deadlineDate, setDeadlineDate] = useState(date.setDate(date.getDate() + 2))
    const [schduleTime, setSchduleTime] = useState("")

    const [progess, setProgress] = useState()

    console.log("progess", progess);

    // checked
    const [checkBox, setCheckBox] = useState({
        quickReply: false,
        hideContactInfo: false,
        // noReply: false,
        replyNeeded: false,
        setRemainder: false,
        setDeadLine: false
    });

    console.log(mail_file);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('sender', sender);
        formData.append('receiver', receiver);
        formData.append('client_id', client_id);
        console.log(cc)
        console.log(allRemainder)
        if(cc.length >0) {
            cc.forEach((item) => formData.append("cc[]", item))
        }
        formData.append('bcc', bcc);
        formData.append('group', selectGroup);
        formData.append('tag', selectTag);
        formData.append('subject', subject);
        formData.append('mail_body', mail_body);
        formData.append('mail_file', mail_file)
        if(checkBox.setRemainder) {
            allRemainder.forEach((item) => formData.append("remainder[]", item))
        }
        if(checkBox.setDeadLine) {
            formData.append('deadline', deadlineDate)
        }
        formData.append('quick_reply', quickReply)
        if (checkBox.replyNeeded) {
            formData.append('reply_status', true)
        }
        if (!checkBox.replyNeeded) {
            formData.append('reply_status', null)
        }
        if (checkBox.hideContactInfo) {
            formData.append('hide_status', true)
        }
        if(!checkBox.hideContactInfo) {
            formData.append('hide_status', null)
        }
        setProgress(true)
        formData.append('schedule', schduleTime)
        
        Axios.post(`${key}send-mail-customer/`, formData)
            .then((res) => {
                console.log("done", res)
                setProgress(false)
            }).catch((err) => {
                console.log(err.message)
            })
    }


    //dropdown state

    const [ccOpen, setCcOpen] = useState(false)
    const [bccOpen, setBccOpen] = useState(false)
    const [group, setGroup] = useState(false)
    const [tags, setTags] = useState(false)

    const handleGroup = () => {
        setGroup(!group)
        setReceiver("")
    }
    
 

    const [closeCc, setCloseCc] = useState(false)
    // multiple cc
    const [cc2, setCc2] = useState(false)
    const [cc3, setCc3] = useState(false)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    };

    // schedule 
    const handleSetSchduleTime = (e) => {
        e.preventDefault()
        // const newTime = { ...schduleTime }
        // newTime[e.target.name] = e.target.value
        setSchduleTime(e.target.value)
        // console.log("date time test", newTime)
    } 

    // *** remainder all functionality start *** //
    const [remainderDate1, setRemainderDate1] = useState(date.setDate(date.getDate() + 1))
    const handleRemainderDate = (date) => {
        setAllRemainder([...allRemainder, date.toDateString()]);
    };

    const [remainderDate2, setRemainderDate2] = useState(date.setDate(date.getDate() + 2))
    console.log("remainder2", remainderDate2);
    const handleRemainderDate2 = (date) => {
        setAllRemainder([...allRemainder, date.toDateString()])
    };

    const [remainderDate3, setRemainderDate3] = useState(date.setDate(date.getDate() + 3))
    const handleRemainderDate3 = (date) => {
        setAllRemainder([...allRemainder, date.toDateString()])
    };

    // 2nd 3rd remainder/multiple remainder opener
    const [remainder2, setRemainder2] = useState(false)
    const [remainder3, setRemainder3] = useState(false)

    
    const handleDeadlineDate = (date) => {
        setDeadlineDate(date.toDateString());
    };
    

    // quick reply

    const [quickReply1, setQuickReply1] = useState(false)
    const [quickReply2, setQuickReply2] = useState(false)

    // progress message
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    const handleClick = (Transition) => () => {
        if(!progess) {
            setTransition(() => Transition);
            setMsgOpen(true);
        }
    };

    const handleMsgClose = () => {
        setMsgOpen(false);
    };

    return (
        <div className={classNamees.root}>
            <CssBaseline />
            <AppBarDrawer />
            <main className={classNamees.content}>
                <div className={classNamees.appBarSpacer} />
                <Container maxWidth="md" className={classNamees.container}>
                    <Grid container spacing={3}>
                        <div className={classNamees.paper}>
                            <Card style={{ margin: '0 auto', background: '#213F7E' }}>
                                <CardHeader
                                />
                                <CardContent>
                                    <form className={classNamees.form} onSubmit={onFormSubmit} method="POST" encType="multipart/form-data">
                                        <div>
                                            <FormControl>
                                                <TextField
                                                    id="sender"
                                                    name="sender"
                                                    // defaultValue={loggedInClient}
                                                    onChange={ (e)=>setSender(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">From</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    id="receiver"
                                                    name="receiver"
                                                    onChange={ (e)=>setReceiver(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <div className="d-flex">
                                                                <div>
                                                                                            To
                                                                </div>
                                                                <div className="d-flex" style={{ position: 'absolute', left: '64%' }}>
                                                                    <div className="px-2" onClick={() => setCcOpen(!ccOpen)}>
                                                                                                Cc
                                                                    </div>
                                                                    <div className="px-2" onClick={() => setBccOpen(!bccOpen)}>
                                                                                                Bcc
                                                                    </div>
                                                                    <div className="px-2" onClick={handleGroup}>
                                                                                                Group
                                                                    </div>
                                                                    <div className="px-2" onClick={() => setTags(!tags)}>
                                                                                                Add Tag
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />
                                                {
                                                    ccOpen &&
                                                    <TextField
                                                        className={closeCc === true && classNamees.ccShows}
                                                        id="cc"
                                                        name="cc"
                                                        onBlur={(e) => setCc([...cc, e.target.value])}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">
                                                                <div className="d-flex">
                                                                    <div>
                                                                            Cc
                                                                    </div>
                                                                    <div className="d-flex" style={{ position: 'absolute', left: '90%' }}>
                                                                        <div className="px-2" onClick={() => setCc2(!cc2)}>
                                                                            {setCc ? <AddBoxRoundedIcon /> : <IndeterminateCheckBoxRoundedIcon />}
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                    />
                                                }

                                                {
                                                    cc2 &&
                                                    <TextField
                                                        id="cc"
                                                        name="cc"
                                                        onBlur={(e) => setCc([...cc, e.target.value])}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">
                                                                <div className="d-flex">
                                                                    <div>
                                                                        Cc
                                                                    </div>
                                                                    <div className="d-flex" style={{ position: 'absolute', left: '90%' }}>
                                                                        <div className="px-2" onClick={() => setCc3(!cc3)}>
                                                                            {setCc3 ? <AddBoxRoundedIcon /> : <IndeterminateCheckBoxRoundedIcon />}
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                    />
                                                }
                                                {
                                                    cc3 &&
                                                    <TextField
                                                        id="cc"
                                                        name="cc"
                                                        onBlur={(e) => setCc([...cc, e.target.value])}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">
                                                                <div className="d-flex">
                                                                    <div>
                                                                         Cc
                                                                    </div>
                                                                    <div className="d-flex" style={{ position: 'absolute', left: '90%' }}>
                                                                        <div className="px-2" onClick={() => setCc3(!cc3)}>
                                                                            {setCc3 ? <AddBoxRoundedIcon /> : <IndeterminateCheckBoxRoundedIcon />}
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                    />
                                                }

                                                {
                                                    bccOpen &&
                                                    <TextField
                                                        id="bcc"
                                                        name="bcc"
                                                        onChange={(e) => setBcc(e.target.value)}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Bcc</InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                    />
                                                }

                                                {
                                                    group &&
                                                    <TextField
                                                        id="group"
                                                        name="group"
                                                        select
                                                        // onBlur={handleInput}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Group</InputAdornment>,
                                                        }}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        value={selectGroup}
                                                        onChange={(e) => setSelectGroup(e.target.value)}
                                                        variant="outlined"
                                                    >
                                                        {groups !== 'loading' && groups.map((option) => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.group_name}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                }
                                                {
                                                    tags &&
                                                    <TextField
                                                        id="tag"
                                                        name="tag"
                                                        // onBlur={handleInput}
                                                        select
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Add Tag</InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        value={selectTag}
                                                        onChange={(e) => setSelectTag(e.target.value)}
                                                    >
                                                        {allTag !== null && allTag.map((option) => (
                                                            <option key={option.id} value={option.tag_name}>
                                                                {option.tag_name}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                }

                                                <TextField
                                                    id="subject"
                                                    name="subject"
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">Subject</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />

                                                <div>
                                                    <FormGroup row style={{ color: '#fff' }} className="d-flex justify-content-between">

                                                        <div className="d-flex flex-column">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={checkBox.replyNeeded}
                                                                        onChange={handleChange}
                                                                        name="replyNeeded"
                                                                        style={{ color: '#4195D1' }}
                                                                    />
                                                                }
                                                                label="Reply Needed"
                                                            />

                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={checkBox.setRemainder}
                                                                        onChange={handleChange}
                                                                        name="setRemainder"
                                                                        style={{ color: '#4195D1' }}
                                                                    />
                                                                }
                                                                label="Set Remainder"
                                                            />
                                                        </div>

                                                        <div className="d-flex flex-column">
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={checkBox.hideContactInfo}
                                                                        onChange={handleChange}
                                                                        name="hideContactInfo"
                                                                        style={{ color: '#4195D1' }}
                                                                    />
                                                                }
                                                                label="Hide Contact Info"
                                                            />
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={checkBox.setDeadLine}
                                                                        onChange={handleChange}
                                                                        name="setDeadLine"
                                                                        style={{ color: '#4195D1' }}
                                                                    />
                                                                }
                                                                label="Set Deadline"
                                                            />
                                                        </div>
                                                    </FormGroup>

                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        {
                                                            checkBox.setRemainder &&
                                                            <div className="d-flex align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <Grid container justify="space-around">
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id="date-picker-dialog"
                                                                            label="Remainder"
                                                                            format="MM/dd/yyyy"
                                                                            disablePast="true"
                                                                            value={remainderDate1}
                                                                            onChange={handleRemainderDate}
                                                                            style={{ backgroundColor: '#fff' }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </MuiPickersUtilsProvider>
                                                                {
                                                                    remainder2 !== true ?
                                                                        <AddBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setRemainder2(!remainder2)} />
                                                                        :
                                                                        <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setRemainder2(!remainder2)} />
                                                                }
                                                            </div>
                                                        }
                                                        {
                                                            remainder2 &&
                                                            <div className="d-flex align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <Grid container justify="space-around">
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id="date-picker-dialog"
                                                                            label="Remainder"
                                                                            format="MM/dd/yyyy"
                                                                            disablePast="true"
                                                                            value={remainderDate2}
                                                                            onChange={handleRemainderDate2}
                                                                            style={{ backgroundColor: '#fff' }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </MuiPickersUtilsProvider>
                                                                {
                                                                    remainder3 !== true ?
                                                                        <AddBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setRemainder3(!remainder3)} />
                                                                        :
                                                                        <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setRemainder3(!remainder3)} />
                                                                }
                                                            </div>
                                                        }
                                                        {
                                                            remainder3 &&
                                                            <div className="d-flex align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <Grid container justify="space-around">
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id="date-picker-dialog"
                                                                            label="Remainder"
                                                                            format="MM/dd/yyyy"
                                                                            disablePast="true"
                                                                            value={remainderDate3}
                                                                            onChange={handleRemainderDate3}
                                                                            style={{ backgroundColor: '#fff' }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </MuiPickersUtilsProvider>
                                                                <AddBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" />
                                                            </div>
                                                        }
                                                    </div>

                                                    {
                                                        checkBox.setDeadLine &&
                                                        <div>
                                                            <div className="d-flex align-items-center">
                                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                    <Grid container justify="space-around">
                                                                        <KeyboardDatePicker
                                                                            margin="normal"
                                                                            id="date-picker-dialog"
                                                                            label="deadline"
                                                                            format="MM/dd/yyyy"
                                                                            disablePast="true"
                                                                            value={deadlineDate}
                                                                            onChange={handleDeadlineDate}
                                                                            style={{ backgroundColor: '#fff' }}
                                                                            KeyboardButtonProps={{
                                                                                'aria-label': 'change date',
                                                                            }}
                                                                        />
                                                                    </Grid>
                                                                </MuiPickersUtilsProvider>
                                                            </div>
                                                        </div>
                                                        
                                                    }
                                                </div>

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
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <div>
                                                            <FormControlLabel
                                                                style={{ color: '#fff' }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={checkBox.quickReply}
                                                                        onChange={handleChange}
                                                                        name="quickReply"
                                                                        style={{ color: '#4195D1' }}
                                                                    />}
                                                                label="Quick Reply"
                                                            />
                                                        </div>
                                                        <div>
                                                            {
                                                                checkBox.quickReply &&
                                                                <div className="d-flex align-items-center">
                                                                    <TextareaAutosize aria-label="quick reply" name="quickReplyComment1" onBlur={(e) => setQuickReply([...quickReply, e.target.value])} rows={2} placeholder="Quick Reply ..." />
                                                                    <div>
                                                                        {
                                                                            quickReply1 !== true ?
                                                                                <AddBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply1(!quickReply1)} />
                                                                                :
                                                                                <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply1(!quickReply1)} />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div >
                                                            {
                                                                quickReply1 &&
                                                                <div className="d-flex align-items-center">
                                                                    <TextareaAutosize aria-label="quick reply" name="quickReplyComment2" onBlur={(e) => setQuickReply([...quickReply, e.target.value])} rows={2} placeholder="Quick Reply ..." />
                                                                    <div>
                                                                        {
                                                                            quickReply2 !== true ?
                                                                                <AddBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply2(!quickReply2)} />
                                                                                :
                                                                                <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply2(!quickReply2)} />
                                                                        }
                                                                    </div>
                                                                </div>

                                                            }
                                                        </div>

                                                        {
                                                            quickReply2 &&
                                                            <div className="d-flex align-items-center">
                                                                <TextareaAutosize aria-label="quick reply" name="quickReplyComment3" onBlur={(e) => setQuickReply([...quickReply, e.target.value])} rows={2} placeholder="Quick Reply ..." />
                                                                <div>
                                                                    {

                                                                        <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply2(!quickReply2)} />
                                                                    }
                                                                </div>
                                                            </div>

                                                        }

                                                    </div>
                                                    <div className="btn-group" style={{ marginLeft: '14rem' }}>
                                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4195D1', padding: '0.5rem 1.5rem' }}
                                                            onClick={handleClick(TransitionLeft)}
                                                            
                                                        >
                                                            {
                                                                progess && <CircularProgress size="1.5rem" color="secondary" />
                                                            }
                                                            
                                                            Send
                                                        </button>
                                                        <button type="button"
                                                            style={{ backgroundColor: '#4195D1', padding: '0.5rem 0.4rem' }}
                                                            className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        </button>
                                                        <div className="dropdown-menu" id="schedule-sent-droupdown" style={{ backgroundColor: '#4195D1', padding: '0.5rem 0.4rem', color: '#fff', cursor: 'pointer' }}>
                                                            <Typography variant="body2" onClick={handleOpen}> Schedule Sent </Typography>
                                                        </div>
                                                        <Snackbar
                                                            // open={msgOpen}
                                                            onClose={handleMsgClose}
                                                            TransitionComponent={transition}
                                                            message=" Mail successfully send "
                                                            key={transition ? transition.name : ''}
                                                        />
                                                    </div>
                                                </div>

                                            </FormControl>
                                        </div>
                                                        
                                        {/* <input type="file" id="mail_file" name="mail_file" onChange={(e) => setMailfile(e.target.files[0])} /> */}
                                        {/* <button type="submit">Upload</button>  */}
                                        {/* <div className="btn-group" style={{ marginLeft: '14rem' }}>
                                            <button type="submit" className="btn btn-primary"
                                                style={{ backgroundColor: '#4195D1', padding: '0.5rem 1.5rem' }}
                                            // onClick={handleCompose}
                                            >
                                                Send
                                                        </button>
                                            <button type="button"
                                                style={{ backgroundColor: '#4195D1', padding: '0.5rem 0.4rem' }}
                                                className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            </button>
                                            <div className="dropdown-menu" id="schedule-sent-droupdown" style={{ backgroundColor: '#4195D1', padding: '0.5rem 0.4rem', color: '#fff', cursor: 'pointer' }}>
                                                <Typography variant="body2" onClick={handleOpen}> Schedule Sent </Typography>
                                            </div>
                                        </div> */}
                                    </form>
                                       
                                </CardContent>
                            </Card>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classNamees.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div style={{ marginLeft: '15rem' }}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <div className="">
                                                <Grid container justify="space-around">
                                                    <div style={{ background: '#fff' }}>
                                                        <TextField
                                                            style={{ color: '#fff' }}
                                                            id="schedule"
                                                            name="schedule"
                                                            label="Select schdule date time"
                                                            type="datetime-local"
                                                            format="MM/dd/yyyy"
                                                            // value={scheduleDate}
                                                            onChange={handleSetSchduleTime}
                                                            defaultValue="2020-12-24T10:30"
                                                            // className={classes.textField}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>


                                                </Grid>
                                                
                                                <Button onClick={handleClose} variant="contained" color="primary" fullWidth> SET SCHEDULE </Button>
                                            </div>

                                        </MuiPickersUtilsProvider>
                                    </div>

                                </Fade>
                            </Modal>

                            
                        </div>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
export default MailCompose