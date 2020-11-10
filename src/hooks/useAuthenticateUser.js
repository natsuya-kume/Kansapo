import { useEffect } from "react";

import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
const useAuthenticateUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: "SIGN_IN", payload: user });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
        unsubscribe();
      });
    } catch (error) {
      dispatch({ type: "SIGN_OUT" });
    }
  }, [dispatch]);
};
export default useAuthenticateUser;
