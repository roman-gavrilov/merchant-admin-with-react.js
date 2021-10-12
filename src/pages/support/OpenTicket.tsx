import React, {FormEvent, useEffect, useState} from "react";
import "./OpenTicket.css";
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
import {Controller, FieldValues, useForm} from "react-hook-form";
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

export default function OpenTicket(props: any) {
    const classes = useStyles();
    let history = useHistory();

    const [category, setCategory] = useState<string>("");
    const [severity, setSeverity] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [submitDate, setSubmitDate] = useState<Moment | null>(null);

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<TicketDTO>({
        defaultValues: {
            title: "",
            description: ""
        }
    });



    // This won't be run unless all the input validations are met.
    const onSubmit = async (data: FieldValues) => {
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
                        {/*-- 1 row --------------------- label Open Support Ticket --------------------------------*/}

                        <Grid
                            container
                            direction="column"
                            justifyContent="space-between"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Box m={2} pb={3}>
                                    <Typography variant="h4">Open Support Ticket</Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {/*-- 2 row -------------------  Issue Name ----------------------------------*/}

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
                                            <Controller
                                                name="title"
                                                control={control}
                                                rules={{
                                                    required: "Required",
                                                    maxLength: { value: 40, message: "Must be less then 40 chars" }
                                                }}
                                                render={({ field: { ref, ...field } }) => (
                                                    <TextField
                                                        {...field}
                                                        id="title"
                                                        label="Issue Name *"
                                                        style={{ margin: 8 }}
                                                        placeholder="Issue Name"
                                                        fullWidth
                                                        margin="normal"
                                                        inputRef={ref}
                                                        InputLabelProps={{
                                                            shrink: true
                                                        }}
                                                        variant="outlined"
                                                        error={!!errors.title}
                                                        helperText={errors?.title?.message}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
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

                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

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
                                                Submit Ticket
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
