import React from "react";
import Header from "../headerMovieList";
import SearchCard from "../searchHeader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieListSearch from "../movieListSearch";
import PaginationCard from "../paginationCard";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
  marginAutoItem: {
    margin: 'auto'
  },
});

function MovieSearchPageTemplate({ movies, title, action, pagination, handleChange, genres, years, certificates, searchButton }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        <SearchCard 
            onUserInput={handleChange}
            genre={genres}
            year={years}
            cert={certificates}
            searchButtonAction={searchButton}
        />
      </Grid>
      <Grid item container spacing={6} className={classes.root}>
      <Grid item xs={12}></Grid>
        <MovieListSearch action={action} movies={movies}></MovieListSearch>
      </Grid>
       
      <Grid  className={classes.marginAutoItem}>
        {(pagination > 0) ?  
        <PaginationCard page={pagination} /> : <></>}
      </Grid> 
    </Grid>
  );
}
export default MovieSearchPageTemplate;