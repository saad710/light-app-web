import { Container, makeStyles } from "@material-ui/core";
import Axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { key } from "../../../apiKey";
import AppBarDrawer from "../AppBarDrawer";
moment.locale('en-GB');
const localizer = momentLocalizer(moment)

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#fff",
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  table: {
    minWidth: 650,
  },
  btnStyle: {
    backgroundColor: "#fff",
    color: "#2d2d2d",
    borderRadius: 0,
    padding: "0.5rem 5rem",
  },
  // fixedHeight: {
  //     height: 240,
  // },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "#3A86BC",
  },
  customerPaper: {
    width: "50%",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: "#3A86BC",
  },
  cardRoot: {
    minWidth: 275,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3A86BC",
    boxShadow: "none",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "start",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#213F7E",
    borderRadius: "0",
    padding: "0.6rem 0",
  },
  paginationBox: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  pagination: {
    border: "1px solid #ddd",
    backgroundColor: "#eee",
  },
}));



const SchedulePage = () => {
  const [evts, setSchedule] = useState(null)
  const [allMail, setAllMail] = useState(null)
  console.log("allMail", allMail);
  const events = [
    {
      title: "Lunch",
      start: "2020-12-12T11:30:00",
      end: "2020-12-13T12:30:00",
    },
    {
      display: "block",
      title: "Event2",
      backgroundColor: "#4195d1",
      start: "2020-10-12T11:30:00",
      end: "2020-10-12T12:30:00",
    },
    {
      title: "Event3",
      display: "block",
      backgroundColor: "#213f7e",
      start: "2020-10-15T10:30:00",
      end: "2020-10-15T11:30:00",
    },
  ];
  useEffect(() => {
    Axios.get(`${key}client-all-mail/${1}`)
      .then(res => {
        console.log(res.data.all_mail);
        setAllMail(res.data.all_mail)
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  
  useEffect(( ) => {
    const d = allMail !== null && allMail.map(m => (
      {
        title: m.subject
      }
    ))
    setSchedule(d)
    console.log("d", d);
  }, [allMail])

  console.log("static data", events);
  console.log("dynamic data", evts !== null && evts);




  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBarDrawer />
      <Container className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture='en-GB'
          style={{ height: 500 }}
        />
      </Container>
    </div>
  );
};

export default SchedulePage;
