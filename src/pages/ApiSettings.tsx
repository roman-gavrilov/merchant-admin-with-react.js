import React, {ChangeEvent, lazy, ReactNode, Suspense, useState} from 'react';
import '../App.css';
import {Box, Tab, Tabs, Typography} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import TestEnvironmentNotEnabledDetails from "./api-settings/TestEnvironmentNotEnabled";

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`vertical-tabpanel-${index}`}
          aria-labelledby={`vertical-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box p={3}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 624,
  },
  tabs: {
    "& .MuiTab-wrapper": {
      flexDirection: "row",
      justifyContent: "flex-start",
      textTransform: 'capitalize',
      fontSize: 17
    },
    textALign: "left",
    overflow: 'visible',
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  indicator: {
    left: 0,
    // you can add other styles here like changing the backgrounColor
  },
}));

export default function ApiSettings() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const ProductionEnvironmentDetailsComponent = lazy(() => import('./api-settings/ProductionEnvironment'));
  const ProductionEnvironmentNotApprovedDetailsComponent = lazy(() => import('./api-settings/ProductionEnvironmentNotApproved'));
  const TestEnvironmentDetailsComponent = lazy(() => import('./api-settings/TestEnvironment'));
  const TestEnvironmentNotEnabledDetails = lazy(() => import('./api-settings/TestEnvironmentNotEnabled'));

  return (
      <Box m={5} pl={14}>
        <div className={classes.root}>
          <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
              TabIndicatorProps={{ className: classes.indicator }}
          >
            <Tab label="Production Environment" {...a11yProps(0)} />
            <Tab label="Prod Env(hidden not app)" {...a11yProps(1)} />
            <Tab label="Test Environment" {...a11yProps(2)} />
            <Tab label="Test Env(hidden not app)" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Suspense fallback={<div>Loading...</div>}>
              <section>
                <ProductionEnvironmentDetailsComponent />
              </section>
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Suspense fallback={<div>Loading...</div>}>
              <section>
                <ProductionEnvironmentNotApprovedDetailsComponent />
              </section>
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Suspense fallback={<div>Loading...</div>}>
              <section>
                <TestEnvironmentDetailsComponent />
              </section>
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Suspense fallback={<div>Loading...</div>}>
              <section>
                <TestEnvironmentNotEnabledDetails />
              </section>
            </Suspense>
          </TabPanel>
        </div>
      </Box>
  );
}
