/* eslint-disable no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./Header";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import NextButton from "./NextButton";
import FinishQuiz from "./FinishQuiz";
import SplashScreen from "./SplashScreen";
import Progress from "./Progress";
import QuizTimer from "./QuizTimer";

const initialState = {
  status: "initialize",
  questions: [],
  index: 0,
  answer: null,
  correct_answer: null,
  category: "",
  difficulty: "",
  points: 0,
  highscores: JSON.parse(localStorage.getItem("highestscores")) || [],
  secondsRemaining: null,
};

function shuffleOptions(temp) {
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

function combineAnswers(obj) {
  return {
    type: obj.type,
    difficulty: obj.difficulty,
    category: obj.category,
    question: obj.question,
    correctOption: obj.correct_answer,
    options: shuffleOptions([obj.correct_answer, ...obj.incorrect_answers]),
  };
}

const SECS_PER_QUESTION = 10;

function reducer(state, action) {
  let newArray = [];
  if (action.payload && action.payload.result) {
    newArray = action.payload.result.map(combineAnswers);
  }
  switch (action.type) {
    case "quizInitialize":
      return {
        ...state,
        questions: newArray,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
        status: "loading",
      };
    case "dataReceived":
      return {
        ...state,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        correctOption: action.payload,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "chosenAnswer":
      state = {
        ...state,
        answer: action.payload.option,
        correctOption: action.payload.correctOption,
      };
      if (state.answer === state.correctOption)
        state = { ...state, points: state.points + 10 };
      return state;
    case "nextQuestion":
      return { ...state, index: action.payload + 1, answer: null };
    case "finish": {
      const currentScore = state.points;
      const currentCategory = state.category;
      const categoryIndex = state.highscores.findIndex(
        (quiz) => quiz.category === currentCategory
      );
      if (
        categoryIndex === -1 ||
        currentScore > state.highscores[categoryIndex].score || 0
      ) {
        const updatedHighscores = [
          ...state.highscores.filter(
            (score) => score.category !== currentCategory
          ),
          { category: currentCategory, score: currentScore },
        ].sort((a, b) => b.score - a.score);
        localStorage.setItem(
          "highestscores",
          JSON.stringify(updatedHighscores)
        );

        return {
          ...state,
          highscores: updatedHighscores,
          status: "finish",
        };
      } else {
        return {
          ...state,
          status: "finish",
        };
      }
    }
     case "restart":
      return {
        ...initialState,
        question: state.questions,
        status: "initialize",
      };
    case "ticker":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown error");
  }
}
export default function App() {
  const [
    {
      status,
      questions,
      index,
      answer,
      category,
      difficulty,
      correctOption,
      points,
      highscores,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleSubmit = (formData) => {
    dispatch({ type: "dataReceived", payload: formData });
  };
  const numOfQuestions = questions.length;
  const maxPossiblePoints = numOfQuestions * 10;
  return (
    <div className="app">
      <Header status={status} category={category} />
      <Main>
        {status === "initialize" && (
          <SplashScreen
            status={status}
            handleSubmit={handleSubmit}
            dispatch={dispatch}
          />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={questions?.length}
            dispatch={dispatch}
            category={category}
            difficulty={difficulty}
            index={index}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestions={questions?.length}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
              index={index}
              points={points}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              points={points}
            />
            <QuizTimer
              secondsRemaining={secondsRemaining}
              dispatch={dispatch}
            />
            <NextButton
              index={index}
              dispatch={dispatch}
              answer={answer}
              numOfQuestions={numOfQuestions}
            />
          </>
        )}
        {status === "finish" && (
          <FinishQuiz
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscores={highscores}
            dispatch={dispatch}
            category={category}
          />
        )}
      </Main>
    </div>
  );
}
