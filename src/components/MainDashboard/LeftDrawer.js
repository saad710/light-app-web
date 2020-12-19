import { Collapse } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import BusinessIcon from "@material-ui/icons/Business";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    leftDrawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    LeftDrawerPaper: {
        width: drawerWidth,
    },
    LeftDrawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    listItem: {
        color: "#4195D1",
        fontSize: "0.85em",
        minHeight: 40,
        "&:hover, &:focus": {
            backgroundColor: "#4195D1",
            color: "#fff",
        },
    },
    

}));

const LeftDrawer = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [icon9, setIcon9] = useState(false);
    const [icon11, setIcon11] = useState(false);
    const [icon12, setIcon12] = useState(false);
    const [icon13, setIcon13] = useState(false);
    const [icon16, setIcon16] = useState(false);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
            >
                <SettingsIcon style={{ color: '#2d2d2d', marginLeft: '-2rem' }} />
            </IconButton>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
        

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
                                            {icon16 ? <DataUsageIcon style={{ color: '#fff' }} /> : <DataUsageIcon style={{ color: '#4195D1' }} />}
                                            {/* <BusinessIcon /> */}
                                        </ListItemIcon>

                                    </div>
                                    <ListItemText primary='Trial' />
                                </ListItem>
                            </Link>

                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </div>
    );
};

export default LeftDrawer;