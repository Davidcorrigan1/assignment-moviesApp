import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getCastMovies } from "../api/tmdb-api";
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

  if (moviesIsLoading) {
    return <Spinner />;
  }

  if (moviesIsError) {
    return <h1>{moviesError.message}</h1>
  }  

  console.log(movies);

  return (
    <PageTemplate
      title="Appeared in Movies"
      movies={movies.results}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default AppearedInMoviesPage;