import React, { useState } from "react";
import { checkLengthDigitKeyCode } from "../functions/functions";

export default function SearchByDayButton(props) {
  const [day, setDay] = useState(props.day);

  function checkDigit(e) {
    const { target: { value }, keyCode } = e;
    if (checkLengthDigitKeyCode({ l: 2, value, keyCode })) {
      e.preventDefault();
    }
    if (keyCode === 13) {
        props.dayOnChange(value);
    }
  };

  function checkDayChangeSearch({ target: { value } }) {
    if (value > 31) {
        value = 31;
    }
    setDay(value);
  };
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
    </div>
  );
}
