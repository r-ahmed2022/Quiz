/* eslint-disable react/prop-types */
import { useState } from "react";
export default function SplashScreen({ handleSubmit, dispatch }) {
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      const data = await response.json();

      if (data.response_code === 0) {
        //const dataResult = {data.result, category: formData.category, difficulty: formData.difficulty}
        dispatch({
          type: "quizInitialize",
          payload: {
            result: data.results,
            category: formData.category,
            difficulty: formData.difficulty,
          },
        });
      } else {
        dispatch({ type: "dataFailed" });
      }
    } catch (error) {
      dispatch({ type: "dataFailed" });
    }
    handleSubmit(e, formData);
  }

  return (
    <form className="splashscreen" onSubmit={handleFormSubmit}>
      <label>Category</label>
      <select
        className="btn"
        onChange={handleChange}
        name="category"
        value={formData.category}
      >
        <option className="btn" value=" ">
          --Choose--
        </option>
        <option className="btn" value="9">
          General Knowledge
        </option>
        <option className="btn" value="21">
          Sports
        </option>
        <option className="btn" value="18">
          Computers
        </option>
        <option className="btn" value="11">
          Entertainment
        </option>
      </select>
      <br />
      <label>Difficulty</label>
      <select
        className="btn"
        onChange={handleChange}
        name="difficulty"
        value={formData.difficulty}
      >
        <option className="btn" value=" ">
          --Choose--
        </option>
        <option className="btn" value="easy">
          Easy
        </option>
        <option className="btn" value="medium">
          Medium
        </option>
        <option className="btn" value="hard">
          Hard
        </option>
      </select>
      <button className="btn btn-ui">Load</button>
    </form>
  );
}
