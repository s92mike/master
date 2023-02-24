import React from "react";
import {
  checkIndexArray,
  getPossibleCombination
} from "../functions/functions";

export default function DisplayDigitAuto({ data }) {
  const today = new Date();
  const currentDay = today.getDate();
  const dataIndex = currentDay - 1;
  const dataToday = data[dataIndex];
  const maxNum = 3;
  const maxList = 10;
  const maxDays = 30;
  const maxData = dataToday.length - 1;

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

    const sorted = Object.entries(reducedCount)
      .sort((a, b) => (a[1] > b[1] ? 1 : -1));
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
  // let classNameArr = [];
  let finalArr = [];
  let temp = [];
  let temp2 = [];
  listNum.forEach((item, ind)=>{
    finalArr[ind] = [];
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
  finalArr.forEach((item, ind) => {
    // classNameArr[ind] = [];
    item.sort((a, b) => b[1] - a[1]);
    item.forEach((item2) => {
      temp.push(item2);
      // classNameArr[ind][ind2] = ``;
      // finalArr.forEach((item3, ind3) => {
      //   if (ind !== ind3) {
      //     item3.forEach((item4) => {
      //       const poss = getPossibleCombination(item2[0]);
      //       const found = poss.find((el) => el === item4[0]);
      //       if (found !== undefined){
      //         classNameArr[ind][ind2] = `found`;
      //       }
      //     })
      //   }
      // })
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
      <ul className="everything">
        {temp2.map((item, ind) => (
          <li key={`item-v1-` + ind}>
            {item.map((item2, ind2) => {
              const Bold    = () => (1 === ind2 ? <b>{item2}</b> : <>{item2}</>);
              const dash    = (1 === ind2 ? `-` : ``);
              const openP   = (2 === ind2 ? ` ( ` : ``);
              const closeP  = (item.length - 1 === ind2 ? ` )` : ``);
              const camma   = (2 < ind2 ? `, ` : ``);
              return <>{dash + openP + camma}<Bold/>{closeP}</>;
            })}
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
                  // className={classNameArr[ind][ind2]} 
                  key={`item-v1-`+ind2}>{item2[0]} - {item2[1]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
