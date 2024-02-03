/* eslint-disable react/prop-types */
import Options from "./Options";
export default function Question({ question, answer, dispatch }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options {...question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
