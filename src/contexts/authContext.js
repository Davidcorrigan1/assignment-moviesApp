import React, { useState, createContext } from "react";
import { auth, signInWithGoogle, generateUserDocument } from "../database/firebase";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [user, setUser] = useState({firstName: null, lastName: null, email: null, password: null });

  const authenticate = (email, password) => {
    setUser({email, password });
  };

  const isAuthenticated = user.email === null ? false : true

  const signup = (firstName, lastName, email, password) => {
    setUser({firstName: firstName, lastName: lastName, email: email, password: password});
    
  };

  const signout = () => {
    setTimeout(() => setUser( { firstName: null, lastName: null, email: null, password: null } ), 100);
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