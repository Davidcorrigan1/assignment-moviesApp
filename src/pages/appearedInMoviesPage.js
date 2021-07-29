import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getCastMovies, getPerson } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'


const AppearedInMoviesPage = (props) => {
    const { id } = props.match.params

  // Find the movies this Actor appreared in
  const { data: movies, error: moviesError, isLoading: moviesIsLoading, isError: moviesIsError } = useQuery(
    ["castMovies", { id: id }],
    getCastMovies
  );

    // Find the Actors details
    const { data: actor, error: actorError, isLoading: actorIsLoading, isError: actorIsError } = useQuery(
      ["actor", { id: id }],
      getPerson
    );

  if (moviesIsLoading || actorIsLoading) {
    return <Spinner />;
  }

  if (moviesIsError) {
    return <h1>{moviesError.message}</h1>
  }  else if (actorIsError) {
    return <h1>{actorError.message}</h1>
  };

  console.log(movies);

  return (
    <PageTemplate
      title={actor.name + " Movies"}
      movies={movies.results}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default AppearedInMoviesPage;