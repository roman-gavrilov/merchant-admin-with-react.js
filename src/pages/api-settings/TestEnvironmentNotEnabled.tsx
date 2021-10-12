import React from 'react';
import {
    Typography,
    Container,
    Box,
    Grid,
    Button,
    ListItemText,
    Divider,
    ListItem
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '76ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }),
);

export default function TestEnvironmentNotEnabledDetails(props: any) {
    const classes = useStyles();

    return (
        <Container>

            <Box pb={1}>
                <Grid container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                >
                    <Grid item>
                        <Box paddingBottom={1}>
                            <Typography variant="h4">
                                Test Environment Details (Hidden Not Approved)
                            </Typography>
                        </Box>
                    </Grid>
                    {/*<Grid item>*/}
                    {/*    <Grid>*/}
                    {/*        <Box marginLeft={0.5} display="inline-block">*/}
                    {/*            <Button*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary"*/}
                    {/*                size="small"*/}
                    {/*                startIcon={<SaveIcon />}*/}
                    {/*            >*/}
                    {/*                Export*/}
                    {/*            </Button>*/}
                    {/*        </Box>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </Box>

            <Box>
                <div style={{ height: 400, width: '65em' }}>
                    <List className={classes.root}>
                        <Divider  />
                        <ListItem >

                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Box m={3}  >
                                        <div id="activate-description">
                                            <h4 className='activate-text'>You’re in test mode</h4>
                                            <Link to='activate-account'>
                                                <button className='activate'>Activate Test account</button>
                                            </Link>
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ListItem>

                        <Divider  />
                        <ListItem>
                            Refer to Developers section for API requests examples.
                        </ListItem>
                    </List>
                </div>
            </Box>

        </Container>
    );
}
