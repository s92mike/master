//get all possible combination
const getPossibleCombination = (num) => {
  const chars = Array.from(num);
  const possibility = [];
  chars.map((item, iind) => {
    const tempItem = chars.filter((el, i) => i !== iind);
    tempItem.map((val, ind) => {
      let tempVal = tempItem[ind + 1] ?? tempItem[ind - 1];
      let value = `${item}${val}${tempVal}`;
      possibility.push(value);
      return val;
    });
    return item;
  });
  return [...new Set(possibility)];
};

const checkLengthDigitKeyCode = ({ l, value, keyCode }) => {
  return (
    value.length + 1 > l &&
    ((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      keyCode === 69)
  );
};

const checkIndexArray = ({ num, length }) => {
  if (num < 0) {
    num = length;
  }
  return num;
};

export { getPossibleCombination, checkLengthDigitKeyCode, checkIndexArray };
