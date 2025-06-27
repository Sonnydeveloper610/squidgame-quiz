import React, { useState } from "react";
import "./styles/pastel.css";
import ko from "./i18n/ko.json";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import StartPage from "./components/StartPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";

// 언어 감지(기본: ko)
function getLang() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("en")) return "en";
  return "ko";
}

const i18nMap = { ko, en, es };

function App() {
  const [step, setStep] = useState("start"); // start, quiz, result
  const [answers, setAnswers] = useState([]);
  const [lang, setLang] = useState(getLang());
  const i18n = i18nMap[lang];

  const handleStart = () => {
    setStep("quiz");
    setAnswers([]);
  };

  const handleQuizEnd = (userAnswers) => {
    setAnswers(userAnswers);
    setStep("result");
  };

  const handleRestart = () => {
    setStep("start");
    setAnswers([]);
  };

  return (
    <div className="quiz-container">
      {step === "start" && (
        <StartPage i18n={i18n} onStart={handleStart} />
      )}
      {step === "quiz" && (
        <QuizPage i18n={i18n} onFinish={handleQuizEnd} />
      )}
      {step === "result" && (
        <ResultPage i18n={i18n} answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;