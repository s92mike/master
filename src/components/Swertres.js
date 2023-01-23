import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function Swertres(props) {
  const [data,setData]      = useState([]);
  const [
    searchData, 
    setSearchData]          = useState(props.searchText);
  const [
    searchPossibilities, 
    setSearchPossibilities] = useState([]);
  useEffect(()=>{
    if (searchData != props.searchText) {
      console.log(`this is a test`, searchData, props.searchText);
      // setSearchData(props.searchText);
      // let possibilities     = getPossibleCombination(searchData);
    }
  });
  if (data.length <= 0){
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRaT3afh6TliK1NPPeyA2pZUzp-tqVK3rwN-oN6KNLc7Y4udVPGIJ2HMPJ7EdQ-bQX9pe-CM7Etrv0a/pub?output=csv", {
      download: true,
      header: false,
      complete: (results) => {
        setData(results.data);
      }
    });
  }
  // all function with return element
  const Loading         = () => <h2>Loading . . .</h2>;
  const BreakElement    = () => <li key={Math.random()} className="break">&nbsp;</li>;
  const BlankElement    = () => ('');
  const DemoData        = () => {
    return searchPossibilities.map((item)=><div key={Math.random()}>{item}</div>)
  };

  //convert number to Word Months e.g. January, February, ...
  const displayMonth    = (number) => {
    let getCorrectMonth = Math.ceil(number/3);
    const date            = new Date();
    date.setMonth(getCorrectMonth - 1);
    return date.toLocaleDateString('en-US', {
      month: 'long'
    })
  }
  //determine the Year starting 2019
  const displayYear     = (number, year, month, count) =>  {
    if (month === 'January' && number > 3 && count === 1) {
      return year + 1;
    }
    return year;
  }
  //counter 1 to 3
  const checkCount      = (num) => (num > 3 ? 1 : num); 
  //get all possible combination
  const getPossibleCombination = (num) => {
    const chars         = Array.from(num);
    const possibility   = [];
    chars.map((item, iind)=>{
      const tempItem  = chars.filter((el, i)=> i !== iind);
      tempItem.map((val, ind)=>{
        let tempVal = tempItem[ind+1] ?? tempItem[ind-1];
        let value = `${item}${val}${tempVal}`;
        possibility.push(value)
        return val;
      });
      return item;
    });;
    return [...new Set(possibility)];
  }
  //Initialization of variables
  const swertresData    = Array.from(data);
  const swertresSearch  = Array.from(searchPossibilities);
  const countType       = ['select', '2PM', '5PM', '9PM'];
  let DisplayData       = Loading;
  let breakIndicator    = 1;
  let possibilities     = getPossibleCombination(searchData);
  let result3Der        = getPossibleCombination('173');
  let result3D1         = getPossibleCombination('303');
  let result3D2         = getPossibleCombination('092');
  let result3D3         = getPossibleCombination('023');
  let result3D4         = getPossibleCombination('400');
  let result3D5         = getPossibleCombination('664');
  let result3D6         = getPossibleCombination('601');
  let result3D7         = getPossibleCombination('433');
  let result3D8         = getPossibleCombination('441');


  if (swertresSearch.length<=0) {
    setSearchPossibilities(possibilities);
  }
  if (swertresData.length > 0 ) {
    DisplayData       = () => <ul className="master" key={Math.random()}>
      {swertresData.map((data, day) => {
        let count         = 0;
        let currentYear   = 2019;
        return data.map((item, ind) => {
          let index1        = (day+1);
          let index2        = (ind+1);
          let getMonth      = displayMonth(index2);
          let DisplayBreak  = BlankElement;

          count++;
          count             = checkCount(count);
          currentYear       = displayYear(index2, currentYear, getMonth, count);
          if (breakIndicator !== index1) {
            breakIndicator = index1;
            DisplayBreak   = BreakElement;
          }
          if (item.trim().length === 0) {
            item = '000';
          }
          const found = swertresSearch.find(el=>item === el);
          const founder = result3Der.find(el=>item===el);
          const found1 = result3D1.find(el=>item===el);
          const found2 = result3D2.find(el=>item===el);
          const found3 = result3D3.find(el=>item===el);
          const found4 = result3D4.find(el=>item===el);
          const found5 = result3D5.find(el=>item===el);
          const found6 = result3D6.find(el=>item===el);
          const found7 = result3D7.find(el=>item===el);
          const found8 = result3D8.find(el=>item===el);
          let foundClassName = '';
          if (found !== undefined) {
            foundClassName = 'found'
          }
          if (founder !== undefined) {
            foundClassName += ' found3'
          }
          if (
            found1 !== undefined ||
            found2 !== undefined ||
            found3 !== undefined ||
            found4 !== undefined ||
            found5 !== undefined ||
            found6 !== undefined ||
            found7 !== undefined ||
            found8 !== undefined
          ) {
            foundClassName += ' found2'
          }
          return (<>
            <DisplayBreak/>
            <li 
              key={day + ind}
              indexing={(index1) + ", " + (index2)} 
              day={(index1)}
              month={getMonth}
              year={currentYear}
              release={countType[count]}
              className={foundClassName}
            >
              {item}
            </li>
          </>)
          // - {getMonth} {(index1)}, {currentYear} - {countType[count]} - [{(index1)}, {index2}] 613 013
        })
      })}
    </ul>
  }

  return (
    <div className="tv">
      <DemoData/>
      <DisplayData/>
    </div>
  );
}