import React, { useState } from "react";

function QuizPage({ i18n, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const q = i18n.questions[current];

  const handleSelect = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const nextAnswers = [...userAnswers, selected];
    setUserAnswers(nextAnswers);
    setSelected(null);
    setCurrent(current + 1);
  };

  const handleResult = () => {
    if (selected === null) return;
    const nextAnswers = [...userAnswers, selected];
    onFinish(nextAnswers);
  };

  return (
    <>
      <div className="quiz-title">{i18n.title}</div>
      <div style={{ margin: "24px 0 16px 0", fontWeight: "bold" }}>
        {q.q}
      </div>
      {q.a.map((ans, idx) => (
        <button
          key={idx}
          className={`answer-btn${selected === idx ? " selected" : ""}`}
          onClick={() => handleSelect(idx)}
        >
          {ans}
        </button>
      ))}
      <div>
        {current < i18n.questions.length - 1 ? (
          <button
            className="quiz-btn"
            style={{ marginTop: 32 }}
            onClick={handleNext}
            disabled={selected === null}
          >
            {i18n.next}
          </button>
        ) : (
          <button
            className="quiz-btn"
            style={{ marginTop: 32 }}
            onClick={handleResult}
            disabled={selected === null}
          >
            {i18n.showResult}
          </button>
        )}
      </div>
    </>
  );
}

export default QuizPage;