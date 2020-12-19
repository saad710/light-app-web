import { CardMedia, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import bar1 from '../../../images/bar1.svg';
import bar2 from '../../../images/bar2.svg';
import bar3 from '../../../images/bar3.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardRoot: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        // height: '50px',
        // width: '140px'
        marginLeft: '13rem',
        marginBottom: '1rem'
    },
}));

const MailCount = ({ countMailInfo, requiredActions }) => {
    const classes = useStyles();
    
    return (
        <React.Fragment>
                    <Typography className="pt-1 pb-4"> Overview </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <div style={{ marginRight: '13rem' }}>
                                    <Typography align="center">
                                        Total Mails
                                        </Typography>
                                    <Typography align="center">
                                        <strong > {countMailInfo !== null && countMailInfo.total_mail_count} </strong>
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardMedia>
                                <img className={classes.media} src={bar1} alt="" />
                            </CardMedia>
                        </Card>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <div style={{ marginRight: '10rem' }}>
                                    <Typography align="center">
                                        Required Actions
                                        </Typography>
                                    <Typography align="center">
                                        <strong > { requiredActions !== null && requiredActions.Action_Required } </strong>
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardMedia>
                                <img className={classes.media} src={bar2} alt="" />
                            </CardMedia>
                        </Card>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper>
                        <Card className={classes.cardRoot}>
                            <CardContent>
                                <div style={{marginRight: '9rem'}}>
                                    <Typography align="center">
                                        Total Deadline Over
                                        </Typography>
                                    <Typography align="center">
                                        <strong > {countMailInfo !== null && countMailInfo.deadline_over} </strong>
                                    </Typography>
                                </div>
                            </CardContent>
                            <CardMedia>
                                <img className={classes.media} src={bar3} alt="" />
                            </CardMedia>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default MailCount;