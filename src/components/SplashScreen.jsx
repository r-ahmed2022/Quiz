/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
export default function SplashScreen({ handleSubmit, dispatch, status }) {
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    console.log(formData);
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  useEffect(() => {
    const { category, difficulty } = formData;
    async function loadQuiz() {
      await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.response_code === 0)
            dispatch({ type: "quizInitialize", payload: data.results });
        })
        .catch((error) => dispatch({ type: "dataFailed" }));
    }
    if (status === "initialize") loadQuiz();
    return () => {
      console.log("cleaning");
    };
  }, [status]);
  return (
    <form className="splashscreen" onSubmit={(e) => handleSubmit(e, formData)}>
      <label>Category</label>
      <select
        className="btn"
        onChange={handleChange}
        name="category"
        value={formData.category}
      >
        <option value=" ">--Choose--</option>
        <option value="9">General Knowledge</option>
        <option value="21">Sports</option>
        <option value="18">Computers</option>
        <option value="11">Entertainment</option>
      </select>
      <br />
      <label>Difficulty</label>
      <select
        className="btn"
        onChange={handleChange}
        name="difficulty"
        value={formData.difficulty}
      >
        <option value=" ">--Choose--</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="btn btn-ui">Load</button>
    </form>
  );
}
