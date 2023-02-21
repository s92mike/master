import React, { useState } from "react";

import DisplayDay from "./DisplayDay";
import SearchButton from "./SearchButton";
import TabSelector from "./TabSelector";
import DisplayDigits from "./DisplayDigits";
import SearchByDayButton from "./SearchByDayButton";
import DisplayDigitsAuto from "./DisplayDigitsAuto";
import surigaoImage from "../surigao.jpg";

export default function Swertres() {
  const [day, setDay] = useState(""); // used by day SearchButton and DisplayDay, function SearchByDayButton
  const [daySearch, setDaySearch] = useState(""); // used by Search Day Search number
  const [data, setData] = useState([]); // used by DisplayDigit, DisplayDay
  const [options, setOptions] = useState("sidebyside"); // used by TabSelector
  const [searchText, setSearchText] = useState(""); // used by SearchButton, DisplayDigit
  const [resultText, setResultText] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]); // used by SearchButton, DisplayDigit

  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  function searchResultOnChange(inputText) {
    setResultText(inputText);
  }
  function dayOnChange(inputText, searchText) {
    setDay(inputText);
    setDaySearch(searchText);
  }
  function updateData(inputData) {
    setData(inputData);
  }
  let ButtonSelected = () => (
    <SearchButton
      searchText={searchText}
      resultText={resultText}
      onChange={searchOnChange.bind(this)}
      onResultChange={searchResultOnChange.bind(this)}
    />
  );
  let ResultSection = () => (
    <DisplayDigits
      data={data}
      updateData={updateData.bind(this)}
      searchText={searchText}
      resultText={resultText}
    />
  );
  switch (options) {
    case `byday`:
      ButtonSelected = () => (
        <SearchByDayButton
          day={day}
          daySearch={daySearch}
          dayOnChange={dayOnChange.bind(this)}
        />
      );
      ResultSection = () => <DisplayDay day={day} daySearch={daySearch} data={data} />;
      break;
    case `sidebysidev1`:
      ButtonSelected = () => "";
      ResultSection = () => <DisplayDigitsAuto data={data}/>;
      break;
    case `image-surigao`:
      ButtonSelected = () => "";
      ResultSection = () => <img className="custom-img" src={surigaoImage} alt=""/>;
      break;
    default:
      break;
  }
  let DisplayTab = () => "";
  if (data.length > 0) {
    DisplayTab = () => (
      <TabSelector options={options} setOptions={setOptions} />
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <DisplayTab />
        <ButtonSelected />
      </header>
      <ResultSection />
    </div>
  );
}
