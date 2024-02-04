/* eslint-disable react/prop-types */

export default function Progress({numOfQuestions, maxPossiblePoints, index, answer, points}) {
  return (
    <header className="progress">
     <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
      Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
      <strong>{points}</strong> / {maxPossiblePoints}

      </p>

    </header>
  )
}
