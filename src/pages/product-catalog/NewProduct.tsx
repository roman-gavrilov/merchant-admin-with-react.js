import React, {FormEvent, useEffect, useState} from "react";
import "./NewProduct.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
    TicketCategoryTypesDTO,
    TicketDTO,
    TicketSeverityLevelsDTO,
    TicketStatusTypesDTO
} from "../../service/support/types";
import {getTicketCategories, getTicketSeverityTypes, getTicketStatusTypes, postTicket} from "../../service/support";
import { useForm } from "react-hook-form";
import {useHistory} from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import {FormControl} from "@mui/material";
import {Moment} from "moment";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap",
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: "25ch",
        },
        form: {
            width: "100%",
        },
    })
);

export default function NewProduct(props: any) {
    const classes = useStyles();
    let history = useHistory();

    const [category, setCategory] = useState<string>("");
    const [severity, setSeverity] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [submitDate, setSubmitDate] = useState<Moment | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // This generic will type the data response correctly.
        // So the errors object and register function will infer the types of TicketDTO.
    } = useForm<TicketDTO>();

    // This won't be run unless all the input validations are met.
    const onSubmit = async (data: TicketDTO) => {
        // This console.log won't give errors
        // console.log(data.title);
        // This console.log will give typing errors
        // console.log(data.randomValue);
        postTicket(data)
            .then(({ data }) => {
                console.log(data.title);
                history.replace("/support");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
    };

    const [ticketCategoriesList, setTicketCategoriesList] = useState<TicketCategoryTypesDTO[]>([]);

    useEffect(() => {
        ticketCategoriesData();
    }, []);

    const ticketCategoriesData = async () => {
        getTicketCategories()
            .then((resp) => {
                setTicketCategoriesList(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [ticketSeverityList, setTicketSeverityList] = useState<TicketSeverityLevelsDTO[]>([]);

    useEffect(() => {
        ticketSeverityData();
    }, []);

    const ticketSeverityData = async () => {
        getTicketSeverityTypes()
            .then((resp) => {
                setTicketSeverityList(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const [ticketStatusList, setTicketStatusList] = useState<TicketStatusTypesDTO[]>([]);

    useEffect(() => {
        ticketStatusData();
    }, []);

    const ticketStatusData = async () => {
        getTicketStatusTypes()
            .then((resp) => {
                setTicketStatusList(resp.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container>
            <Box m={5}>
                <div className={classes.root}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        {/*-- 1 row --------------------- label New Product --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">New Product</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row ------------------- Product Name ----------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                id="title"
                                                label="Product Name *"
                                                style={{ margin: 8 }}
                                                {...register("title", {
                                                    required: true,
                                                    maxLength: 40,
                                                })}
                                                placeholder="Product Name"
                                                helperText="Enter Product name"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                // error={true}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 3 row ------------------------------------------------------------------------- */}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="Submitted by"
                                                id="outlined-margin-none"
                                                className={classes.textField}
                                                helperText="Some important text"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <TextField
                                                    label="Submit Date"
                                                    id="submit-date"
                                                    type="date"
                                                    helperText="Select Submit Date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    value={submitDate}
                                                    variant="outlined"
                                                    //@ts-ignore
                                                    onInput={(e) => setSubmitDate(e.target.value)}
                                                />
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="status-label">Ticket Status</InputLabel>
                                                <Select
                                                    labelId="status-label"
                                                    id="status-helper"
                                                    value={status}
                                                    label="Select Status"
                                                    onChange={(e) => setStatus(e.target.value)}
                                                    required
                                                >
                                                    {ticketStatusList.map((element) => (
                                                        <MenuItem value={element.code}>{element.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Status</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 4 row --------------------------------------------------------------------------------------- */}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            {/*3 row*/}
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="severity-label">Severity Level</InputLabel>
                                                <Select
                                                    labelId="severity-label"
                                                    id="severity-helper"
                                                    value={severity}
                                                    label="Select Severity"
                                                    onChange={(e) => setSeverity(e.target.value)}
                                                    required
                                                >
                                                    {ticketSeverityList.map((element) => (
                                                        <MenuItem value={element.code}>{element.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Severity</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                                                <InputLabel id="category-label">Ticket Category</InputLabel>
                                                <Select
                                                    labelId="category-label"
                                                    id="category-helper"
                                                    value={category}
                                                    label="Select Category"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    required
                                                >
                                                    {ticketCategoriesList.map((element) => (
                                                        <MenuItem value={element.code}>{element.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>Select Ticket Category</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="Environment"
                                                id="outlined-margin-none"
                                                className={classes.textField}
                                                helperText="Some important text"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 5 row --------------------- Issue -------------------------------------------------------------- */}

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="stretch"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                id="description"
                                                label="Issue *"
                                                style={{ margin: 8 }}
                                                placeholder="4000 characters maximum"
                                                helperText="Full width!"
                                                {...register("description", {
                                                    required: true,
                                                    maxLength: 4000,
                                                })}
                                                fullWidth
                                                multiline
                                                rows={10}
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 6 row -------------------------- Attached Files ------------------------------------------------- */}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="Attached Files"
                                                id="outlined-margin-none"
                                                className={classes.textField}
                                                helperText="Some important text"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 7 row ------------------------  E-mail List for notifications  ----------------------------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Box padding={1} pb={3}>
                                            <TextField
                                                label="E-mail List for notifications"
                                                id="outlined-margin-none"
                                                className={classes.textField}
                                                helperText="Some important text"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*-- 8 row ----- submit button ---------------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Grid item>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Box marginLeft={0.5} display="inline-block">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                type="submit"
                                                startIcon={<SaveIcon />}
                                            >
                                                Create Product
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
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
        </Container>
    );
}
