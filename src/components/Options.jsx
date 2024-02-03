/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function Options({ options, correctOption, answer, points, dispatch }) {
  const hasAnswered = answer !==null;
  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          className={`btn btn-option ${ index === answer ? 
          "answer" : ""} ${hasAnswered ? index === correctOption ? "correct" : "wrong" : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "chosenAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
export default Options;
