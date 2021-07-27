import React, { useState, useContext } from "react";
import { addToList, removeFromList, checkListArray, retrieveListArray } from '../api/tmdb-api'
import { AuthContext } from "../contexts/authContext";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ); 
  const [favorites, setFavorites] = useState( [] );
  const [mustWatch, setMustWatch] = useState( [] );
  const [homePageNo, setHomePageNo] = useState( 1 );

  const context = useContext(AuthContext);

  // This will add a movie from a TMDB list and update the favorites state variable
  const addToFavorites = async (movie) => {
      const found = await checkListArray(context.currentUser.listId, movie.id )
      console.log(found);
      if (!found.item_present) {
        const result = await addToList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
        const result1 = await retrieveListArray(context.currentUser.listId);
        const idArray = result1.items.map(item => item.id)
        setFavorites(idArray);
      }
  };

  // This will remove a movie from a TMDB list and update the favorites state variable
  const removeFromFavorites = async (movie) => {
    const result = await removeFromList(context.currentUser.sessionId, context.currentUser.listId, movie.id );
    const result1 = await retrieveListArray(context.currentUser.listId);
    const idArray = result1.items.map(item => item.id)
    setFavorites(idArray);

  };

  // Returns a list of Favorites from the users list on TMDB
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

  // Function to set home page number
  const setHomePageNumber = (page) => {
    setHomePageNo(page);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        homePageNo,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
        returnFavoriteList,
        setHomePageNumber
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;