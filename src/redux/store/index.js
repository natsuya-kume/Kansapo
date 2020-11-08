import { createStore, combineReducers } from "redux";
import SubjectsReducer from "../reducers/SubjectsReducer";
import authReducer from "../reducers/authReducer";

const store = createStore(
  combineReducers({
    subjects: SubjectsReducer,
    auth: authReducer,
  })
);

export default store;
