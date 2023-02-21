import React from "react";
import {
  checkIndexArray,
  getPossibleCombination,
  countTypeDraw,
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

  const getFoundDikit = (allData, currentNum, indexing) => {
    return {
      value: currentNum,
      indexing,
    };
  };

  const getDikit = (
    allData,
    num,
    returnArr = [],
    indexing = { ind1: 0, ind2: 0, count: 1 }
  ) => {
    if (indexing.ind1 > maxDays && indexing.ind2 > maxData) {
      return returnArr;
    }
    const poss = getPossibleCombination(num);
    const currentNum = allData[indexing.ind1][indexing.ind2];
    const found = poss.find((el) => el === currentNum);
    if (found !== undefined && num !== `000`) {
      returnArr.push(getFoundDikit(allData, currentNum, indexing));
    }
    let tempInd2 = indexing.ind2 + 1;
    let tempInd1 = indexing.ind1;
    if (tempInd2 > maxData) {
      tempInd2 = 0;
      tempInd1++;
      if (tempInd1 > maxDays) {
        tempInd2 = indexing.ind2 + 1;
      }
    }

    indexing = {
      ...indexing,
      ind1: tempInd1,
      ind2: tempInd2,
      count: addCheckCount(indexing.count + 1),
    };
    return getDikit(allData, num, returnArr, indexing);
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
      // content: { currentIndex, listLength, countType },
      contents: getDikit(allData, allData[currentIndex][listLength], [], {
        ind1: currentIndex,
        ind2: listLength,
        count: countType,
      }),
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
  console.log(listNum, `final`);
  return (
    <>
      <h2>Theory One Coming Soon!!!</h2>
      <p>
        <b>Latest Result from Right to Left</b>
      </p>
      <ul className="master theory-1">
        {listNum.map((item, ind) => (
          <li className="guide" key={`theory-` + ind}>
            {item.value}
          </li>
        ))}
      </ul>
    </>
  );
}
