import React, { useEffect } from 'react' 
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase'
import { createContext, useContext } from 'react';
export const AppContext = createContext();

export default function AuthProvider({ children }) {

  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  // console.log("Auth")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    })
  }, [])

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function forgot(email){
    return sendPasswordResetEmail(auth,email);
  }

  // function login(){ 
  //   return auth
  // }

  const store = {
    signup,
    login,
    logout,
    forgot,
    user
  }

  return (
    <AppContext.Provider value={store}>
      {!loading && children}
    </AppContext.Provider>
  )
}