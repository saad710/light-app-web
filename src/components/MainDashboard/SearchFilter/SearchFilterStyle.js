import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff'
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: 'auto',
        // overflow: 'auto',

    },
    container: {
        // paddingTop: theme.spacing(4),
        // paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        width: '100%',
        color: '#fff'
    },
    fixedHeight: {
        height: 240,
    },
    btnStyle: {
        backgroundColor: '#213F7E',
        color: '#fff',
        borderRadius: 0,
        padding: '0.5rem 5rem',
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        border: '1px solid gray',
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //     backgroundColor: fade(theme.palette.common.white, 0.25),
        // },
        marginRight: theme.spacing(2),
        // marginLeft: '66px !important',
        width: '20% !important',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '1rem'
        },

    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2d2d2d'
    },
    searchIcon1: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2d2d2d',
        left: '54%',
        top: '10%'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        padding: '14px 8px 8px 0px',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '12ch',
        },

    },
    horizontalDivider: {
        backgroundColor: '#fff',
        marginRight: '1rem',
        height: '2rem',
        marginTop: '1rem',
    },
}));