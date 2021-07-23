import React, { useState, useContext } from "react";
import { addToList, removeFromList } from '../api/tmdb-api'
import { AuthContext } from "../contexts/authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ); 
  const [favorites, setFavorites] = useState( [] );
  const [mustWatch, setMustWatch] = useState( [] );

  const context = useContext(AuthContext);

  // Function to add movie to the favorites state variable array. Only allow to be added once
  const addToFavorites = async (movie) => {
    if (!(favorites.includes(movie.id))) {
      setFavorites([...favorites,movie.id])
      const result = await addToList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
      console.log(result);
    }
  };

  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
    if (favorites.includes(movie.id)) {
      const result = await removeFromList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
    }
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  // Function to add movie to the mustWatch state variable array
  const addToMustWatch = (movie) => {
    if (!(mustWatch.includes(movie.id))) {
      setMustWatch([...mustWatch,movie.id])
    }
  };

  // Function to remove a movie from the mustWatch state variable array
  const removeFromMustWatch = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;