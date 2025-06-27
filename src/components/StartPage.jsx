import React from "react";

function StartPage({ i18n, onStart }) {
  return (
    <>
      <img src={i18n.mainImage} alt="main" className="quiz-image" />
      <div className="quiz-title">{i18n.title}</div>
      <button className="quiz-btn" onClick={onStart}>
        {i18n.start}
      </button>
    </>
  );
}

export default StartPage;