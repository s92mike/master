import { useState } from 'react';
import './App.css';
import Swertres from './components/Swertres';
import SearchButton from './components/SearchButton.js';

function App() {
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
      <Swertres searchText={searchText}/>
    </div>
  );
}

export default App;
