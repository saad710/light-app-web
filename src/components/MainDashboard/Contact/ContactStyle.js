import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#4195D1'
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',

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
        background: 'no-repeat',
        boxShadow: 'none',
        border: '1px solid black',
        textAlign: 'center',
        color: '#fff',
        width: '100%',
        height: '12rem',
    },
    fixedHeight: {
        height: 240,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        // backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: '#213F7E'
    },
    cardRoot: {
        minWidth: 275,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#213F7E',
        boxShadow: 'none'

    }
}));