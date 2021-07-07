import React, { useContext  } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarIcon from "@material-ui/icons/Star";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";

const useStyles = makeStyles({
  card: { maxWidth: 300 },
  media: { height: 400 },
});

export default function CastCard({ cast, action }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        
        title={
          <Typography variant="h5" component="p">
            {cast.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" component="p">
               Character: {cast.character}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="p">
              Popularity: <StarRateIcon fontSize="small" />
              {"  "} {cast.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent> 
      <CardActions disableSpacing>
        <Button variant="outlined" size="medium" color="primary">
        <Link to={`/relatedMovies/${cast.id}`}>
          <Button variant="contained" size="medium" color="primary">
            Known For..
          </Button>
        </Link>
        </Button>
      </CardActions>
    </Card>
  );
}