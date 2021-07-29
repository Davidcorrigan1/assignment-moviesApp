import React, {useContext} from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'
import { getUpcomingMoviesPage } from "../api/tmdb-api";
import AddToWatchListIcon from '../components/cardIcons/addToWatchList';
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = (props) => {
  const movieContext = useContext(MoviesContext);
  const page = movieContext.homePageNo;
  const pagination = true;

  const {  data, error, isLoading, isError }  = useQuery(['upcoming', {page}], getUpcomingMoviesPage)

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
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />
      }}
      pagination={pagination}
    />
  );
};
export default UpcomingMoviesPage;