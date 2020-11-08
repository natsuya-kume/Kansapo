import React from "react";

import { firebaseConfig } from "./src/config/config";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import Kulms from "./Kulms";

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Provider store={store}>
      <Kulms />
    </Provider>
  );
};

export default App;
