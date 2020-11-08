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
          // this.props.signIn(user);
          dispatch({ type: "SIGN_IN", payload: user });
        } else {
          // this.props.signOut();
          dispatch({ type: "SIGN_OUT" });
        }
        unsubscribe();
      });
    } catch (error) {
      // this.props.signOut();
      dispatch({ type: "SIGN_OUT" });
    }
  }, [dispatch]);
};
export default useAuthenticateUser;
