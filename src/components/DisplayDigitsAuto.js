import React, { useState } from "react";
import SingleSearchButton from "./SingleSearchButton";
import MaxListDropDown from "./MaxListDropDown";
import {
  checkIndexArray,
  getPossibleCombination
} from "../functions/functions";

import { Tooltip } from 'react-tooltip';

export default function DisplayDigitAuto({ data }) {
  // return <>Under maintainance!!!</>;
  const [searchText, setSearchText] = useState('');
  const [maxList, setMaxList] = useState(24);
  const today = new Date();
  const currentDay = today.getDate();
  const dataIndex = currentDay - 1;
  const dataToday = data[dataIndex];
  const maxNum = 3;
  const maxDays = 30;
  const maxData = dataToday.length - 1;
  const manualArr = ['884','755','572','797','718','644'];
  let possMA = [];
  manualArr.forEach(item => { possMA = [...possMA, ...getPossibleCombination(item)];});

  const arrangeNum = (num) => {
    num = Array.from(num);
    num.sort((a, b) => b - a);
    if (parseInt(num[0]) !== parseInt(num[1]) + 1) {
      const temp = num[0];
      num.shift();
      num.push(temp)
    }
    return num;
  }

  const checkOverNum = (num, prevNum, top, maxSet, position) => {
    let condition1, condition2, conditionSet, returnCondition1, returnCondition2;
    let returnNum = num;
    if (position > 1){
      if (top) {
        conditionSet = (maxSet + 1);
        condition1 = prevNum > conditionSet - position;
        condition2 = num === 0;
        returnCondition1 = prevNum + position - 1;
        returnCondition2 = -(maxSet);
      } else {
        condition1 = num < position;
        condition1 = num === maxSet;
        returnCondition1 = num + position - 1;
        returnCondition2 = num - position;
      }
      if (condition1 && condition2){
        returnNum = returnCondition1 + returnCondition2
      }
    }
    return returnNum;
  }

  const numberFrom = arrangeNum(searchText);
  let numSetOne     = [];
  let numSetTwo     = [];
  let numSetThree   = [];
  let numPrediction = [];
  let firstSetNum, secondSetNum, thirdSetNum, fifthSetNum, sixthSetNum, seventhSetNum;
  const maxSet = 9;
  numberFrom.forEach((item, ind) => {
    item = parseInt(item);
    switch(ind) {
      case 0:
        firstSetNum   = checkIndexArray({num: item + 1, length: maxSet});
        secondSetNum  = checkOverNum(checkIndexArray({ num: item + 2, length: maxSet }), item, true, maxSet, 2);
        numSetOne     = [...numSetOne, secondSetNum, firstSetNum, item];
        break;
      case 1:          
        firstSetNum   = checkIndexArray({num: item - 1, length: maxSet});
        secondSetNum  = checkOverNum(checkIndexArray({num: item - 2, length: maxSet}), item, false, maxSet, 2);
        numSetOne     = [...numSetOne, item, firstSetNum, secondSetNum];
        break;
      case 2:
        firstSetNum   = checkOverNum(checkIndexArray({num: item - 3, length: maxSet}), item, false, maxSet, 3);
        secondSetNum  = checkOverNum(checkIndexArray({num: item - 2, length: maxSet}), item, false, maxSet, 2);
        thirdSetNum   = checkIndexArray({num: item - 1, length: maxSet});
        fifthSetNum   = checkIndexArray({num: item + 1, length: maxSet});
        sixthSetNum   = checkOverNum(checkIndexArray({num: item + 2, length: maxSet}), item, true, maxSet, 2);
        seventhSetNum = checkOverNum(checkIndexArray({num: item + 3, length: maxSet}), item, true, maxSet, 3);
        numSetTwo     = [...numSetTwo, firstSetNum, secondSetNum, thirdSetNum, item, fifthSetNum, sixthSetNum, seventhSetNum]
        numSetTwo.forEach((item, ind) => {
          numSetTwo.forEach((item2, ind2) => {
            if (ind < ind2) {
              numSetThree = [...numSetThree, item + '' + item2]
            }
          })
        })
        break;
      default:
        break;
    }
  })
  numSetThree.forEach(item => {
    numSetOne.forEach(item2 => {
      numPrediction = [...numPrediction, item2 + '' + item];
    })
  })
  // numPrediction = [];
  const search_this = [];
  numPrediction.forEach((e) => {
    search_this.push(...getPossibleCombination(e));
  })

  let listNum = [];
  let firstNum = ``;
  let count = 1;
  let dTLength = maxData;

  const checkNum = (num, currentData, length) => {
    if (num.length !== 0 || count === maxNum) {
      return { num, currentData, length, count };
    }
    count++;
    return checkNum(currentData[length - 1], currentData, length - 1);
  };

  const updateCountType = (counts) => (counts > maxNum ? 1 : counts);

  const addCheckCount = (index) => {
    if (index > maxNum) {
      index = 1;
    } else if (index < 1) {
      index = maxNum;
    }
    return index;
  };

  const getCorrectIndex = (allData, length, currentIndex) => {
    if (allData[currentIndex][length].length > 0) {
      return length;
    }
    return getCorrectIndex(
      allData,
      checkIndexArray({ num: length - 1, length: dTLength }),
      currentIndex
    );
  };

  const checkZeros = (allData, dayInd, drawOneInd, drawTwoInd, drawThreeInd) => {
    if ( allData[dayInd][drawOneInd] === '000'
    && allData[dayInd][drawTwoInd] === '000'
    && allData[dayInd][drawThreeInd] === '000' ) {
      let tempInd = dayInd;
      dayInd = checkIndexArray({ num: dayInd - 1, length: maxDays });
      if (dayInd === 0 && tempInd === 30) {
        drawOneInd    = checkIndexArray({ num: drawOneInd - 3, length: maxData });
        drawTwoInd    = checkIndexArray({ num: drawTwoInd - 3, length: maxData });
        drawThreeInd  = checkIndexArray({ num: drawThreeInd - 3, length: maxData });
      }
      return checkZeros(allData, dayInd, drawOneInd, drawTwoInd, drawThreeInd);
    }
    return dayInd;
  }

  const checkLengthAndValue = (arr) => (arr.length > 0 && arr !== '000');

  const getFoundDikit = (allData, currentNum, indexing) => {
    const { ind1, ind2, count } = indexing;
    let dayOneInd, dayTwoInd, dayThreeInd, drawOneInd, drawTwoInd, drawThreeInd;
    let flagOne     = true;
    let flagTwo     = true;
    let flagThree   = true;
    let resultArr   = [];
    dayOneInd       = checkIndexArray({ num: ind1 - 1, length: maxDays });
    dayTwoInd       = ind1;
    dayThreeInd     = checkIndexArray({ num: ind1 + 1, length: maxDays });
    switch (count) {
      case 1:
        drawOneInd    = ind2;
        drawTwoInd    = ind2+1;
        drawThreeInd  = ind2+2;
        flagOne       = false;
        break;
      case 2:
        drawOneInd    = ind2-1;
        drawTwoInd    = ind2;
        drawThreeInd  = ind2+1;
        flagTwo       = false;
        break;
      case 3:
        drawOneInd    = ind2-2;
        drawTwoInd    = ind2-1;
        drawThreeInd  = ind2;
        flagThree     = false;
        break;
      default: break;
    }
      
    dayOneInd = checkZeros(allData, dayOneInd, drawOneInd, drawTwoInd, drawThreeInd);

    if (checkLengthAndValue(allData[dayOneInd][drawOneInd])){
      resultArr.push(allData[dayOneInd][drawOneInd]);
    }
    if (checkLengthAndValue(allData[dayOneInd][drawTwoInd])) {
      resultArr.push(allData[dayOneInd][drawTwoInd]);
    }
    if (checkLengthAndValue(allData[dayOneInd][drawThreeInd])) {
      resultArr.push(allData[dayOneInd][drawThreeInd]);
    }

    if (flagOne && checkLengthAndValue(allData[dayTwoInd][drawOneInd])) {
      resultArr.push(allData[dayTwoInd][drawOneInd]);
    }
    if (flagTwo && checkLengthAndValue(allData[dayTwoInd][drawTwoInd])) {
      resultArr.push(allData[dayTwoInd][drawTwoInd]);
    }
    if (flagThree && checkLengthAndValue(allData[dayTwoInd][drawThreeInd])) {
      resultArr.push(allData[dayTwoInd][drawThreeInd]);
    }

    if (checkLengthAndValue(allData[dayThreeInd][drawOneInd])) {
      resultArr.push(allData[dayThreeInd][drawOneInd]);
    }
    if (checkLengthAndValue(allData[dayThreeInd][drawTwoInd])){
      resultArr.push(allData[dayThreeInd][drawTwoInd]);
    }
    if (checkLengthAndValue(allData[dayThreeInd][drawThreeInd])) {
      resultArr.push(allData[dayThreeInd][drawThreeInd]);
    }

    resultArr.sort((a,b)=>(a < b ? 1 : -1));
    
    return {
      indexing,
      value: currentNum,
      resultArr
    };
  };

  const getDikit = (
    allData,
    num,
    returnArr = []
  ) => {
    count = 1;
    const poss = getPossibleCombination(num);
    const tempArr = []; // for tracking data
    allData.forEach((itemArr, ind1) => {
      itemArr.forEach((itemVal, ind2) => {
        const found = poss.find((el) => el === itemVal);
        const indexing = { ind1, ind2, count };
        if( found !== undefined && num !== '000' ) {
          const resultObj = getFoundDikit(allData, itemVal, indexing);
          returnArr = [...returnArr, ...resultObj.resultArr]
          tempArr.push(resultObj); // for tracking data
        }
        count = addCheckCount(count + 1)
      });
    });
    const reducedCount = returnArr.reduce((acc, cur) => {
      if (cur in acc) {
        acc[cur]++;
      } else {
        acc[cur] = 1;
      }
      return acc;
    }, {});

    const sorted = Object.entries(reducedCount).sort((a, b) => (a[1] > b[1] ? 1 : -1));
    return sorted;
  };

  const getListNum = (
    allData,
    content,
    countList,
    countType,
    returnArr = []
  ) => {
    if (countList > maxList) {
      return returnArr;
    }

    let { currentIndex, listLength } = content;
    returnArr.push({
      value: allData[currentIndex][listLength],
      contents: getDikit(allData, allData[currentIndex][listLength], []),
    });
    countList++;

    countType = updateCountType(countType + 1);
    listLength--;
    if (countType === 1) {
      currentIndex = checkIndexArray({
        num: currentIndex - 1,
        length: maxDays,
      });
      listLength = dTLength;
      if (allData[currentIndex][listLength].length === 0) {
        listLength = getCorrectIndex(
          allData,
          checkIndexArray({ num: listLength - 1, length: dTLength }),
          currentIndex
        );
      }
    }

    content = {
      ...content,
      currentIndex,
      listLength,
    };

    return getListNum(allData, content, countList, countType, returnArr);
  };

  if (dataIndex === 0 && dataToday[dTLength].length === 0) {
    // do this when it is last day of the month
    // check if 30 and 29 for `000` or empty
  }

  let currentIndex = dataIndex;
  let listLength = dTLength;
  if (dataToday[dTLength].length === 0) {
    //first number not yet inputed
    let getNum = checkNum(dataToday[dTLength], dataToday, dTLength);
    listLength = getNum.length;
    firstNum = getNum.num;
    if (firstNum.length === 0) {
      currentIndex = checkIndexArray({ num: dataIndex - 1, length: maxDays });
      listLength = dTLength;
      count = 1;
    }
  }
  if (listNum.length <= 0) {
    listNum = getListNum(data, { currentIndex, listLength }, 1, count);
  }
  let finalArr = [];
  let temp = [];
  let temp2 = [];
  let temp3 = [];
  listNum.forEach((item, ind)=>{
    finalArr[ind] = [];
    temp3 = [...temp3, ...getPossibleCombination(item.value)];
    item.contents.forEach((item2) => {
      const poss = getPossibleCombination(item2[0]);
      let save = true;
      finalArr[ind].forEach((item3, ind3) => {
        const found = poss.find((el) => el === item3[0]);
        if (found !== undefined) {
          save = false;
          finalArr[ind][ind3][1] = finalArr[ind][ind3][1] + item2[1];
        }
      })
      if (save) {
        finalArr[ind].push([...item2, item.value]);
      }
    })
  })
  finalArr.forEach((item) => {
    item.sort((a, b) => b[2] - a[2]);
    item.forEach((item2) => {
      temp.push(item2);
    })
  })
  temp.forEach((itemTemp) => {
    const poss = getPossibleCombination(itemTemp[0]);
    let save = true;
    temp2.forEach((itemTemp3, ind3) => {
      const found = poss.find((el) => el === itemTemp3[0]);
      if (found !== undefined) {
        save = false;
        temp2[ind3] = [
          ...itemTemp3.slice(0,1),
          itemTemp3[1]+itemTemp[1],
          ...itemTemp3.slice(2),
          itemTemp[2]
        ];
      }
    })
    if (save) {
      temp2.push(itemTemp);
    }
  })
  temp2.sort((a, b) => b[1] - a[1]);

  function changeSearch(num) {
    setSearchText(num)
  }

  function updateMaxList(num) {
    setMaxList(num);
  }
  return (
    <>
      <p>
        <b>Latest Result from Left to Right</b>
      </p>
      <ul className="master theory-1">
        {listNum.map((item, ind) => (
          <li className="guide" key={`theory-` + ind}>
            {item.value}
          </li>
        ))}
      </ul>
      <MaxListDropDown onChange={updateMaxList.bind(this)} />
      <SingleSearchButton onSearch={changeSearch.bind(this)}/>
      <ul className="everything">
        {temp2.map((item, ind) => (
          <li 
            key={`item-v1-` + ind}
            className={(getPossibleCombination(searchText).find((el) => el === item[0]) !== undefined ? 'found main' : search_this.find(el => el === item[0]) ? 'found' : manualArr.find(el => el === item[0]) ? 'poss' : '') + (temp3.find((el) => el === item[0]) !== undefined ? ' exclude' : '')} 
          >
            <button 
              key={`button-draw-` + ind}
              data-tooltip-id={`draw-` + ind}
              data-tooltip-content={[...item].splice(2).join(`, `)} 
              data-tooltip-place="top">
              {item.map((item2, ind2) => {
                const Bold    = () => (1 === ind2 ? <b>{item2}</b> : (2 > ind2) ? <>{item2}</> : <></>);
                const dash    = (1 === ind2 ? `-` : ``);
                return <>{dash}<Bold/></>;
              })}
              {`(` + ([...item].splice(2).length) + `)`}
            </button>
            <Tooltip id={`draw-` + ind} />
          </li>
        ))}
      </ul>
      <div className="theory-container">
        {listNum.map((item, ind) => (
          <div className='theory' key={`display-theory-` + ind}>
            <p><b>{item.value}</b></p>
            <ul className='first'>
              {finalArr[ind].map((item2, ind2) => (
                <li 
                  className={(getPossibleCombination(searchText).find((el) => el === item2[0]) !== undefined ? 'found main' : search_this.find(el => el === item2[0]) ? 'found' : '')} 
                  key={`item-v1-`+ind2}>{item2[0]} - {item2[1]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
