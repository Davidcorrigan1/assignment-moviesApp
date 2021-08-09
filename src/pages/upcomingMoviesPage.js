import React, {useContext, useEffect} from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'
import { getUpcomingMoviesPage } from "../api/tmdb-api";
import AddToWatchListIcon from '../components/cardIcons/addToWatchList';
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";

const UpcomingMoviesPage = (props) => {
  const movieContext = useContext(MoviesContext);
  const context = useContext(AuthContext);
  const page = movieContext.homePageNo;
  let pagination = 0;

  // This will trigger the moviesContext favorite and mustWatch arrays to be populated from the Users list of Favorites in TMDB
  useEffect(()=> {
    async function refreshDataLists () {
      if (context.currentUser.listId && context.currentUser.mustWatchId && context.refreshLists) {

        await movieContext.refreshFavoriteList(context.currentUser.listId);
        await movieContext.refreshMustWatchList(context.currentUser.mustWatchId);
      }
      context.setRefreshLists(false);
    };

    refreshDataLists ();

  })

  const {  data, error, isLoading, isError }  = useQuery(['upcoming', {page}], getUpcomingMoviesPage)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;
  pagination = data.total_results;

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