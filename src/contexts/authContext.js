import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {

  const [user, setUser] = useState({ username: null, email: null, password: null });

  const authenticate = (username, email, password) => {
    setUser({ username, email, password });
  };

  const isAuthenticated = user.email === null ? false : true

  const signout = () => {
    setTimeout(() => setUser( { username: null, email: null, password: null } ), 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;