import { useState } from "react";
import { mutate } from "swr";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PhoneIcon from "@material-ui/icons/Phone";
import PinDropIcon from "@material-ui/icons/PinDrop";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import InstitutionForm from "./InstitutionForm";

const useStyles = makeStyles((theme) => ({
  actions: {
    justifyContent: "flex-end",
  },
}));

function InstitutionCard({ _id, name, location, phones, onDelete }) {
  const classes = useStyles();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [snackAlert, setSnackAlert] = useState({
    isOpen: false,
    message: "",
    severity: "",
  });

  const alternateDeleteDialog = () => {
    setDeleteDialogOpen((isOpen) => !isOpen);
  };

  const alternateEditDialog = () => {
    setEditDialogOpen((isOpen) => !isOpen);
  };

  const closeAlert = () => {
    setSnackAlert((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const handleDelete = () => {
    onDelete(_id);
  };

  const handleEditDialog = (edited) => {
    setEditDialogOpen(false);

    if (!edited) return;
    setSnackAlert({
      isOpen: true,
      message: "La institución fue actualizada",
      severity: "success",
    });
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar arai-label="institution">{name[0]}</Avatar>}
          title={<Typography variant="h6">{name}</Typography>}
        />
        <CardContent>
          <List component="nav" aria-label="institution information">
            <ListItem>
              <ListItemIcon>
                <PinDropIcon />
              </ListItemIcon>
              <ListItemText primary={location} />
            </ListItem>
            {phones.map(({ phone }, i) => (
              <ListItem key={i}>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary={phone} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={alternateDeleteDialog} color="secondary">
            eliminar
          </Button>
          <Button onClick={alternateEditDialog}>editar</Button>
        </CardActions>
      </Card>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={alternateDeleteDialog}
        aria-labelledby="delete-confirm-dialog"
      >
        <DialogContent>
          <Typography>
            ¿Esta seguro que quiere borrar la institución?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={alternateDeleteDialog}>cancelar</Button>
          <Button onClick={handleDelete} color="secondary">
            borrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={alternateEditDialog}
        aria-labelledby="form-dialog-institution"
      >
        <DialogTitle id="form-dialog-institution">{name}</DialogTitle>
        <DialogContent>
          <InstitutionForm
            _id={_id}
            name={name}
            location={location}
            phones={phones}
            confirm={handleEditDialog}
          />
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
    </>
  );
}

InstitutionCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default InstitutionCard;
