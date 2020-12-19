import { Avatar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';
import MenuItem from '../../components/MainDashboard/MenuItem/MenuItem';
import avatar from '../../images/avatar.png';
import { useStyles } from './AppBarDrawerStyle';
import LeftDrawer from './LeftDrawer';
import SearchFilter from './SearchFilter/SearchFilter';


const AppBarDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [openFilter, setOpenFilter] = useState(false)
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [openPanel, setOpenPanel] = useState(false);
    return (
        <div>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon style={{color: '#2d2d2d'}} />
                    </IconButton>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon} >
                            <SearchIcon
                            />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            style={{ color: '#2d2d2d' }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                        {
                            openFilter && <SentFilter />
                        }
                    <FilterListIcon
                        onClick={() => setOpenFilter(!openFilter)}
                        style={{ marginRight: '1rem', color: '#2d2d2d' }}
                    /> */}
                    <SearchFilter />
                    <LeftDrawer />
                    
                    
                    <Divider className={classes.horizontalDivider} orientation="vertical" flexItem />
                    <Avatar aria-label="recipe" variant="circle" className={classes.avatar}>
                        <img width="100%" src={avatar} alt="" />
                    </Avatar>
                </Toolbar>
            </AppBar>


            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >

                <div className="d-flex align-items-center">
                    <Typography style={{ padding: '1.2rem 2rem'}}>
                        Client Web App
                    </Typography>
                    <IconButton onClick={handleDrawerClose} style={{ color: '#4195D1' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {/* <List>{mainListItems}</List> */}
                <MenuItem toogleOpen={open} />

            </Drawer>
        </div>
    );
};

export default AppBarDrawer;