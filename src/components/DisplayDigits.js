import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import DisplayTable from "./DisplayTable";
import { getPossibleCombination, checkDouble, countTypeDraw } from "../functions/functions";

export default function DisplayDigits(props) {
  const [data, setData]                               = useState([]);
  const [searchPossibilities, setSearchPossibilities] = useState([]);
  const [searchData, setSearchData]                   = useState(props.searchText);

  useEffect(()=>{
    if (searchData !== props.searchText && searchData.length > 0) {
      setSearchData(props.searchText);
      setSearchPossibilities([]);
    }
    if (data.length > 0 && props.data <= 0) {
      props.updateData(data);
    }

  }, [props, searchData, data]);
  
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
  const BlankElement    = () => ('');
  const DemoData        = ({ searchPossibilities }) => {
    return searchPossibilities.map((item)=><li className="guide" key={`DemoData`+item+Math.random()}>{item}</li>)
  };

  const checkDigit = (pday, cind, resData, operation=-1) => {
    // return resData[pday][cind];
    if (resData[pday][cind] !== '000') {
      return resData[pday][cind];
    }
    let currentDay = pday+operation;
    if (currentDay > 30) {
      currentDay = 1;
    }
    return checkDigit(currentDay, cind, resData, operation);
  }
  //counter 1 to 3
  const checkCount      = (num) => (num > 3 ? 1 : num); 
  // check if the number is blank but set if it is part of the latest outcome
  const latestSection = (threeDigit) => {
    if (threeDigit === undefined || threeDigit.length === 0) {
      return 'N/A';
    }
    return threeDigit;
  }
  //Initialization of variables
  const swertresData    = Array.from(data);
  const swertresSearch  = Array.from(searchPossibilities);
  let DisplayData       = BlankElement;
  let possibilities     = getPossibleCombination(searchData);
  let resultSearch      = props.resultText.map((propsItem)=>{
    return getPossibleCombination(propsItem);
  });
  getPossibleCombination(props.resultText);

  let DisplayGroup    = searchData.length <=0 ? BlankElement : Loading;
  let searchDataGroup = [], searchObj;

  if (swertresSearch.length<=0) {
    setSearchPossibilities(possibilities);
  }
  if (swertresData.length > 0 ) {
    swertresData.map((data, day) => {
      DisplayGroup  = BlankElement;
      let count     = 0;
      return data.map((item, ind) => {
        count++;
        count             = checkCount(count);
        if (item.trim().length === 0) {
          item = '000';
        }
        const found = swertresSearch.find(el=>item === el);
        if (found !== undefined) {
          let colInd1, colInd2, colInd3, indCounter = 3;
          switch(countTypeDraw[count]){
            case '2PM':
              colInd1 = ind;
              colInd2 = ind+1;
              colInd3 = ind+2;
              break;
            case '5PM':
              colInd1 = ind-1;
              colInd2 = ind;
              colInd3 = ind+1;
              break;
            case '9PM':
              colInd1 = ind-2;
              colInd2 = ind-1;
              colInd3 = ind;
              break;
            default:
              break;
          }
          const checkDays       = (day-1) >= 0;
          const checkLowerDays  = (day+1) < swertresData.length;
          const checkColIndex1  = colInd1 >= 0 && colInd1 < data.length;
          const checkColIndex2  = colInd2 >= 0 && colInd2 < data.length;
          const checkColIndex3  = colInd3 >= 0 && colInd3 < data.length;
          let days1             = 'ERR';
          let days2             = 'ERR';
          let days3             = 'ERR';
          let days4             = 'ERR';
          let days5             = 'ERR';
          let days6             = 'ERR';
          let days7             = 'ERR';
          let days8             = 'ERR';
          let days9             = 'ERR';
          if (checkDays) {
            if (checkColIndex1) days1 = swertresData[day-1][colInd1] ?? 'ERR';
            if (checkColIndex2) days2 = swertresData[day-1][colInd2] ?? 'ERR';
            if (checkColIndex3) days3 = swertresData[day-1][colInd3] ?? 'ERR';
          } else {
            if (searchData !== '000'){
              let prevDay = 30;
              days1 = checkDigit(prevDay, colInd1-indCounter, swertresData);
              days2 = checkDigit(prevDay, colInd2-indCounter, swertresData);
              days3 = checkDigit(prevDay, colInd3-indCounter, swertresData);
            }
          }
          if (checkLowerDays) {
            if (checkColIndex1) days7 = swertresData[day+1][colInd1] ?? 'ERR';
            if (checkColIndex2) days8 = swertresData[day+1][colInd2] ?? 'ERR';
            if (checkColIndex3) days9 = swertresData[day+1][colInd3] ?? 'ERR';
            if (searchData !== '000') {
                if (days7 === '000' && days8 === '000' && days9 === '000') {
                    let nextDay         = day+2;
                    let colIndCounter1  = colInd1;
                    let colIndCounter2  = colInd2;
                    let colIndCounter3  = colInd3;
                    if (day+1 === 30) {
                        nextDay = 0;
                        colIndCounter1 = colInd1+indCounter;
                        colIndCounter2 = colInd2+indCounter;
                        colIndCounter3 = colInd3+indCounter;
                    }
                    days7 = checkDigit(nextDay, colIndCounter1, swertresData, 1);
                    days8 = checkDigit(nextDay, colIndCounter2, swertresData, 1);
                    days9 = checkDigit(nextDay, colIndCounter3, swertresData, 1);                
                }
            }
          } else  {
            if (searchData !== '000') {
                let nextDay = 0;
                let colIndCounter1  = colInd1;
                let colIndCounter2  = colInd2;
                let colIndCounter3  = colInd3;
                colIndCounter1 = colInd1+indCounter;
                colIndCounter2 = colInd2+indCounter;
                colIndCounter3 = colInd3+indCounter;
                days7 = checkDigit(nextDay, colIndCounter1, swertresData, 1);
                days8 = checkDigit(nextDay, colIndCounter2, swertresData, 1);
                days9 = checkDigit(nextDay, colIndCounter3, swertresData, 1);
            }
          }
          if (checkColIndex1) {
            days4 = swertresData[day][colInd1] ?? 'ERR';
          }
          if (checkColIndex2) {
            days5 = swertresData[day][colInd2] ?? 'ERR';
          }
          if (checkColIndex3) {
            days6 = swertresData[day][colInd3] ?? 'ERR';
          }
          days1 = latestSection(days1);
          days2 = latestSection(days2);
          days3 = latestSection(days3);
          days4 = latestSection(days4);
          days5 = latestSection(days5);
          days6 = latestSection(days6);
          days7 = latestSection(days7);
          days8 = latestSection(days8);
          days9 = latestSection(days9);
          searchObj = {
            result: item,
            group: [days1, days2, days3, days4, days5, days6, days7, days8, days9]
          };
          searchDataGroup.push(searchObj);
        }
        return item;
      })
    });
  }
  if (searchDataGroup.length > 0 && searchData !== '000' && searchData.length > 0) {
    DisplayGroup = ()=>(<>{searchDataGroup.map((result)=>(<ul className="Group" key={`Group`+Math.random()}>
      {result.group.map((res)=>{
        let found       = '';
        let doubleFound = checkDouble(res) ? ` double` : ``;
        const foundresult = resultSearch.find(el=>el.includes(res));
        if (res === result.result) {
          found = 'found';
        }
        if (foundresult !== undefined) {
          found += ' found3'
        }
        found += doubleFound;
        return (<li key={`GroupLI`+res+Math.random()} className={found}>{res}</li>)
      })}
    </ul>))}</>);
  }
  if (false) {
    DisplayData = () => (<div className="tv" key="tv-123">
    <DisplayTable
      countType={countTypeDraw}
      checkCount={checkCount}
      swertresData={swertresData}
      BlankElement={BlankElement}
      swertresSearch={swertresSearch}
      getPossibleCombination={getPossibleCombination}
    />
</div>);
  }
  return (<>
    <div key="group-123" className="display-group result">
      <ul className="master">
        <DemoData searchPossibilities={searchPossibilities}/>
      </ul>
    </div>
    <div key="group-124" className="display-group">
      <DisplayGroup/>
    </div>
    <DisplayData/>
  </>);
}
