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
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
        padding: '0.6rem 0px',
        marginTop: '0.5rem',
        marginLeft: '38rem',
        width: '7rem',
        backgroundColor: '#4195D1'
    },
    form: {
        margin: '0 auto'
    },
    signatureBox: {
        border: '2px solid #4195D1',
        borderRadius: '0.5rem',
        padding: '2rem',
        width: '70%',
        margin: '0.5rem auto'
    },
    emailBtn: {
        background: 'none',
        padding: '0.3rem 1.5rem',
        border: '1px solid gray',
        margin: '0 1rem 2rem 1rem'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '12rem',

    },
    emailModal: {
        // backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: '#213F7E',
        width:'50%'
    },
    signatureBtn: {
        padding: '0.3rem 2rem',
        marginLeft: '40rem'
    }
}));