import React, { ChangeEvent, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { WORDLIST } from "./words";
import Hangman from "./Hangman";

function App() {
  const setRandomWord = (arr: string[]): string => {
    return arr[Math.floor(Math.random()*arr.length)]
  }
  

  return (
    <div className="App">
      <h1>Hangman</h1>
      <Hangman currentWord = {setRandomWord(WORDLIST)} />
    </div>
  );
}

export default App;


