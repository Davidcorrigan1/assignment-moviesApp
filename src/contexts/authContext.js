import React, { useState, createContext } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../database/firebase";
import { requestUserToken, authenticateToken, createSessionId, authenticateWithLogin } from '../api/tmdb-api'

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({requestToken: null, authDisplayName: null, authEmail: null});

  const authenticate = async (displayName, email ) => {
    const jsonResult = await requestUserToken();
    console.log(jsonResult.request_token);
    //const response = await authenticateToken(jsonResult.request_token);
    const response = await authenticateWithLogin(jsonResult.request_token);
    console.log(response);
    const sessionResult = await createSessionId(jsonResult.request_token);  
    console.log(sessionResult.session_id);

    setCurrentUser({authDisplayName: displayName, authEmail: email });
    //console.log(currentUser);
  };

  const isAuthenticated = currentUser.authEmail === null ? false : true

  const signup = (displayName, email) => {
    setCurrentUser({authDisplayName: displayName, authEmail: email});
    
  };

  const signout = () => {
    setTimeout(() => setCurrentUser( { authDisplayName: null, authEmail: null} ), 100);
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