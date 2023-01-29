import React, { useState } from "react";
import SearchButton from "./SearchButton";
import DisplayDigits from "./DisplayDigits";
import TabSelector from "./TabSelector";
import SearchByDayButton from "./SearchByDayButton";
import DisplayDay from "./DisplayDay";

export default function Swertres(props) {
  const [day, setDay] = useState("");
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("   ");
  const [resultText, setResultText] = useState(["", "", "", "", "", "", "", "", ""]);
  const [options, setOptions] = useState("sidebyside"); // sidebyside and by day
  function searchOnChange(inputText) {
    setSearchText(inputText);
  }
  function searchResultOnChange(inputText) {
    setResultText(inputText);
  }
  function dayOnChange(inputText) {
    setDay(inputText);
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
  if (`sidebyside` !== options) {
    ButtonSelected = () => (
      <SearchByDayButton day={day} dayOnChange={dayOnChange.bind(this)} />
    );
    ResultSection = () => <DisplayDay day={day} data={data} />;
  }
  return (
    <div className="App">
      <header className="App-header">
        <TabSelector options={options} setOptions={setOptions} />
        <ButtonSelected />
      </header>
      <ResultSection />
    </div>
  );
}
