import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie, retrieveListArray } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {

  const [favoriteArray, setFavoriteArray] = useState([]);
  const {favorites: movieIds} = useContext(MoviesContext);
  const context = useContext(AuthContext);

  

  const listId = context.currentUser.listId;
  useEffect(() => {
      async function getFavoriteArray(listId) {
        const returnArray = await retrieveListArray(listId);
        console.log("In the useEffect")
        console.log(returnArray.items);
        const idArray = returnArray.items.map(item => item.id)
        console.log(idArray);
        setFavoriteArray(idArray);
      };

      getFavoriteArray(listId);
    }, []
  )
  
  console.log("list!");
  console.log(favoriteArray);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    //movieIds.map((movieId) => {
    favoriteArray.map((movieId) => {

    return {
        queryKey: ["movie", { id: movieId}],
        queryFn: getMovie,
      };
    })
  );


  // Check if any of the parallel queries is still loading.
  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }
  const movies = favoriteMovieQueries.map((q) => q.data);
 // const toDo = () => true;

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;