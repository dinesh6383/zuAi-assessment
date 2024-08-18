export const evaluateCourse = () => {
  let criteria_a = Math.floor(Math.random() * 21);
  let criteria_b = Math.floor(Math.random() * 21);
  let criteria_c = Math.floor(Math.random() * 21);
  let over_all = Math.floor((criteria_a + criteria_b + criteria_c) / 3);
  const date = new Date(); // Current date
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return {
    criteria_a,
    criteria_b,
    criteria_c,
    over_all,
    evaluation_date: formattedDate,
  };
};
