import React, { useState } from "react";
import SearchButton from './SearchButton';
import DisplayDigits from './DisplayDigits'

export default function Swertres(props) {
  const [searchText, setSearchText] = useState('000');
  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Swertresss</h1>
        <SearchButton
          onChange={searchOnChange.bind(this)}
        />
      </header>
      <DisplayDigits searchText={searchText}/>
    </div>
  );
}