import React, { useContext  } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";


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
    <Link to={`/movies/${movie.id}`} style={{textDecoration: 'none'}}> 
    <Card className={classes.card}>
      <CardActionArea>
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
                    <Typography variant="body3" color="textSecondary" component="p">
                        {movie.overview}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
        </CardActionArea>
       
    </Card>
    </Link>
  );
}