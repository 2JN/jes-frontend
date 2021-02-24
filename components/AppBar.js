import { makeStyles } from "@material-ui/core/styles";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

function AppBar() {
  const classes = useStyles();

  return (
    <>
      <MuiAppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">MP</Typography>
        </Toolbar>
      </MuiAppBar>
      <div className={classes.offset} />
    </>
  );
}

export default AppBar;
