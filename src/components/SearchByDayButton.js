import React, { useState } from "react";
import { checkLengthDigitKeyCode } from "../functions/functions";

export default function SearchByDayButton(props) {
  const [day, setDay] = useState(props.day);
  const [search, setSearch] = useState(props.daySearch);

  function checkDigit(e) {
    const { target: { value }, keyCode } = e;
    if (checkLengthDigitKeyCode({ l: 2, value, keyCode })) {
      e.preventDefault();
    }
    if (keyCode === 13) {
        props.dayOnChange(value, search);
    }
  };

  function checkDigitResult(e) {
    const { target: { value }, keyCode } = e;
    if (checkLengthDigitKeyCode({ l: 3, value, keyCode })) {
      e.preventDefault();
    }
    if (keyCode === 13) {
      props.dayOnChange(day, value);
    }
  };

  function checkDayChangeSearch({ target: { value } }) {
    if (value > 31) {
        value = 31;
    }
    setDay(value);
  };

  function checkDayChangeResult({ target: { value } }) {
    if (value > 999) {
        value = 999;
    }
    setSearch(value);
  };

  function submitDigits () {
    props.dayOnChange(day, search);
  }
  return (
    <div className="inputers">
      <label htmlFor="search">
        <input
          type="number"
          min="1"
          max="31"
          onChange={checkDayChangeSearch.bind(this)}
          onKeyDown={checkDigit.bind(this)}
          value={day}
        />
      </label>
      <hr className="break"/>
      <label htmlFor="result">
        <input
          type="number"
          min="0"
          max="999"
          onChange={checkDayChangeResult.bind(this)}
          onKeyDown={checkDigitResult.bind(this)}
          value={search}
        />
      </label>
      <hr className="break"/>
      <button type="button" onClick={submitDigits.bind(this)}>Search!</button>
    </div>
  );
}
