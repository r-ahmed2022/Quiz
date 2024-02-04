/* eslint-disable react/prop-types */
function Header({ status, category }) {
  var quizType = "";
  if (category === "9") quizType = "General Knowledge";
  if (category === "21") quizType = "Sports";
  if (category === "18") quizType = "Computers";
  else if (category === "11") quizType = "Entertainment";
  return (
    <header className="app-header">
      {status === "initialize" ? (
        <>
         <h1>Online Quiz</h1>
        <img
          src="quiz-1.png"
          alt="Quiz logo"
          style={{ width: "100px", height: "auto" }}
        />
        </>
      ) : (
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img
            src="quiz-1.png"
            alt="Quiz logo"
            style={{ width: "80px", height: "auto" }}
          />
          {quizType} Quiz
        </h1>
      )}
    </header>
  );
}

export default Header;
