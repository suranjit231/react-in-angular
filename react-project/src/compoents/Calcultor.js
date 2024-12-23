import React, { useEffect, useState } from "react";
import styles from "./Calcultor.module.css";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);


  useEffect(()=>{
    window.dispatchEvent(new CustomEvent('calculatorResult', {
      detail: { result: result }
    }));


  },[result]);

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult(null);
    } else if (value === "=") {
      try {
        const expression = input.replace("÷", "/").replace("×", "*");
        const calcResult = eval(expression); // Note: Avoid eval in production, use a safe library like Math.js.
        setResult(calcResult);
      } catch {
        setResult("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };



  



  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{result !== null ? result : input || "0"}</div>
      <div className={styles.keypad}>
        {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "C", "0", "=", "+"].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)} className={styles.button}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
