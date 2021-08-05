import React, { useState, createContext } from "react";
import { auth, getUserDocument, generateUserDocument } from "../database/firebase";
import { requestUserToken, createSessionId, authenticateWithLogin, createNewList } from '../api/tmdb-api';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({listId: null, sessionId: null, authDisplayName: null, authEmail: null});

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

    setCurrentUser({listId: document.list_id, sessionId: sessionResult.session_id, authDisplayName: document.displayName, authEmail: email });

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
    
    const results = await createNewList(sessionResult.session_id, "favorite", "Favorites Description");

    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    await generateUserDocument(user, {displayName, list_id: results.list_id});

    setCurrentUser({listId: results.list_id, sessionId: sessionResult.session_id, authDisplayName: displayName, authEmail: email });

  };

  //-----------------------------------------------------------------------------------------
  // sign out a user from the application
  //-----------------------------------------------------------------------------------------
  const signout = async () => {
    await auth.signOut();
    setTimeout(() => {
        setCurrentUser( { listId: null, sessionId: null, authDisplayName: null, authEmail: null});}
        , 100);
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
        signup,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;