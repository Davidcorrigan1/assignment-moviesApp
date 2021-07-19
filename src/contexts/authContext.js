import React, { useState, createContext } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../database/firebase";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [user, setUser] = useState({authDisplayName: null, authEmail: null});

  const authenticate = (displayName, email ) => {
    setUser({authDisplayName: displayName, authEmail: email });
  };

  const isAuthenticated = user.authEmail === null ? false : true

  const signup = (displayName, email) => {
    setUser({authDisplayName: displayName, authEmail: email});
    
  };

  const signout = () => {
    setTimeout(() => setUser( { authDisplayName: null, authEmail: null} ), 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
        signup,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;