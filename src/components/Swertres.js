import React, { useState } from "react";
import SearchButton from './SearchButton';
import DisplayDigits from './DisplayDigits'

export default function Swertres(props) {
  const [searchText, setSearchText] = useState('000');
  const [resultText, setResultText] = useState('000');
  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  function searchResultOnChange(inputText) {
    setResultText(inputText);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Swertresss</h1>
        <SearchButton
          onChange={searchOnChange.bind(this)}
          onResultChange={searchResultOnChange.bind(this)}
        />
      </header>
      <DisplayDigits searchText={searchText} resultText={resultText}/>
    </div>
  );
}