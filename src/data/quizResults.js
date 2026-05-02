export const getQuizResults = () => {
  return JSON.parse(localStorage.getItem("quizResults")) || [];
};

export const saveQuizResult = (result) => {
  const results = getQuizResults();
  results.push(result);
  localStorage.setItem("quizResults", JSON.stringify(results));
};
