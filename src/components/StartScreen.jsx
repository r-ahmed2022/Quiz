/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

export default function StartScreen({
  numQuestions,
  dispatch,
  category,
  difficulty,
  index,
}) {
  var quizType = "";
  if (category === "9") quizType = "General Knowledge";
  if (category === "21") quizType = "Sports";
  if (category === "18") quizType = "Computers";
  else quizType = "Entertainment";
  return (
    <div className="start">
      <h3>Level: {difficulty}</h3>
      <h3>{numQuestions} questions to test your Knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start", payload: index })}
      >
        Let's start
      </button>
    </div>
  );
}
