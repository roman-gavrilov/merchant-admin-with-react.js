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

export default function TestEnvironmentDetails(props: any) {
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
                                Test Environment Details
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
                            <Grid container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                            >
                                <Grid item>
                                    <ListItemText
                                        primary="API Endpoint"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    api.test.example.com
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                    >
                                        Copy Url
                                    </Button>
                                </Grid>
                            </Grid>

                        </ListItem>

                        <Divider  />
                        <ListItem >
                            <Grid container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                            >
                                <Grid item>
                                    <ListItemText
                                        primary="API Username"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    04615475950107654868
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                    >
                                        Copy Username
                                    </Button>
                                </Grid>
                            </Grid>

                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Grid container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                            >
                                <Grid item>
                                    <ListItemText
                                        primary="API Password"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    08890455590780740244
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<SaveIcon />}
                                    >
                                        Copy Password
                                    </Button>
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
