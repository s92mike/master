import React, { useState } from "react";
import SearchButton from './SearchButton';
import DisplayDigits from './DisplayDigits';
import TabSelector from './TabSelector';
import SearchByDayButton from "./SearchByDayButton";

export default function Swertres(props) {
  const [searchText, setSearchText] = useState('   ');
  const [resultText, setResultText] = useState(['', '', '', '', '', '']);
  const [options, setOptions]       = useState('sidebyside') // sidebyside and by day
  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  function searchResultOnChange(inputText) {
    setResultText(inputText);
  }
  let ButtonSelected = () => <SearchButton
    searchText={searchText}
    resultText={resultText}
    onChange={searchOnChange.bind(this)}
    onResultChange={searchResultOnChange.bind(this)}
  />;
  let ResultSection = () => <DisplayDigits searchText={searchText} resultText={resultText}/>;
  if (`sidebyside` !== options) {
    ButtonSelected = () => <SearchByDayButton/>;
    ResultSection = () => 'Coming Soon';
  }
  return (
    <div className="App">
      <header className="App-header">
        <TabSelector options={options} setOptions={setOptions} />
        <ButtonSelected />
      </header>
      <ResultSection/>
    </div>
  );
}