import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff'
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ccShows: {
        display: 'none'
    }

}));