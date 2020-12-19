import { Avatar, Checkbox, Container, Divider, Grid, TablePagination, Typography } from '@material-ui/core';
import AccessAlarmSharpIcon from '@material-ui/icons/AccessAlarmSharp';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import RefreshIcon from '@material-ui/icons/Refresh';
import Axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { key } from '../../../apiKey';
import { MailboxContext } from '../../../Providers/MailboxProvider';
import { ReportContext } from '../../../Providers/ReportProvider';
import UpdateSchedule from '../UpdateSchedule/UpdateSchedule';
import { useStyles } from './InboxStyle';


const Inbox = () => {
    const classes = useStyles()
    const history = useHistory()
    const [openPanel, setOpenPanel] = useState(false);
    const [userId, setUserId] = useState({})
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const [pageDiretMail, setPageDiretMail] = React.useState(0);
    const [rowsPerPageDiretMail, setRowsPerPageDiretMail] = React.useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePageDiretMail = (event, directNewPage) => {
        setPageDiretMail(directNewPage);
    };
    const handleChangeRowsPerPageDiretMail = (event) => {
        setRowsPerPageDiretMail(+event.target.value);
        setPageDiretMail(0);
    };

    const { groupsMail, allMail } = useContext(MailboxContext)
    const { groupMailId, setGroupMailId } = useContext(ReportContext)
    
    console.log("allMail", allMail);
    const handleReport = (id) => {
        setGroupMailId(id)
        history.push('/report')
    }
    
    const [allChecked, setAllChecked] = useState(false);
    // using an array to store the checked items
    const [isChecked, setIsChecked] = useState([]);
    const [formData, setFormData] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [onGroupFocus, setOnGroupFocus] = useState(false);
    const [isGroupChecked, setIsGroupChecked] = useState([]);
    // const [onSingleFocus, setOnSingleFocus] = useState(false);

    const handleAllCheck =  e => {
        if (allChecked) {
          setAllChecked(false);
          return setShowResults(false);
          
        }
        setAllChecked(true);
        setShowResults(true)
        // const groupValue =  (groupsMail.map(data => data.id));
        // const singleValue = (allMail.map(data => data.id))
        
        setIsGroupChecked((groupsMail.map(data => data.id)))
        setIsChecked((allMail.map(data => data.id)))
        const value ={...setIsGroupChecked,...setIsChecked}
        return value;
       
            
      };
      
    //   console.log(isChecked);
    const handleSingleCheck = e => {
      const {id} = e.target;
      
      if (isChecked.includes(id)) {
        setIsChecked(isChecked.filter(checked_id => checked_id !== id));
        return setAllChecked(false);
      }
      isChecked.push(id);
      setIsChecked([...isChecked]);
      setAllChecked(isChecked.length  === allMail.length)
    };


    const handleGroupCheck = e => {
        const {id} = e.target;
        
        if (isGroupChecked.includes(id)) {
          setIsGroupChecked(isGroupChecked.filter(checked_id => checked_id !== id));
          return setAllChecked(false);
        }
        isGroupChecked.push(id);
        setIsGroupChecked([...isGroupChecked]);
        setAllChecked(isGroupChecked.length === groupsMail.length)
        // console.log(isGroupChecked);
      };
 




    const handleDeleteAll = (e) => {
        // console.log(id);
        const id = userId && userId.id;
        console.log(id);
        // const client_id = updateUser.id;
        Axios.delete(`${key}remove-all-client-mail/${id}`)
        
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }

    const handleDeleteSingle = (id) => {
        // console.log(id);
        // const id = companyId;
        // const client_id = updateUser.id;
        Axios.delete(`${key}remove-client-mail/${id}`)
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => {
                // console.log(err);
            })
    }
    const handleDeleteGroup = (id) => {
        // console.log(id);
        // const id = companyId;
        // const client_id = updateUser.id;
        Axios.delete(`${key}delete-specific-group-mail/${id}`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(()=>{
        Axios.get(`${key}clients`)
        .then((response)=>{
            // console.log(response.data);
            const clients = response.data;
            const singleClient = clients.filter(client=> client.email === localStorage.client);
            // console.log(singleClient);
            setUserId(singleClient[0]);
           
        })
    },[])

   
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Grid style={{marginTop: '-1.5rem'}}>
                    
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <Checkbox
                                onClick={handleAllCheck}
                                checked={allChecked}
                                color="primary"
                               
                            />
                            <RefreshIcon onClick={() => window.location.reload(false)} style={{ cursor: 'pointer' }} />
                            { showResults ? <Typography variant="body2" align="right" style={{color:"rgb(65, 149, 209)", paddingLeft:"20px"}}
                                            onClick={handleDeleteAll}
                                            >
                                                {/* <UpdateIcon /> */}
                                                <DeleteForeverSharpIcon />
                                        </Typography>:null }
                            
                           
                        </div>
                        <div className="d-flex">
                            {/* <div style={{ padding: '0 2rem', marginLeft:'6rem' }}>
                                <TablePagination
                                    rowsPerPageOptions={[1, 5, 10, 25, 100]}
                                    component="div"
                                    count={groupsMail !== null && groupsMail.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </div> */}
                        </div>
                    </div>
                   
                </Grid>
                <div className="d-flex align-items-center justify-content-between">
                    <Typography varient="h5"> Group Mail </Typography>
                    <div style={{ padding: '0 2rem', marginLeft: '6rem' }}>
                        <TablePagination
                            rowsPerPageOptions={[1, 3, 5, 10, 25, 100]}
                            component="div"
                            count={groupsMail !== null && groupsMail.length}
                            rowsPerPage={rowsPerPage}
                            labelRowsPerPage={""}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
                { groupsMail !== null &&
                    groupsMail !== null && groupsMail.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inbox, i) => (
                        <div key={inbox.client_id}
                            onMouseEnter={() => setOnGroupFocus(true)}
                            onMouseLeave={() => setOnGroupFocus(false)}>
                            <Divider style={{ margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center my-3" style={{ color: '#fff' }}>
                                    { showResults ?  <Checkbox
                                        
                                        onClick={handleGroupCheck.includes}
                                        checked={isGroupChecked.includes(inbox.id)}
                                        isGroupChecked={false}
                                        color="primary"
                                        
                                     />:null }
                                    <Avatar aria-label="recipe" variant="rounded" className={classes.avatar}>
                                        {/* <img width="100%" src={`http://127.0.0.1:8000/uploads/client_pro_pic/${inbox !== null && inbox.loggedInUser}`} alt="" /> */}
                                        G
                                    </Avatar>
                                    <Link to={`groupDetails/${inbox.id}`} style={{ textDecoration: 'none', color: '#2d2d2d' }}>
                                        <Typography variant="body1" style={{ margin: '0.5rem 0.5rem' }}>
                                            <strong> {inbox.group_name} </strong>
                                            {/* <Chip
                                                style={{
                                                    marginLeft: '1rem',
                                                    fontSize: '11px',
                                                    backgroundColor: '#203D79',
                                                    height: '1.5rem',
                                                    width: '5rem',
                                                    color: '#fff',
                                                }}
                                                label="quick reply"
                                                >
                                                    
                                                </Chip> */}
                                            {
                                                inbox.remainer !== null && <AccessAlarmSharpIcon fontSize="small" style={{color: '#A61414'}} />
                                            }
                                            <br />
                                            <strong style={{ marginLeft: '0.5rem' }}> {inbox.subject !== null && inbox.subject.slice(0,12) } </strong> { `${inbox.mail_body.replace(/<\/?[^>]+(>|$)/g, "").slice(0,80)}`}
                                        </Typography>

                                    </Link>
                                </div>
                                {/* <Link to="/report"> */}
                                    <button
                                        onClick={() => handleReport(inbox.id)}
                                        style={{
                                            background: '#4195D1',
                                            padding: '7px 8px',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            position: 'absolute',
                                            right: '16%'
                                        }}>
                                        {/* <Typography varient="body2"> Report </Typography> */}
                                        Report
                                    </button>
                                {/* </Link> */}
                               <div className="row" style={{marginRight:"10px"}}>
                                   <div className="col-md-9">
                                        <Typography style={{ color: '#2d2d2d' }} variant="body1" align="right">
                                            <small> { moment(inbox.created_at).fromNow() } </small>
                                        </Typography>
                                    </div>
                                    <div className="col-md-3">
                                        {onGroupFocus && <Typography variant="body2" align="right" style={{color:"rgb(65, 149, 209)",marginLeft: '28px'}} onClick={()=> handleDeleteGroup(inbox.id)} >
                                            <DeleteForeverSharpIcon />
                                        </Typography>}
                                    </div>
                               </div>

                            </div>
                            <Divider style={{ margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    ))
                }
                
                <div className="d-flex align-items-center justify-content-between">
                    <Typography varient="h5"> Direct Mail </Typography>
                    <div style={{ padding: '0 2rem', marginLeft: '6rem' }}>
                        <TablePagination
                            rowsPerPageOptions={[1, 3, 5, 10, 25, 100]}
                            component="div"
                            count={allMail !== null && allMail.length}
                            rowsPerPage={rowsPerPageDiretMail}
                            labelRowsPerPage={""}
                            page={pageDiretMail}
                            onChangePage={handleChangePageDiretMail}
                            onChangeRowsPerPage={handleChangeRowsPerPageDiretMail}
                        />
                    </div>
                </div>

                { allMail !== null &&
                    allMail !== null && allMail.slice(pageDiretMail * rowsPerPageDiretMail, pageDiretMail * rowsPerPageDiretMail + rowsPerPageDiretMail).map((inbox, i) => (
                        <div key={inbox.client_id}
                        onMouseEnter={() => setOnGroupFocus(true)}
                        onMouseLeave={() => setOnGroupFocus(false)}
                        >
                            
                            <Divider style={{ margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center my-3" style={{ color: '#fff' }}>
                                { showResults ? <Checkbox
                                        onClick={handleSingleCheck.includes}
                                        checked={isChecked.includes(inbox.id)}
                                        isChecked={false}
                                        color="primary"
                                     />:null
                                }
                                   
                                    <Avatar aria-label="recipe" variant="rounded" className={classes.avatar}>
                                        <img src={`http://lightletters.sswarehouses.com/uploads/customer_pro_pic/${inbox.profile_picture}`} alt="" style={{ width: '100%' }} />
                                    </Avatar>
                                    <Link to={`details/${inbox.id}`} style={{ textDecoration: 'none', color: '#2d2d2d' }}>
                                        <Typography variant="body1" style={{ margin: '0.5rem 0.5rem' }}>
                                            <strong> {`${inbox.first_name} ${inbox.last_name}`} </strong>
                                            {/* <Chip
                                                style={{
                                                    marginLeft: '1rem',
                                                    fontSize: '11px',
                                                    backgroundColor: '#203D79',
                                                    height: '1.5rem',
                                                    width: '5rem',
                                                    color: '#fff',
                                                }}
                                                label="quick reply"
                                                >
                                                    
                                                </Chip> */}
                                            {
                                                inbox.remainer !== null && <AccessAlarmSharpIcon fontSize="small" style={{color: '#A61414'}} />
                                            }
                                            <br />
                                            <strong style={{ marginLeft: '0.5rem' }}> {inbox.subject !== null && inbox.subject.slice(0,12) } </strong> { `${inbox.mail_body.replace(/<\/?[^>]+(>|$)/g, "").slice(0,60)}......`}
                                        </Typography>

                                    </Link>
                                </div>
                                {/* <Link to="/report">
                                    <button
                                        style={{
                                            background: '#4195D1',
                                            padding: '5px 8px',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px'
                                        }}>
                                        Report
                                        </button>
                                </Link> */}
                              <div className="row">
                                  <div className="col-md-9">
                                    <Typography style={{ color: '#2d2d2d' }} variant="body2">
                                        <small> { moment(inbox.created_at).fromNow() } </small>
                                    </Typography>
                                </div>
                                <div className="col-md-3">
                                  {onGroupFocus && <Typography variant="body2" style={{color:"rgb(65, 149, 209)"}} onClick={()=>handleDeleteSingle(inbox.id)}>
                                        <DeleteForeverSharpIcon />
                                    </Typography>}
                                </div>
                              </div>

                            </div>
                            <Divider style={{ margin: '0 auto', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    ))
                }
            </Container>
            <UpdateSchedule />
        </React.Fragment>
    );
};

export default Inbox;