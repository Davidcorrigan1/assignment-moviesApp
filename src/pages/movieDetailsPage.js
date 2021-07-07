import React from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import CastList from "../components/castList";

const MovieDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: movie, error: movieError, isLoading: movieIsLoading, isError: movieIsError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const { data: castList, error: castError, isLoading: castIsLoading, isError: castIsError } = useQuery(
    ["moveid", {id: id}],
    getMovieCast
  );

  if (movieIsLoading || castIsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  } else if (castIsError) {
    <h1>{castError.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <CastList
              castMembers={castList.cast}
              action={(c) => <AddToFavoritesIcon movie={c} />}
            /> 
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(MovieDetailsPage);