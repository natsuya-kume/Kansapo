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
    // case "ADD_SUBJECT":
    //   return {
    //     ...state,
    //     selectedSubjects: [action.payload, ...state.selectedSubjects],
    // selectedSubjects: action.payload,
    // booksReading: [action.payload, ...state.booksReading],
    //   };
    // case "MARK_BOOK_AS_READ":
    //   return {
    //     ...state,
    //     books: state.books.map((book) => {
    //       if (book.name == action.payload.name) {
    //         return { ...book, read: true };
    //       }
    //       return book;
    //     }),
    //   };
    default:
      return state;
  }
};
export default subjects;
