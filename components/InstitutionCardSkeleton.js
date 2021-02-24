import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  content: {
    "& > *": {
      marginBottom: theme.spacing(3),
    },
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

function InstitutionCardSkeleton() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton variant="text" />}
      />
      <CardContent className={classes.content}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </CardContent>
      <CardActions className={classes.actions}>
        <Skeleton width={40} />
      </CardActions>
    </Card>
  );
}

export default InstitutionCardSkeleton;
