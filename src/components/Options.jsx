/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

function Options({ options, correctOption, answer, dispatch, points }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options?.map((option) => (
        <button
          id={option}
          className={`btn btn-option ${option === answer ? "answer" : ""} ${
            hasAnswered ? (option === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          onClick={() =>
            dispatch({
              type: "chosenAnswer",
              payload: { option, correctOption, points },
            })
          }
          disabled={hasAnswered}
          dangerouslySetInnerHTML={{ __html: `${option}` }}
        ></button>
      ))}
    </div>
  );
}
export default Options;
