import React, { useState, createContext } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../database/firebase";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState({authDisplayName: null, authEmail: null});

  const authenticate = (displayName, email ) => {
    setCurrentUser({authDisplayName: displayName, authEmail: email });
    console.log(currentUser);
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