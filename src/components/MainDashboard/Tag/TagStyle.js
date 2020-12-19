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
        color: '#2d2d2d'
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
    table: {
        minWidth: 'auto',
        marginBottom: 20,
        fontSize: "0.7rem",
    },
    tableHeader: {
        fontSize: "7px",
    },
    btnStyle1: {
        backgroundColor: '#fff',
        color: '#2d2d2d',
        borderRadius: 0,
        padding: '0.5rem 5rem',
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
}));