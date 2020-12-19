import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
    },
  container: {
    maxHeight: 440,
  },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',

    },
    container: {
        // paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'none',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    table: {
        minWidth: 650,
        marginBottom: 20,
        fontSize: "0.7rem",
    },
    tableHeader: {
        fontSize: "7px",
    },
    btnStyle: {
        backgroundColor: '#fff',
        color: '#2d2d2d',
        borderRadius: 0,
        padding: '0.5rem 5rem',
    },
    // fixedHeight: {
    //     height: 240,
    // },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalPaper: {
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: '#3A86BC'
    },
    customerPaper: {
        width: '50%',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        backgroundColor: '#3A86BC'
    },
    cardRoot: {
        minWidth: 275,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#3A86BC',
        boxShadow: 'none'

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'start'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#213F7E',
        borderRadius: '0',
        padding: '0.6rem 0'
    },
    // paginationBox: {
    //     marginTop: 20,
    //     display: "flex",
    //     justifyContent: "center",
    // },
    // pagination: {
    //     border: "1px solid #ddd",
    //     backgroundColor: "#eee",
    // },
}));