import React from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import SampleCast from "../stories/sampleCastData";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import CastList from "../components/castList";

const MovieDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const castMembers = [
    { ...SampleCast, id: 1 },
    { ...SampleCast, id: 2 },
    { ...SampleCast, id: 3 },
    { ...SampleCast, id: 4 },
    { ...SampleCast, id: 5 },
  ];


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <CastList
              castMembers={castMembers}
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