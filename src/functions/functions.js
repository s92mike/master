import {
  maxNum,
  // maxDays,
  // dataIndex,
} from './initialize';

//get all possible combination
export const getPossibleCombination = (num) => {
  if (num.length > 0) {
    const chars = Array.from(num);
    const possibility = [];
    chars.forEach((item, iind) => {
      const tempItem = chars.filter((el, i) => i !== iind);
      tempItem.forEach((val, ind) => {
        let tempVal = tempItem[ind + 1] ?? tempItem[ind - 1];
        let value = `${item}${val}${tempVal}`;
        possibility.push(value);
      });
    });
    return [...new Set(possibility)];
  }
  return [];
};

export const checkLengthDigitKeyCode = ({ l, value, keyCode }) => {
  return (
    value.length + 1 > l &&
    ((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      keyCode === 69)
  );
};

export const checkIndexArray = ({ num, length }) => {
  if (num < 0) {
    num = length;
  } else if (num > length) {
    num = 0;
  }
  return num;
};

export const checkDouble = (num) =>
  Array.from(num).some((item, index) => num.indexOf(item) !== index);

export const countTypeDraw = ["select", "2PM", "5PM", "9PM"];

export const addZero = (number) => {
  let final = number;
  if (number.length < 3){
      final = `0${number}`;
      if (number.length === 1) {
          final = `00${number}`;
      }
      if (number.length === 0) {
          final = ``;
      }
  }
  return final;
}

let count = 1;

// const checkNum = (num, currentData, length) => {
//   if (num.length !== 0 || count === maxNum) {
//     return { num, currentData, length, count };
//   }
//   count++;
//   return checkNum(currentData[length - 1], currentData, length - 1);
// };

// const getListNum = (
//   maxList,
//   allData,
//   content,
//   countList,
//   countType,
//   returnArr = []
// ) => {
//   if (countList > maxList) {
//     return returnArr;
//   }

//   let { currentIndex, listLength } = content;
//   if (allData[currentIndex][listLength] !== '000') { 
//     returnArr.push({
//       value: allData[currentIndex][listLength],
//       contents: getDikit(allData, allData[currentIndex][listLength], []),
//     });
//     countList++;
//   }

//   countType = updateCountType(countType + 1);
//   listLength--;
//   if (countType === 1) {
//     currentIndex = checkIndexArray({
//       num: currentIndex - 1,
//       length: maxDays,
//     });
//     listLength = dTLength;
//     if (allData[currentIndex][listLength].length === 0) {
//       listLength = getCorrectIndex(
//         allData,
//         checkIndexArray({ num: listLength - 1, length: dTLength }),
//         currentIndex
//       );
//     }
//   }

//   content = {
//     ...content,
//     currentIndex,
//     listLength,
//   };

//   return getListNum(maxList, allData, content, countList, countType, returnArr);
// };

// export const getDikitTheoryTwo = ({ num = 9, data }) => {
//   const dataToday = data[dataIndex];
//   const maxData = dataToday.length - 1;

//   let dTLength = maxData;
//   let listLength = dTLength;
//   let currentIndex = dataIndex;
//   let firstNum = ``;
//   let listNum = [];

//   if (dataIndex === 0 && dataToday[dTLength].length === 0) {
//     // do this when it is last day of the month
//     // check if 30 and 29 for `000` or empty
//   }
//   if (dataToday[dTLength].length === 0) {
//     //first number not yet inputed
//     let getNum = checkNum(dataToday[dTLength], dataToday, dTLength);
//     listLength = getNum.length;
//     firstNum = getNum.num;
//     if (firstNum.length === 0) {
//       currentIndex = checkIndexArray({ num: dataIndex - 1, length: maxDays });
//       listLength = dTLength;
//       count = 1;
//     }
//   }
//   if (listNum.length <= 0) {
//     listNum = getListNum(num, data, { currentIndex, listLength }, 1, count);
//   }
// }
