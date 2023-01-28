import React, { useState } from "react";
import SearchButton from './SearchButton';
import DisplayDigits from './DisplayDigits'

export default function Swertres(props) {
  const [searchText, setSearchText] = useState('   ');
  const [resultText, setResultText] = useState([]);
  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  function searchResultOnChange(inputText) {
    setResultText(inputText);
  }
  return (
    <div className="App">
      <header className="App-header">
        <SearchButton
          resultText={resultText}
          onChange={searchOnChange.bind(this)}
          onResultChange={searchResultOnChange.bind(this)}
        />
      </header>
      <DisplayDigits searchText={searchText} resultText={resultText}/>
    </div>
  );
}