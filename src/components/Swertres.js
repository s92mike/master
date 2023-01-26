import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function Swertres(props) {
  const [data, setData]                               = useState([]);
  const [searchPossibilities, setSearchPossibilities] = useState([]);
  const [searchData, setSearchData]                   = useState(props.searchText);

  useEffect(()=>{
    if (searchData !== props.searchText) {
      setSearchData(props.searchText);
      setSearchPossibilities([]);
      setData([]);
    }
  }, [props.searchText, searchData]);
  
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
  const BreakElement    = () => <li key={`break-`+Math.random()+Math.random()} className="break">&nbsp;</li>;
  const BlankElement    = () => ('');
  const DemoData        = () => {
    return searchPossibilities.map((item)=><li className="guide" key={`DemoData`+item+Math.random()}>{item}</li>)
  };

  const checkDigit = (pday, cind, resData, operation=-1) => {
    // return resData[pday][cind];
    if (resData[pday][cind] !== '000') {
      return resData[pday][cind];
    }
    return checkDigit(pday+operation, cind, resData, operation);
  }

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
  let DisplayData       = BlankElement;
  let breakIndicator    = 1;
  let possibilities     = getPossibleCombination(searchData);
  let result3Der        = getPossibleCombination('');
  let result3D1         = getPossibleCombination('');
  let result3D2         = getPossibleCombination('');
  let result3D3         = getPossibleCombination('');
  let result3D4         = getPossibleCombination('');
  let result3D5         = getPossibleCombination('');
  let result3D6         = getPossibleCombination('');
  let result3D7         = getPossibleCombination('');
  let result3D8         = getPossibleCombination('');

  let DisplayGroup = BlankElement;
  let searchDataGroup = [], searchObj;

  if (swertresSearch.length<=0) {
    setSearchPossibilities(possibilities);
  }
  if (swertresData.length > 0 ) {
    swertresData.map((data, day) => {
      let count         = 0;
      return data.map((item, ind) => {
        count++;
        count             = checkCount(count);
        if (item.trim().length === 0) {
          item = '000';
        }
        const found = swertresSearch.find(el=>item === el);
        if (found !== undefined) {
          let colInd1, colInd2, colInd3, indCounter = 3;
          switch(countType[count]){
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
                days7 = checkDigit(nextDay, colInd1+indCounter, swertresData, 1);
                days8 = checkDigit(nextDay, colInd2+indCounter, swertresData, 1);
                days9 = checkDigit(nextDay, colInd3+indCounter, swertresData, 1);
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
          searchObj = {
            result: item,
            group: [days1, days2, days3, days4, days5, days6, days7, days8, days9]
          };
          searchDataGroup.push(searchObj);
        }
        return item;
      })
    });
    if (searchData !== '000') {
        DisplayGroup = Loading;
    }
    // DisplayData       = () => <ul className="master" key={`ULMaster`+Math.random()}>
    //   {swertresData.map((data, day) => {
    //     let count         = 0;
    //     let currentYear   = 2019;
    //     return data.map((item, ind) => {
    //       let index1        = (day+1);
    //       let index2        = (ind+1);
    //       let getMonth      = displayMonth(index2);
    //       let DisplayBreak  = BlankElement;

    //       count++;
    //       count             = checkCount(count);
    //       currentYear       = displayYear(index2, currentYear, getMonth, count);

    //       if (breakIndicator !== index1) {
    //         breakIndicator = index1;
    //         DisplayBreak   = BreakElement;
    //       }
    //       if (item.trim().length === 0) {
    //         item = '000';
    //       }
    //       const found = swertresSearch.find(el=>item === el);
    //       const founder = result3Der.find(el=>item===el);
    //       const found1 = result3D1.find(el=>item===el);
    //       const found2 = result3D2.find(el=>item===el);
    //       const found3 = result3D3.find(el=>item===el);
    //       const found4 = result3D4.find(el=>item===el);
    //       const found5 = result3D5.find(el=>item===el);
    //       const found6 = result3D6.find(el=>item===el);
    //       const found7 = result3D7.find(el=>item===el);
    //       const found8 = result3D8.find(el=>item===el);
    //       let foundClassName = '';
    //       if (found !== undefined) {
    //         foundClassName = 'found';
    //       }
    //       if (founder !== undefined) {
    //         foundClassName += ' found3'
    //       }
    //       if (
    //         found1 !== undefined ||
    //         found2 !== undefined ||
    //         found3 !== undefined ||
    //         found4 !== undefined ||
    //         found5 !== undefined ||
    //         found6 !== undefined ||
    //         found7 !== undefined ||
    //         found8 !== undefined
    //       ) {
    //         foundClassName += ' found2'
    //       }
    //       return (<>
    //         <DisplayBreak key={`displaybreak-${Math.random()}`}/>
    //         <li 
    //           key={day +'-'+ ind +'-'+ Math.random()}
    //           indexing={(index1) + ", " + (index2)} 
    //           indexing2={`${day} - ${ind}`}
    //           day={(index1)}
    //           month={getMonth}
    //           year={currentYear}
    //           release={countType[count]}
    //           className={foundClassName}
    //         >
    //           {item}
    //         </li>
    //       </>)
    //     })
    //   })}
    // </ul>;
  }

  if (searchDataGroup.length > 0 && searchData !== '000') {
    DisplayGroup = ()=>(<>{searchDataGroup.map((result)=>(<ul className="Group" key={`Group`+Math.random()}>
      {result.group.map((res)=>{
        let found = '';
        if (res === result.result) {
          found = 'found';
        }
        return (<li key={`GroupLI`+res+Math.random()} className={found}>{res}</li>)
      })}
    </ul>))}</>);
  } 
  return (<>
    <div key="group-123" className="display-group result">
      <ul className="master">
        <DemoData/>
      </ul>
    </div>
    <div key="group-124" className="display-group">
      <DisplayGroup/>
    </div>
    <div className="tv" key="tv-123">
      <DisplayData/>
    </div>
  </>);
}