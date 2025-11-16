import { useState,useEffect } from "react";
const API_URL = "https://opentdb.com/api.php?amount=1&type=boolean";

export default function Question() {
    const [category, setCategory] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        async function fetchQuestion() {
            const res = await fetch(API_URL);
            const data = await res.json();
            const first = data.results[0];
            
            setCategory(first.category);
            setQuestion(first.question);
            setAnswer(first.correct_answer);
        }
        fetchQuestion();
    }, []);

    function handleReveal() {setRevealed(true);}

  return (
    <div>
      <div>{category}</div>
      <h3>{question}</h3>
      <button type="button" onClick={handleReveal}>
        Reveal answer
      </button>
      <div>{revealed ? answer : ""}</div>
    </div>
  );
}