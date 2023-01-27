import { useState } from 'react';
import './App.css';
import Swertres from './components/Swertres';
import SearchButton from './components/SearchButton.js';

function App() {
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
      <Swertres searchText={searchText} resultText={resultText}/>
    </div>
  );
}

export default App;
