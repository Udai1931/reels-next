import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { createContext, useContext } from 'react';

export const AppContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = React.useState();
  console.log("Auth")

  function signup(email,password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // function login(){ 
  //   return auth
  // }

  const store = {
    signup,
    // user
  }

  return (
    <AppContext.Provider value={{store}}>
      {children}
    </AppContext.Provider>
  )
}