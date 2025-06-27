import React from "react";

function getResultKey(answers, i18n) {
  const scoreMap = {};
  const questions = i18n.questions;
  answers.forEach((ansIdx, qIdx) => {
    const chars = questions[qIdx].score[ansIdx];
    chars.forEach((char) => {
      scoreMap[char] = (scoreMap[char] || 0) + 1;
    });
  });
  let max = -1;
  let resultKey = null;
  Object.entries(scoreMap).forEach(([key, val]) => {
    if (val > max) {
      max = val;
      resultKey = key;
    }
  });
  const maxKeys = Object.entries(scoreMap).filter(([_, v]) => v === max).map(([k]) => k);
  if (maxKeys.length > 1) {
    resultKey = maxKeys[Math.floor(Math.random() * maxKeys.length)];
  }
  return resultKey;
}

function ResultPage({ i18n, answers, onRestart }) {
  const resultKey = getResultKey(answers, i18n);
  const result = i18n.results[resultKey];

  const handleShareResult = () => {
    navigator.clipboard.writeText(window.location.href + "?result=" + resultKey);
    alert("URL이 복사되었습니다!");
  };
  const handleShareTest = () => {
    navigator.clipboard.writeText(window.location.origin);
    alert("테스트 URL이 복사되었습니다!");
  };

  return (
    <>
      <img src={result.img} alt={result.name} className="result-img" />
      <div className="quiz-title">{result.name}</div>
      <div style={{ margin: "16px 0 24px 0" }}>{result.desc}</div>
      <button className="share-btn" onClick={handleShareResult}>
        {i18n.shareResult}
      </button>
      <button className="share-btn" onClick={handleShareTest}>
        {i18n.shareTest}
      </button>
      <div>
        <button className="quiz-btn" style={{ marginTop: 32 }} onClick={onRestart}>
          다시하기
        </button>
      </div>
    </>
  );
}

export default ResultPage;