import React, { useState, useContext } from "react";
import { addToList, removeFromList } from '../api/tmdb-api'
import { AuthContext } from "../contexts/authContext";
import { retrieveListArray } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ); 
  const [favorites, setFavorites] = useState( [] );
  const [mustWatch, setMustWatch] = useState( [] );

  const context = useContext(AuthContext);

  // Function to add movie to the favorites state variable array. Only allow to be added once
  const addToFavorites = async (movie) => {
 
      const result = await addToList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
      console.log(result);
      const result1 = await retrieveListArray(context.currentUser.listId);
      const idArray = result1.items.map(item => item.id)
      setFavorites(idArray);

  };

  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
      const result = await removeFromList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
      const result1 = await retrieveListArray(context.currentUser.listId);
      const idArray = result1.items.map(item => item.id)
      setFavorites(idArray);

  };

  const returnFavoriteList = async (listId) => {
    const result = await retrieveListArray(listId);
    const idArray = result.items.map(item => item.id)
    setFavorites(idArray);

    return result; 
  }

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
        removeFromMustWatch,
        returnFavoriteList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;