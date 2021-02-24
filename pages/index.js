import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import fetcher from "../utils/fetcher";
import AppBar from "../components/AppBar";
import InstitutionCard from "../components/InstitutionCard";
import InstitutionForm from "../components/InstitutionForm";
import InstitutionCardSkeleton from "../components/InstitutionCardSkeleton";

const beURI = process.env.NEXT_PUBLIC_BACKEND_URI;
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  fab: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [isNewDialogOpen, setNewDialogOpen] = useState(false);
  const [snackAlert, setSnackAlert] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });
  const { data, error } = useSWR(`${beURI}/institutions`, fetcher);

  const alternateNewDialog = () => {
    setNewDialogOpen((isOpen) => !isOpen);
  };

  const closeAlert = () => {
    setSnackAlert((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleNewDialog = (created) => {
    setNewDialogOpen(false);

    if (!created) return;
    setSnackAlert({
      isOpen: true,
      message: "Se creo una nueva institución",
      severity: "success",
    });
  };

  const handleDelete = (_id) => {
    fetcher(`${beURI}/institutions/${_id}`, {
      method: "DELETE",
    })
      .then(() => {
        mutate(`${beURI}/institutions`);
        setSnackAlert({
          isOpen: true,
          message: "Se elimino la institución",
          severity: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        setSnackAlert({
          isOpen: true,
          message: "Ocurrio un error, intentelo más tarde",
          severity: "error",
        });
      });
  };

  return (
    <>
      <AppBar />
      <Container className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Instituciones
        </Typography>
        {!data && !error && (
          <Grid item xs={12} md={4}>
            <InstitutionCardSkeleton />
          </Grid>
        )}
        {error && <div>failed to load</div>}
        <Grid container spacing={3}>
          {data &&
            data.map((institution) => (
              <Grid item key={institution._id} xs={12} sm={6} md={4}>
                <InstitutionCard {...institution} onDelete={handleDelete} />
              </Grid>
            ))}
        </Grid>
      </Container>

      <Dialog
        open={isNewDialogOpen}
        onClose={alternateNewDialog}
        aria-labelledby="form-dialog-institution"
      >
        <DialogContent>
          <InstitutionForm confirm={handleNewDialog} />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackAlert.isOpen}
        autoHideDuration={3000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity={snackAlert.severity}>
          {snackAlert.message}
        </Alert>
      </Snackbar>

      <Fab
        onClick={alternateNewDialog}
        color="primary"
        aria-label="add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
