import DateFnsUtils from '@date-io/date-fns';
import { Backdrop, Button, Card, CardContent, CardHeader, Checkbox, Fade, FormControl, FormControlLabel, FormGroup, InputAdornment, Modal, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Axios from 'axios';
import 'date-fns';
import React, { useContext, useState } from 'react';
import FileBase from 'react-file-base64';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { useFileUpload } from "use-file-upload";
import { key } from '../../../apiKey';
import { ComposeContext } from '../../../Providers/ComposeProvider';
import { LoggedInContext } from '../../../Providers/LoggedInProvider';
import AppBarDrawer from '../AppBarDrawer';
import './Compose.css';
import { useStyles } from './ComposeStyle';



const Coompose = () => {
    const {groups, allTag} = useContext(ComposeContext)
    const {loggedInUser} = useContext(LoggedInContext)
    // console.log('loggedInUser', loggedInUser);
    // console.log(groups !== 'loading' && groups);
    // console.log("alltag", allTag !== null && allTag);
    const classNamees = useStyles();
    // file upload state 
    const [files, selectFiles] = useFileUpload();
    console.log("files", files);
    const [postData, setPostData] = useState({
        slectedFile: null
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileValue = {...postData}
        console.log("fileValue", fileValue);
        // selectFiles(fileValue)
    }
    // input value state
    const [value, setValue] = useState({})
    const [quickReply, setQuickReply] = useState([])
    const [mailBody, setMailBody] = useState({})

    const [schduleTime, setSchduleTime] = useState("")
    console.log("schduleTime", schduleTime);
    const [ccOpen, setCcOpen] = useState(false)
    const [bccOpen, setBccOpen] = useState(false)
    const [group, setGroup] = useState(false)
    const [tags, setTags] = useState(false)

    const [image, setImage] = useState('')

    // select group dropdown
    const [selectGroup, setSelectGroup] = React.useState([]);
    console.log("group", selectGroup);
    const handleGroup = (event) => {
        setSelectGroup(event.target.value);
    };

    // select tag dropdown
    const [selectTag, setSelectTag] = React.useState([]);
    console.log("selectTag", selectTag);
    const handleTag = (event) => {
        setSelectTag(event.target.value);
    };
    

    // console.log('final value', value)
    // check box state
    const [checkBox, setCheckBox] = useState({
        quickReply: false,
        hideContactInfo: false,
        // noReply: false,
        replyNeeded: false,
        setRemainder: false,
        setDeadLine: false
    });
    // multiple cc
    const [cc2, setCc2] = useState(false)
    const [cc3, setCc3] = useState(false)
    
    // *** remainder all functionality start *** //
    const date = new Date()
    const [allRemainder, setAllRemainder] = useState([])
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


    // *** remainder all functionality close *** //

    // deadline date

    const [deadlineDate, setDeadlineDate] = useState(date.setDate(date.getDate() + 2))
    const handleDeadlineDate = (date) => {
        setDeadlineDate(date.toDateString());
    };

    // 2nd 3rd quick reply
    const [quickReply1, setQuickReply1] = useState(false)
    const [quickReply2, setQuickReply2] = useState(false)


    // schedule date start

    const [scheduleDate, setScheduleDate] = React.useState(new Date().toLocaleString());

    const handleDateChange = (date) => {
        setScheduleDate(date);
    };

    // schedule date end

    // checkbox handle
    const handleChange = (event) => {
        setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });
    };
    const [cc, setCc] = useState([])
    // console.log("ccFromArray", cc);
    // input handle
    const handleInput = (e) => {
        e.preventDefault();
        const newValue = ({...value})
        newValue[e.target.name] = e.target.value
        setValue(newValue)
        // console.log(newValue)
    }

    // schdule time handle
    const handleSetSchduleTime = (e) => {
        e.preventDefault()
        const newTime = { ...schduleTime }
        newTime[e.target.name] = e.target.value
        setSchduleTime(newTime)
    } 
    const [closeCc, setCloseCc] = useState(false)
    // compose button handle
    const handleCompose = (e) => {
        e.preventDefault()
        const finalValue = { ...value, ...mailBody, quick_reply: quickReply.length>0 && quickReply}
        if(checkBox.setRemainder) {
            finalValue.remainder = allRemainder
        }
        if (checkBox.setDeadLine) {
            finalValue.deadline = deadlineDate
        }
        if (checkBox.replyNeeded) {
            finalValue.replyNeeded = true
        }
        if (!checkBox.replyNeeded) {
            finalValue.replyNeeded = false
        }
        if(checkBox.hideContactInfo) {
            finalValue.hideContactInfo = true
        }
        if(!checkBox.hideContactInfo) {
            finalValue.hideContactInfo = false
        }
        finalValue.client_id = loggedInUser.id
        finalValue.mail_file = postData.selectedFile !== null && postData.selectedFile
        if(group){
            // const groupValue = cc
            setCc([])
            setCloseCc(!closeCc)
        }
        if(cc.length>0) {
            finalValue.cc = cc
        }
        if(selectGroup.length>0) {
            finalValue.group = selectGroup
        }
        if(selectTag.length>0) {
            finalValue.tag = selectTag
        }
        console.log("finalValue", finalValue);
        
        Axios.post(`${key}send-mail-customer`, finalValue)
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    // handle set schdule start

    const handleSetSchdule = (e) => {
        e.preventDefault()
        // const schduleValue = { ...value, ...mailBody, ...schduleTime }
        const schduleValue = { ...value, ...mailBody, quick_reply: quickReply.length>0 && quickReply, ...schduleTime} 
        // const schduleValue = { ...value, ...mailBody, quick_reply: quickReply}
        if(checkBox.setRemainder) {
            schduleValue.remainder = allRemainder
        }
        if (checkBox.setDeadLine) {
            schduleValue.deadline = deadlineDate
        }
        if (checkBox.replyNeeded) {
            schduleValue.replyNeeded = true
        }
        if (!checkBox.replyNeeded) {
            schduleValue.replyNeeded = false
        }
        if(checkBox.hideContactInfo) {
            schduleValue.hideContactInfo = true
        }
        if(!checkBox.hideContactInfo) {
            schduleValue.hideContactInfo = false
        }
        schduleValue.client_id = loggedInUser.id
        schduleValue.mail_file = postData.selectedFile !== null && postData.selectedFile
        if(group){
            // const groupValue = cc
            setCc([])
            setCloseCc(!closeCc)
        }
        if(cc.length>0) {
            schduleValue.cc = cc
        }
        if(selectGroup.length>0) {
            schduleValue.group = selectGroup
        }
        if(selectTag.length>0) {
            schduleValue.tag = selectTag
        }
        console.log(schduleValue);

        Axios.post(`${key}send-mail-customer`, schduleValue)
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
            })
    }

    // handle set schdule end

    const [dateValue, onChange] = useState(new Date());

    // modal handle with state start
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    // // modal handle with state end

    const handleBlur = (event) => {
        // console.log({ editorValue: event });
        const mail_body = {mail_body: event}
        setMailBody(mail_body)
    }
    const handleImageUpload = (targetImgElement, index, state, imageInfo, remainingFilesCount) => {
        // console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
        console.log(imageInfo.name)
        setImage(imageInfo.name)
    }


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
                                    <form className={classNamees.form} noValidate>

                                        <div>
                                            <FormControl>
                                                <TextField
                                                    id="from"
                                                    name="sender"
                                                    // defaultValue={loggedInClient}
                                                    onBlur={handleInput}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">From</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />
                                                <TextField
                                                    id="to"
                                                    name="receiver"
                                                    onBlur={handleInput}
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
                                                                    <div className="px-2" onClick={() => setGroup(!group)}>
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
                                                    id="to"
                                                    name="cc"
                                                    onBlur={
                                                        (e) => setCc([...cc, e.target.value])
                                                    }
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <div className="d-flex">
                                                                <div>
                                                                    Cc
                                                                </div>
                                                                <div className="d-flex" style={{ position: 'absolute', left: '90%' }}>
                                                                    <div className="px-2" onClick={() => setCc2(!cc2)}>
                                                                        {setCc2 ? <AddBoxRoundedIcon  /> : <IndeterminateCheckBoxRoundedIcon />} 
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
                                                    id="to"
                                                    name="cc"
                                                    onBlur={
                                                        (e) => setCc([...cc, e.target.value])
                                                    }
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <div className="d-flex">
                                                                <div>
                                                                    Cc
                                                                </div>
                                                                <div className="d-flex" style={{ position: 'absolute', left: '68%' }}>
                                                                    <div className="px-2" onClick={() => setCc3(!cc3)}>
                                                                        Add
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
                                                    id="to"
                                                    name="cc"
                                                    onBlur={
                                                        (e) => setCc([...cc, e.target.value])
                                                    }
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">
                                                            <div className="d-flex">
                                                                <div>
                                                                    Cc
                                                                </div>
                                                                <div className="d-flex" style={{ position: 'absolute', left: '68%' }}>
                                                                    <div className="px-2" onClick={() => setCc3(!cc3)}>
                                                                        Add
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />
                                                }

                                                {/* {
                                                    ccOpen &&
                                                    <TextField
                                                        id="cc"
                                                        name="cc"
                                                        onBlur={handleInput}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">Cc</InputAdornment>,
                                                        }}
                                                        variant="outlined"
                                                    />
                                                } */}
                                                
                                                {
                                                    bccOpen &&
                                                    <TextField
                                                        id="bcc"
                                                        name="bcc"
                                                        onBlur={handleInput}
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
                                                        onChange={handleGroup}
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
                                                        onChange={handleTag}
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
                                                    onBlur={handleInput}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">Subject</InputAdornment>,
                                                    }}
                                                    variant="outlined"
                                                />
                                                {/* check boxes start */}

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

                                                {/* check boxes end */}

                                                {/* fuctional check boxes show start */}

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

                                                {/* fuctional check boxes show end */}

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
                                                    onChange={handleBlur}
                                                    // onImageUpload={handleImageUpload}
                                                />
                                            </FormControl>
                                        </div>
                                        <div>
                                            {/* <img style={{width:'20%', padding: '1rem'}} src={files?.source || 'no selected file'} alt="preview" /> */}
                                            <span style={{color:'#fff'}}>{files?.name} </span>
                                            {/* <Button
                                                variant="contained"
                                                color="default"
                                                className={classes.button}
                                                startIcon={<CloudUploadIcon />}
                                                onClick={() =>
                                                    selectFiles({ }, ({ name, size, source, file }) => {
                                                        console.log("Files Selected", { name, size, source, file });
                                                    })
                                                }
                                                >
                                                Upload
                                            </Button> */}
                                        </div>
                                        {/* <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            className={classNamees.btnStyle}
                                            onClick={handleCompose}
                                        >
                                            Send
                                        </Button> */}
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
                                                            <TextareaAutosize aria-label="quick reply" name="quickReplyComment1" onBlur={(e) => setQuickReply([...quickReply, e.target.value ]) } rows={2} placeholder="Quick Reply ..." />
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
                                                            <TextareaAutosize aria-label="quick reply" name="quickReplyComment2" onBlur={(e) => setQuickReply([...quickReply, e.target.value ]) } rows={2} placeholder="Quick Reply ..." />
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
                                                        <TextareaAutosize aria-label="quick reply" name="quickReplyComment3" onBlur={(e) => setQuickReply([...quickReply, e.target.value ]) } rows={2} placeholder="Quick Reply ..." />
                                                        <div>
                                                            {

                                                                <IndeterminateCheckBoxRoundedIcon style={{ color: '#fff' }} fontSize="large" onClick={() => setQuickReply2(!quickReply2)} />
                                                            }
                                                        </div>
                                                    </div>

                                                }

                                            </div>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary"
                                                    style={{ backgroundColor: '#4195D1', padding: '0.5rem 1.5rem' }}
                                                    onClick={handleCompose}
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
                                            </div>
                                        </div>
                                    </form>
                                    <form autoComplete="off" noValidate>
                                          <div><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

                                    </form>
                                        {/* <Button variant="contained" color="primary" size="large" onClick={handleSubmit} fullWidth> Submit </Button> */}
                                </CardContent>
                            </Card>

                            {/* calender popup for schedule mail */}

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
                                    <div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <div className="">
                                                <Grid container justify="space-around">
                                                    {/* <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        variant="static"
                                                        label="Select Remainder"
                                                        format="MM/dd/yyyy"
                                                        disablePast="true"
                                                        value={scheduleDate}
                                                        onChange={scheduleDate}
                                                        style={{ backgroundColor: '#fff' }}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    /> */}

                                                    {/* <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="MM/dd/yyyy"
                                                        value={scheduleDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        variant="static"
                                                    /> */}
                                                        <div style={{background: '#fff'}}>
                                                            <TextField
                                                            style={{color: '#fff'}}
                                                            id="datetime-local"
                                                            name="schedule"
                                                            label="Select schdule date time"
                                                            type="datetime-local"
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
                                                <Grid container justify="space-around">
                                                    {/* <TextField
                                                        style={{ color: '#fff', backgroundColor: '#fff', width: "100%", border: '1px solid gray' }}
                                                        id="time"
                                                        label="Select Time"
                                                        type="time"
                                                        name="schduleTime"
                                                        onBlur={handleSetSchduleTime}
                                                        defaultValue="07:30"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        inputProps={{
                                                            step: 300, 
                                                        }}
                                                    /> */}
                                                </Grid>
                                                <Button onClick={handleSetSchdule} variant="contained" color="primary" fullWidth> SET SCHEDULE </Button>
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
    );
};

export default Coompose;