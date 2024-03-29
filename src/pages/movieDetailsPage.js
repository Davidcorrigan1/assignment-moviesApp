import React from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import CastList from "../components/castList";

const MovieDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: movie, error: movieError, isLoading: movieIsLoading, isError: movieIsError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  // Getting the cast details using the useQuery hook which will manage the caching as well.
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