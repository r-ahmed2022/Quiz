/* eslint-disable react/prop-types */
import Options from "./Options";
export default function Question({ question, answer, dispatch, index, points }) {
  return (
    <div>
      <h4 dangerouslySetInnerHTML={{__html: `${question.question}`}}></h4>
      <Options {...question} dispatch={dispatch} 
      answer={answer} index={index}
      points={points} />
    </div>
  );
}
