import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromWatched from "../components/cardIcons/removeFromWatched";
import WriteReview from "../components/cardIcons/writeReview";

const WatchedMoviesPage = () => {
  const context = useContext(AuthContext);
  const movieContext = useContext(MoviesContext);

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

  const {mustWatch: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchedMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = watchedMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = watchedMovieQueries.map((q) => q.data);
  //const toDo = () => true;

  return (
    <PageTemplate
      title="Watch List Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatched movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchedMoviesPage;