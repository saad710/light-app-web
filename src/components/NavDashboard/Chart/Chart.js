import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar, BarChart,
  CartesianGrid,
  Cell, Legend,
  Pie, PieChart, Tooltip, XAxis,
  YAxis
} from "recharts";
import { key } from "../../../apiKey";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardRoot: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    marginTop: 10
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    // height: '50px',
    // width: '140px'
    marginLeft: "13rem",
    marginBottom: "1rem",
  },
  item: {
    padding: 5,
  },
}));

const Chart = ({ countMailInfo }) => {
  const [requiredAction, setRequiredAction] = useState({})
  useEffect(() => {
    Axios.get(`${key}action-required`)
      .then(res => {
        console.log(res.data);
        setRequiredAction(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

    const piData = [
      { name: "Mail Sent", value: countMailInfo !== null && countMailInfo.sent_mail , color: "#0088FE" },

      { name: "Response Required", value: 4, color: "#00C49F" },
      { name: "Open Rate", value: countMailInfo !== null && countMailInfo.open_rate, color: "#FFBB28" },
      { name: "Response Rate", value: countMailInfo !== null && countMailInfo.response_rate, color: "#FF8042" },
    ];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill='white'
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline='central'
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    console.log(countMailInfo !== null && countMailInfo.current_week);
    
    const data = countMailInfo !== null && countMailInfo.current_week.map((week) => (
      {
        name: week.week,
        Total: countMailInfo !== null && countMailInfo.total_mail_count,
        Sent: week.mail_sent,
      }
    ))
  
    
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        <Grid item className={classes.item} xs={12} md={6}>
          <h4 className={classes.title}>Weekly Mail Status</h4>
            <Paper>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='Total' fill='#8884d8' />
                <Bar dataKey='Sent' fill='#82ca9d' />
              </BarChart>
            </Paper>
        </Grid>

        <Grid item className={classes.item} xs={12} md={6}>
          <h4 className={classes.title}>This Month Mail Status</h4>
          <Paper style={{ display:"flex" }}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={piData}
                    labelLine
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {piData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <List dense style={{paddingTop: '70px'}}>
                  {piData.map((data) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          variant='square'
                          style={{
                            backgroundColor: data.color,
                            color: data.color,
                            height: 15,
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={data.name} />
                      <div className={classes.grow} />
                      <p>{data.value}</p>
                    </ListItem>
                  ))}
                </List>
              </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Chart;
