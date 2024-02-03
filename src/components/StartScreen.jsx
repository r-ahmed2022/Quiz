/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */


export default function StartScreen({numQuestions, dispatch, category}) {
   let  quizType = ''
  if(category === '9')
  quizType = "General Knowledge" 
 if(category === '21')
  quizType =  "Sports" 
  if(category === '18')
  quizType = "Computers" 
  else
  if(category === '11')
  quizType = "Entertainment"
  return (
    <div className="start">
          <h2>Welcome to The {quizType} Quiz!</h2>
      <h3>{numQuestions} questions to test your Knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start"})}
      >
        Let's start
      </button>
    </div>
  )
}
