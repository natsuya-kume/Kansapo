export const loadSelectedSubjects = (subjects) => ({
  type: "LOAD_SELECTEDSUBJECTS_FROM_SERVER",
  payload: subjects,
});

export const deleteSubject = (item, index) => ({
  type: "DELETE_SUBJECT",
  payload: item,
});
