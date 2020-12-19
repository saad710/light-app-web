import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  List,

  Modal,
  TextareaAutosize,
  TextField
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp';
import BugReportIcon from "@material-ui/icons/BugReport";
import BusinessIcon from "@material-ui/icons/Business";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DataUsageIcon from '@material-ui/icons/DataUsage';
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import LabelOffOutlinedIcon from "@material-ui/icons/LabelOffOutlined";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import WcIcon from "@material-ui/icons/Wc";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../MenuItem/MenuItemStyle";
import './MenuItem.css';

const componseStyle = {
  backgroundColor: "#4195D1",
  width: "65%",
  textAlign: "center",
  padding: "0.5rem 0rem",
  margin: "1rem auto",
  color: "#fff",
  borderRadius: "1rem",
};

const MenuItem = ({ toogleOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ticketModal, setTicketModal] = React.useState(false);
  const [ticketValue, setTicketValue] = useState({});
  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setTicketModal(true);
  };
  const handleClose = () => {
    setTicketModal(false);
  };
  const handleBlur = (e) => {
    const value = { ...ticketValue };
    value[e.target.name] = e.target.value;
    setTicketValue(value);
  };

  const handleSubmit = (e) => {
    const finalValue = { ...ticketValue };
    console.log(finalValue);
    e.preventDefault();
  };

  // icon hover state start
  const [icon1, setIcon1] = useState(false);
  const [icon2, setIcon2] = useState(false);
  const [icon3, setIcon3] = useState(false);
  const [icon4, setIcon4] = useState(false);
  const [icon5, setIcon5] = useState(false);
  const [icon6, setIcon6] = useState(false);
  const [icon7, setIcon7] = useState(false);
  const [icon8, setIcon8] = useState(false);
  const [icon9, setIcon9] = useState(false);
  const [icon10, setIcon10] = useState(false);
  const [icon11, setIcon11] = useState(false);
  const [icon12, setIcon12] = useState(false);
  const [icon13, setIcon13] = useState(false);
  const [icon14, setIcon14] = useState(false);
  const [icon15, setIcon15] = useState(false);
  const [icon16, setIcon16] = useState(false);
  // icon hover state end
  return (
    <div>
      <div>
        <Link to='/compose'>
            <ListItem>
              {/* <ListItemIcon>
                            <MarkunreadMailboxIcon />
                        </ListItemIcon> */}
              {
                toogleOpen === false ?
                <ListItemIcon>
                  <AddToPhotosSharpIcon style={{ color: '#4195D1' }} />
                </ListItemIcon>
                :
                <div style={{ width: "90%", margin: "0 auto" }}>
                    <ListItemText style={componseStyle} primary='Compose' />
                </div>
              }
            </ListItem>
        </Link>

        <Link to='/dashboard'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon1(true)}
            onMouseLeave={() => setIcon1(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon1 ? <DashboardIcon style={{ color: '#fff' }} /> : <DashboardIcon  style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
        </Link>

        <Link to='/customers'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon2(true)}
            onMouseLeave={() => setIcon2(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon2 ? <WcIcon style={{ color: '#fff' }} /> : <WcIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Contacts' />
          </ListItem>
        </Link>

        <Link to='/inbox'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon3(true)}
            onMouseLeave={() => setIcon3(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon3 ? <InboxIcon style={{ color: '#fff' }} /> : <InboxIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Mailbox' />
          </ListItem>
        </Link>

        {/* <Link to='/sent'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon4(true)}
            onMouseLeave={() => setIcon4(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon4 ? <SendIcon style={{ color: '#fff' }} /> : <SendIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Sent' />
          </ListItem>
        </Link> */}

        <Link to="/group">
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon5(true)}
            onMouseLeave={() => setIcon5(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon5 ? <GroupWorkIcon style={{ color: '#fff' }} /> : <GroupWorkIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Group' />
          </ListItem>
        </Link>

        <Link to='/tag'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon6(true)}
            onMouseLeave={() => setIcon6(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon6 ? <LabelOffOutlinedIcon style={{ color: '#fff' }} /> : <LabelOffOutlinedIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Tag' />
          </ListItem>
        </Link>

        <Link to='/calender'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon7(true)}
            onMouseLeave={() => setIcon7(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon7 ? <DateRangeOutlinedIcon style={{ color: '#fff' }} /> : <DateRangeOutlinedIcon style={{ color: '#4195D1' }} />}
            </ListItemIcon>
            <ListItemText primary='Calender' />
          </ListItem>
        </Link>

        {/* <ListItem button onClick={handleClick} className={classes.listItem}
          onMouseEnter={() => setIcon8(true)}
          onMouseLeave={() => setIcon8(false)}
        >
          <ListItemIcon className={classes.iconStyle}>
            {icon8 ? <SettingsIcon style={{ color: '#fff' }} /> : <SettingsIcon style={{ color: '#4195D1' }} />}
          </ListItemIcon>
          <ListItemText primary='Setting' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem> */}

        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
          className={classes.collapse}
        >
          <List component='div' disablePadding>
            <Link to='/profile'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon9(true)}
                onMouseLeave={() => setIcon9(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {icon9 ? <PersonIcon style={{ color: '#fff' }} /> : <PersonIcon style={{ color: '#4195D1' }} />}
                    {/* <PersonIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </div>
              </ListItem>
            </Link>
            {/* <Link to='/privacy'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon10(true)}
                onMouseLeave={() => setIcon10(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {icon10 ? <HttpsIcon style={{ color: '#fff' }} /> : <HttpsIcon />}
                  </ListItemIcon>
                  <ListItemText primary='Privacy' />
                </div>
              </ListItem>
            </Link> */}

            <Link to='/team'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon11(true)}
                onMouseLeave={() => setIcon11(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {icon11 ? <SettingsIcon style={{ color: '#fff' }} /> : <SettingsIcon style={{ color: '#4195D1' }} />}
                    {/* <GroupWorkIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary='Team' />

                </div>
              </ListItem>
            </Link>

            <Link to='/email-signature'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon12(true)}
                onMouseLeave={() => setIcon12(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {icon12 ? <LabelImportantIcon style={{ color: '#fff' }} /> : <LabelImportantIcon style={{ color: '#4195D1' }} />}
                    {/* <LabelImportantIcon /> */}
                  </ListItemIcon>
                  <ListItemText primary='Email Signature' />

                </div>
              </ListItem>
            </Link>

            <Link to='/companydetails'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon13(true)}
                onMouseLeave={() => setIcon13(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {icon13 ? <BusinessIcon style={{ color: '#fff' }} /> : <BusinessIcon style={{ color: '#4195D1' }} />}
                    {/* <BusinessIcon /> */}
                  </ListItemIcon>

                </div>
                <ListItemText primary='Company Details' />
              </ListItem>
            </Link>

            <Link to='/trial'>
              <ListItem button className={classes.listItem}
                onMouseEnter={() => setIcon16(true)}
                onMouseLeave={() => setIcon16(false)}
              >
                <div className="d-flex" style={{ marginLeft: '1rem' }}>
                  <ListItemIcon className={classes.iconStyle}>
                    {/* {icon16 ? <BusinessIcon style={{ color: '#fff' }} /> : <BusinessIcon style={{ color: '#4195D1' }} />} */}
                    {icon16 ? <DataUsageIcon style={{ color: '#fff' }} /> : <DataUsageIcon style={{ color: '#4195D1' }} /> }
                    {/* <BusinessIcon /> */}
                  </ListItemIcon>

                </div>
                <ListItemText primary='Trial' />
              </ListItem>
            </Link>

          </List>
        </Collapse>

        <Link to="/ticket">
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon14(true)}
            onMouseLeave={() => setIcon14(false)}
          >
            <div className='d-flex'>
              <ListItemIcon className={classes.iconStyle}>
                {icon14 ? <BugReportIcon style={{ color: '#fff' }} /> : <BugReportIcon style={{ color: '#4195D1' }} />}
                {/* <BugReportIcon /> */}
              </ListItemIcon>
              <ListItemText primary='Ticket' />
            </div>
          </ListItem>
        </Link>

        <Link to='/'>
          <ListItem button className={classes.listItem}
            onMouseEnter={() => setIcon15(true)}
            onMouseLeave={() => setIcon15(false)}
          >
            <ListItemIcon className={classes.iconStyle}>
              {icon15 ? <ExitToAppIcon style={{ color: '#fff' }} /> : <ExitToAppIcon style={{ color: '#4195D1' }} />}
              {/* <ExitToAppIcon /> */}
            </ListItemIcon>
            <ListItemText onClick={ () => localStorage.clear() } primary='Log Out' />
          </ListItem>
        </Link>
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
                          placeholder='Marie Winter'
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
                          placeholder='user@email.com'
                          onBlur={handleBlur}
                        />
                      </div>
                      <br/>
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
    </div>
  );
};

export default MenuItem;
