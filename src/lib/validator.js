export const validateData = (data) => {
  const { file_data, course_work, subject, essay_title } = data;

  if (file_data) {
    if (
      (course_work === "Tok Essay" && subject === null) ||
      (course_work !== "Tok Essay" &&
        subject !== null &&
        essay_title !== null &&
        essay_title.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
