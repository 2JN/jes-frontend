import { useState } from "react";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

import fetcher from "../utils/fetcher";

const beURI = process.env.NEXT_PUBLIC_BACKEND_URI;
const useStyles = makeStyles((theme) => ({
  actions: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const schema = object().shape({
  name: string().required(),
  location: string().required(),
  phone: string().required(),
});

function InstitutionForm({
  _id,
  name = "",
  location = "",
  phones = [],
  confirm,
}) {
  const [{ phone } = {}] = phones;
  const classes = useStyles();
  const [institutionData, setInstitutionData] = useState({
    error: false,
    loading: false,
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const closeAlert = () => {
    setInstitutionData((prevState) => ({
      ...prevState,
      error: false,
    }));
  };

  const onSubmit = (data) => {
    setInstitutionData((prevState) => ({ ...prevState, loading: true }));

    const body = { ...data };
    body.phones = [
      {
        phone: body.phone,
      },
    ];

    delete body.phone;

    let route = "";
    const payload = { body: JSON.stringify(body) };

    if (_id) {
      route = `${beURI}/institutions/${_id}`;
      payload.method = "PUT";
    } else {
      route = `${beURI}/institutions`;
      payload.method = "POST";
    }

    fetcher(route, payload)
      .then(() => {
        mutate(`${beURI}/institutions`);
        confirm(true);
      })
      .catch((err) => {
        console.error(err);
        setInstitutionData({ loading: false, error: true });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          name="name"
          label="Institución"
          margin="normal"
          inputRef={register}
          defaultValue={name}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          fullWidth
          name="location"
          label="Ubicación"
          margin="normal"
          inputRef={register}
          defaultValue={location}
          error={Boolean(errors.location)}
          helperText={errors.location?.message}
        />
        <TextField
          fullWidth
          name="phone"
          label="Teléfono"
          margin="normal"
          inputRef={register}
          defaultValue={phone}
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
        <div className={classes.actions}>
          {confirm && (
            <Button type="button" onClick={() => confirm()} color="secondary">
              cancelar
            </Button>
          )}
          <Button type="submit" color="primary">
            guardar
          </Button>
        </div>
      </form>

      <Snackbar
        open={institutionData.error}
        autoHideDuration={3000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error">
          Ocurrio un error, intentalo más tarde
        </Alert>
      </Snackbar>
    </>
  );
}

InstitutionForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  phones: PropTypes.arrayOf(PropTypes.shape({ phone: PropTypes.string })),
  confirm: PropTypes.func,
};

export default InstitutionForm;
