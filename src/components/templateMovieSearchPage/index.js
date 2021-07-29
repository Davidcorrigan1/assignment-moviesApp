import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import SearchCard from "../searchHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";
import PaginationCard from "../paginationCard";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
  marginAutoItem: {
    margin: 'auto'
  },
});

function MovieSearchPageTemplate({ movies, title, action, pagination }) {
  const classes = useStyles();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        <SearchCard />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
       
      <Grid  className={classes.marginAutoItem}>
        {(pagination) ?  
        <PaginationCard/> : <></>}
      </Grid> 
    </Grid>
  );
}
export default MovieSearchPageTemplate;