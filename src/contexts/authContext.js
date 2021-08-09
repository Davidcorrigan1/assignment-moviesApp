import React, { useState, createContext } from "react";
import { auth, getUserDocument, generateUserDocument } from "../database/firebase";
import { requestUserToken, createSessionId, authenticateWithLogin, createNewList } from '../api/tmdb-api';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({listId: null, mustWatchId: null, sessionId: null, authDisplayName: null, authEmail: null});
  const [refreshLists, setRefreshLists] = useState(false);

  //-----------------------------------------------------------------------------------------
  // Authenticate an existing user with Firebase Auth
  // Retrieve the users data from the FireStore database. I.e. TMDB list id and Users Username
  // Request a User Token from TMDB with the API key.
  // Authenticate the token with login details from the env file.
  // create a new session id with the authenticated token.
  // Store these in the currentUser context state.
  //-----------------------------------------------------------------------------------------
  const authenticate = async (email, password ) => {

    const {user} = await auth.signInWithEmailAndPassword(email, password)
    const document = await getUserDocument(user.uid);

    const jsonResult = await requestUserToken();

    await authenticateWithLogin(jsonResult.request_token);
    const sessionResult = await createSessionId(jsonResult.request_token);  

    setCurrentUser({listId: document.list_id, mustWatchId: document.mustWatch_id, sessionId: sessionResult.session_id, authDisplayName: document.displayName, authEmail: email });
    setRefreshLists(true);

  };

  //-----------------------------------------------------------------------------------------
  // Check if a user has been authenticated
  //-----------------------------------------------------------------------------------------
  const isAuthenticated = currentUser.authEmail === null ? false : true

  //-----------------------------------------------------------------------------------------
  // Sign up a new user. 
  // Request a User Token from TMDB with the API key.
  // Authenticate the token with login details from the env file.
  // create a new session id with the authenticated token.
  // Create a new list for the user on TMDB
  // Create a new user with Firebase Auth
  // Store the users data on the FireStore database. I.e. TMDB list id and Users Username
  // Store these in the currentUser context state.
  //-----------------------------------------------------------------------------------------
  const signup = async (displayName, email, password) => {
    const jsonResult = await requestUserToken();

    await authenticateWithLogin(jsonResult.request_token);
    const sessionResult = await createSessionId(jsonResult.request_token);  
    
    const favoriteResults = await createNewList(sessionResult.session_id, "favorite", "Favorites Description");
    const mustWatchResults = await createNewList(sessionResult.session_id, "mustWatch", "Must Watch Description");

    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    await generateUserDocument(user, {displayName, list_id: favoriteResults.list_id, mustWatch_id: mustWatchResults.list_id});

    setCurrentUser({listId: favoriteResults.list_id, mustWatchId: mustWatchResults.list_id, sessionId: sessionResult.session_id, authDisplayName: displayName, authEmail: email});
    setRefreshLists(true);

  };

  //-----------------------------------------------------------------------------------------
  // sign out a user from the application
  //-----------------------------------------------------------------------------------------
  const signout = async () => {
    await auth.signOut();
    setTimeout(() => {
        setCurrentUser( { listId: null, mustWatchId: null, sessionId: null, authDisplayName: null, authEmail: null});
        setRefreshLists(false);}
        , 100);
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
        signup,
        refreshLists,
        currentUser,
        setRefreshLists
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;