const initialState = {
  selectedSubjects: [],
};

const subjects = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_SELECTEDSUBJECTS_FROM_SERVER":
      return {
        ...state,
        selectedSubjects: action.payload,
      };
    case "DELETE_SUBJECT":
      return {
        selectedSubjects: state.selectedSubjects.filter(
          (selectedSubject) => selectedSubject.name !== action.payload.name
        ),
      };
    default:
      return state;
  }
};
export default subjects;
