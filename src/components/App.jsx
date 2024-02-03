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

const initialState = {
  status: "initialize",
  questions: [],
  index: 0,
  answer: null,
  correct_answer: null,
  category: "",
  difficulty: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "quizInitialize":
      return { ...state, questions: action.payload};
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        category: action.payload.category,
        difficulty: action.payload.difficulty,
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "chosenAnswer":
      return { ...state, answer: action.payload };
    default:
      throw new Error("Unknown error");
  }
}
export default function App() {
  const [{ status, questions, index, answer, category, difficulty }, dispatch] =
    useReducer(reducer, initialState);

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    dispatch({ type: "dataReceived", payload: formData });
  };

  return (
    <div className="app">
      <Header status={status} />
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
          />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton />
          </>
        )}
        {status === "finished" && <FinishQuiz />}
      </Main>
    </div>
  );
}
