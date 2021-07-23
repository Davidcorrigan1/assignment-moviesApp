import React, { useState, createContext } from "react";
import { auth, signInWithGoogle, getUserDocument, generateUserDocument } from "../database/firebase";
import { requestUserToken, createSessionId, authenticateWithLogin, createNewList } from '../api/tmdb-api'

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({listId: null, sessionId: null, authDisplayName: null, authEmail: null});

  //-----------------------------------------------------------------------------------------
  // Authenticate an existing user and create a new session id.
  //-----------------------------------------------------------------------------------------
  const authenticate = async (email, password ) => {

    const {user} = await auth.signInWithEmailAndPassword(email, password)
    const document = await getUserDocument(user.uid);

    const jsonResult = await requestUserToken();
    console.log(jsonResult.request_token);

    await authenticateWithLogin(jsonResult.request_token);
    const sessionResult = await createSessionId(jsonResult.request_token);  

    setCurrentUser({listId: document.list_id, sessionId: sessionResult.session_id, authDisplayName: document.displayName, authEmail: email });
    console.log(currentUser);
  };

  //-----------------------------------------------------------------------------------------
  // Check if a user has been authenticated
  //-----------------------------------------------------------------------------------------
  const isAuthenticated = currentUser.authEmail === null ? false : true

  //-----------------------------------------------------------------------------------------
  // Sign up a new user. Create a new session id for the user
  //-----------------------------------------------------------------------------------------
  const signup = async (displayName, email, password) => {
    const jsonResult = await requestUserToken();
    console.log(jsonResult.request_token);
    await authenticateWithLogin(jsonResult.request_token);
    const sessionResult = await createSessionId(jsonResult.request_token);  
    
    const results = await createNewList(sessionResult.session_id, "favorite", "Favorites Description");

    const {user} = await auth.createUserWithEmailAndPassword(email, password);
    await generateUserDocument(user, {displayName, list_id: results.list_id});

    setCurrentUser({listId: results.list_id, sessionId: sessionResult.session_id, authDisplayName: displayName, authEmail: email });
    console.log(currentUser);
  };

  //-----------------------------------------------------------------------------------------
  // sign out a user from the application
  //-----------------------------------------------------------------------------------------
  const signout = () => {
    setTimeout(() => setCurrentUser( { listId: null, sessionId: null, authDisplayName: null, authEmail: null} ), 100);
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