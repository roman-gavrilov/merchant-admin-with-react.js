import React, {ChangeEvent, lazy, ReactNode, Suspense, useState} from 'react';
import '../App.css';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Box, Grid, Tab, Tabs, Typography} from "@material-ui/core";

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
          style={{width: '100%'}}
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

export default function ProductCatalog() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const AllProductsComponent = lazy(() => import('./product-catalog/AllProducts'));

  return (
      <>
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
                  <Tab label="All Products" {...a11yProps(0)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <section>
                      <AllProductsComponent />
                    </section>
                  </Suspense>
                </TabPanel>
            </div>
          </Box>

        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Box pt={15} pb={3}>
                    <h5>Merchant Hub 2021</h5>
                </Box>
            </Grid>
        </Grid>
      </>
  );
}
