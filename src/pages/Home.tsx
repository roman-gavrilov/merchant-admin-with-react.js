import React, { useState } from "react";
import "../App.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {Box} from "@material-ui/core";

const data = [
  {
    name: "Jan",
    Chargebacks: 4000,
    Transactions: 2400,
    USD: 2400,
  },
  {
    name: "Feb",
    Chargebacks: 3000,
    Transactions: 1398,
    USD: 2210,
  },
  {
    name: "Mar",
    Chargebacks: 2000,
    Transactions: 9800,
    USD: 2290,
  },
  {
    name: "Apr",
    Chargebacks: 2780,
    Transactions: 3908,
    USD: 2000,
  },
  {
    name: "May",
    Chargebacks: 1890,
    Transactions: 4800,
    USD: 2181,
  },
  {
    name: "Jun",
    Chargebacks: 2390,
    Transactions: 3800,
    USD: 2500,
  },
  {
    name: "Jul",
    Chargebacks: 3490,
    Transactions: 4300,
    USD: 2100,
  },
  {
    name: "Aug",
    Chargebacks: 3490,
    Transactions: 4300,
    USD: 2100,
  },
  {
    name: "Sep",
    Chargebacks: 3490,
    Transactions: 4300,
    USD: 2100,
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const usePaperStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  })
);

const useTimelineStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Home() {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const classes = useStyles();
  const classesPaper = usePaperStyles();
  const classesTimeline = useTimelineStyles();

  return (
    <>
      {/* Business details */}

      {/* Settings chart */}

      <Grid container justifyContent="center" alignItems="center">
        {/*<Grid item xs={11}>*/}
        {/*  <Box m={5}>*/}
        {/*    <Box m={2}>*/}
        {/*      <h2>Next, add your business details</h2>*/}
        {/*    </Box>*/}
        {/*    <Box m={2}>*/}
        {/*      <h3>*/}
        {/*        Tell us a little more about your business to activate your*/}
        {/*        account.*/}
        {/*      </h3>*/}
        {/*    </Box>*/}
        {/*    <Box m={2}>*/}
        {/*      <Link to="activate-account">*/}
        {/*        <button className="activate">Continue</button>*/}
        {/*      </Link>*/}
        {/*    </Box>*/}
        {/*  </Box>*/}

        {/*  <Box m="5rem" />*/}
        {/*</Grid>*/}

        <Grid item xs={11}>
          {/*Padding on the top*/}
          <Box m="5rem" />
        </Grid>

        <Grid item xs={12} >
          <h4 className="chart-label">Today Payments</h4>
          <BarChart
            width={1000}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Transactions"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </Grid>

        <Grid item xs={4}>
          <h4 className="chart-label">Payments</h4>
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
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Transactions"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </Grid>
        <Grid item xs={4}>
          <h4 className="chart-label">Chargebacks</h4>
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
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Chargebacks"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </Grid>
        <Grid item xs={4}>
          <h4 className="chart-label">Net volume from sales</h4>
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
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="USD" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </Grid>
      </Grid>
    </>
  );
}
