import { Typography, Container, Box, Grid, Button, Tabs, Tab } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import SaveIcon from '@material-ui/icons/Save';
import {useEffect, useState, Suspense, ChangeEvent} from 'react';
import { getTask } from '../../service/merchants';
import { OnboardingTaskDto } from '../../service/merchants/types';
import {makeStyles, Theme} from "@material-ui/core/styles";
// import { TabPanel, a11yProps } from '../OnBoarding';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 624,
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

export default function InProcess(props: any) {
    const classes = useStyles();
    const [tasks, setTasks] = useState<OnboardingTaskDto[]>()
    const [value, setValue] = useState<number>();

    useEffect(() => {
        // getTask().then(({data})=>{
        //     console.log(data);
        //     setTasks(data);
        // }).catch(error => {
        //     console.log(error);
            
        // });
        const tasks = [
            {
                "id": 122,
                "name": "Item 1",
                "totalPages" : 1
            },
            {
                "id": 123,
                "name": "Item 2",
                "totalPages" : 1
            },
            {
                "id": 124,
                "name": "Item 3",
                "totalPages" :1
            },
            {
                "id": 125,
                "name": "Item 4",
                "totalPages" :1
            }
        ];
        setTasks(tasks)
    }, []);
    
    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        
    };
    
    return (
        <>
        todo
        </>
    //     <Box m={5} pl={14}>
    //     <div className={classes.root}>
    //       {tasks?.map(task=> (
    //       <Tabs
    //           orientation="vertical"
    //           value={task.id}
    //           onChange={handleChange}
    //           aria-label="Vertical tabs example"
    //           className={classes.tabs}
    //           TabIndicatorProps={{ className: classes.indicator }}
    //       >
    //         <Tab label={task.name} {...a11yProps(0)} />
    //       </Tabs>
    //       ))}
    //       <TabPanel value={value} index={0}>
    //         <Suspense fallback={<div>Loading...</div>}>
    //             <InProcess />
    //         </Suspense>
    //       </TabPanel>
    //     </div>
    //   </Box>
    );
}
