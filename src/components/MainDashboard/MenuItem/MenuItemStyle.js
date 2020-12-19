import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    form: {
        textAlign: 'start',
        marginTop: '-2rem',
        marginBottom: '0',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    ticketBtn: {
        background: 'none',
        border: '1px solid gray',
        color: '#2d2d2d',
        margin: '0.5rem 0'
    },
    ticketCard: {
        width: '22rem',
        height: '75vh',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'none',
        boxShadow: 'none',
        margin: '5rem auto'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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