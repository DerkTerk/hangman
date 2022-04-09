import React, { useState } from "react";
import PropTypes from "prop-types";
import { WORDLIST } from "./words";
export interface HangmanProps {
  currentWord: string;
}

const Hangman = (props: HangmanProps) => {
  const [graveyard, setGraveyard] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [correctBank, setCorrectBank] = useState('')
  const { currentWord } = props;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (currentWord.includes(inputValue)) {
      setCorrectBank(correctBank + inputValue)
    }
    const newGraveyard = graveyard;
    newGraveyard.push(inputValue);
    setInputValue("");
    setGraveyard(newGraveyard);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  let isSubmitDisabled =
    inputValue.length !== 1 || graveyard.includes(inputValue);
  return (
    <div>
      <h2>{currentWord}</h2>
      <div className="app__graveyard">{graveyard}</div>
      <div aria-label="target word">{correctBank}</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          aria-label="Letter"
          placeholder="type one letter"
          value={inputValue}
        />
        <button disabled={isSubmitDisabled} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Hangman;
