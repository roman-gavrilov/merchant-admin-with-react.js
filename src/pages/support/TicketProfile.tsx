import React, { useEffect, useState } from "react";
import "./TicketProfile.css";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  TicketCategoryTypesDTO,
  TicketDTO,
  TicketSeverityLevelsDTO,
  TicketStatusTypesDTO,
} from "../../service/support/types";
import {
  getTicket,
  getTicketCategories,
  getTicketSeverityTypes,
  getTicketStatusTypes,
  postTicket, updateTicket,
} from "../../service/support";
import {Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from "@mui/material";
import { Moment } from "moment";
import { RouteParams } from "../../service/utils";

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

export default function TicketProfile(props: any) {
  const classes = useStyles();
  let history = useHistory();
  let requestParams = useParams<RouteParams>();

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
  const onSubmit = async (data: TicketDTO) => {
    console.log(data);

    // This console.log won't give errors
    // console.log(data.title);
    // This console.log will give typing errors
    // console.log(data.randomValue);
    updateTicket(requestParams.id, data)
      .then(({ data }) => {
        console.log(data.title);
        history.replace("/support");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [ticketCategoriesList, setTicketCategoriesList] = useState<
    TicketCategoryTypesDTO[]
  >([]);
  const [ticket, setTicket] = useState<TicketDTO>();

  useEffect(() => {
    ticketCategoriesData();
    getSingleTicket();
  }, []);

  const ticketCategoriesData = async () => {
    getTicketCategories()
      .then(({ data }) => {
        setTicketCategoriesList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getSingleTicket = async () => {
    getTicket(requestParams.id)
      .then(({ data }) => {
        setTicket(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [ticketSeverityList, setTicketSeverityList] = useState<
    TicketSeverityLevelsDTO[]
  >([]);

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

  const [ticketStatusList, setTicketStatusList] = useState<
    TicketStatusTypesDTO[]
  >([]);

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
                  <Typography variant="h4">Support Ticket</Typography>
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
                            <MenuItem value={element.code}>
                              {element.name}
                            </MenuItem>
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
                        <InputLabel id="severity-label">
                          Severity Level
                        </InputLabel>
                        <Select
                          labelId="severity-label"
                          id="severity-helper"
                          value={severity}
                          label="Select Severity"
                          onChange={(e) => setSeverity(e.target.value)}
                          required
                        >
                          {ticketSeverityList.map((element) => (
                            <MenuItem value={element.code}>
                              {element.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select Ticket Severity</FormHelperText>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box padding={1} pb={3}>
                      <FormControl sx={{ ml: 1, mr: 1, minWidth: 220 }}>
                        <InputLabel id="category-label">
                          Ticket Category
                        </InputLabel>
                        <Select
                          labelId="category-label"
                          id="category-helper"
                          value={category}
                          label="Select Category"
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          {ticketCategoriesList.map((element) => (
                            <MenuItem value={element.code}>
                              {element.name}
                            </MenuItem>
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
                        size="medium"
                        type="submit"
                      >
                        Update Ticket
                      </Button>
                    </Box>
                    <Box marginLeft={1} display="inline-block">
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={() => history.replace("/support")}
                      >
                        Cancel
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
