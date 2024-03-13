import React from 'react';

export default function DisplayTable(props) {
  const { 
    countType,
    checkCount,
    swertresData,
    BlankElement,
    swertresSearch,
    getPossibleCombination
  } = props;
  let DisplayData = () => ('');
  //Element functions
  const BreakElement    = () => <li key={`break-`+Math.random()+Math.random()} className="break">&nbsp;</li>;
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
  // break indicator
  let breakIndicator    = 1;
  // for results
  let result3Der        = getPossibleCombination('');
  let result3D1         = getPossibleCombination('');
  let result3D2         = getPossibleCombination('');
  let result3D3         = getPossibleCombination('');
  let result3D4         = getPossibleCombination('');
  let result3D5         = getPossibleCombination('');
  let result3D6         = getPossibleCombination('');
  let result3D7         = getPossibleCombination('');
  let result3D8         = getPossibleCombination('');
  // process displayData
  if (swertresData.length > 0){
    DisplayData       = () => <ul className="master" key={`ULMaster`+Math.random()}>
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
            foundClassName = 'found';
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
            <DisplayBreak key={`displaybreak-${Math.random()}`}/>
            <li 
              key={day +'-'+ ind +'-'+ Math.random()}
              indexing={(index1) + ", " + (index2)} 
              indexing2={`${day} - ${ind}`}
              day={(index1)}
              month={getMonth}
              year={currentYear}
              release={countType[count]}
              className={foundClassName}
            >
              {item}
            </li>
          </>)
        })
      })}
    </ul>;
  }
  return <DisplayData/>
}
