import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies, getMoviesPage} from '../api/tmdb-api';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { AuthContext } from "../contexts/authContext";
import { MoviesContext } from "../contexts/moviesContext";

const HomePage = (props) => {
  const context = useContext(AuthContext);
  const movieContext = useContext(MoviesContext);
  const page = movieContext.homePageNo;
  console.log("Homepage");
  console.log(page);

  //const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
  const {  data, error, isLoading, isError }  = useQuery(['discover', {page}], getMoviesPage)
  
  

  // This will trigger the moviesContext favorite array to be populated from the Users list of Favorites in TMDB
  if (context.currentUser.listId) {
    const res = movieContext.returnFavoriteList(context.currentUser.listId);
  }

  
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />    
  );
};

export default HomePage;