import React, { useState, useContext, useEffect  } from "react";
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
import { AuthContext } from "../../contexts/authContext";
import { retrieveListArray } from "../../api/tmdb-api";

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)"},
  StarIcon: {
    backgroundColor: "rgb(0, 0, 255)"
  },
});

export default function MovieCard({ movie, action }) {
  const classes = useStyles();
  const { favorites, mustWatch } = useContext(MoviesContext);
  const context = useContext(AuthContext);
  const [favoriteArray, setFavoriteArray] = useState([]);

  const listId = context.currentUser.listId;

  useEffect(() => {
      async function getFavoriteArray(listId) {
        
        const returnArray = await retrieveListArray(listId);
        const idArray = returnArray.items.map(item => item.id)
        setFavoriteArray(idArray);
      };
      if (context.currentUser.isAuthenticated) {
        console.log("Authentiated");
        getFavoriteArray(listId);
      }
    }, []
  )


  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  };


  if (mustWatch.find((id) => id === movie.id)) {
    movie.mustWatch = true;
  } else {
    movie.mustWatch = false;
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar={
          //both ? (
          (movie.favorite && movie.mustWatch) ? (         // Allowing both the favorite and must watch icon
            <AvatarGroup max={2}>                         // Using AvatarGroup to handle multiple
              <Avatar className={classes.avatar}>
                <FavoriteIcon />
              </Avatar>
              <Avatar className={classes.StarIcon}>
                  <StarIcon />
              </Avatar>
            </AvatarGroup>
          ) : (
          movie.favorite ? (                             // Only favorite icon
            <Avatar className={classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : (movie.mustWatch ? (                       // Only must watch icon
                <Avatar className={classes.StarIcon}>
                  <StarIcon />
                </Avatar>
              ) : null)
          )
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Button variant="outlined" size="medium" color="primary">
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        </Button>
      </CardActions>
    </Card>
  );
}