import React from 'react';
import { checkIndexArray } from "../functions/functions";

export default function DisplayDigitAuto({ data }) {
    const today = new Date();
    const currentDay    = today.getDate();
    const dataIndex     = currentDay-1;
    const dataToday     = data[dataIndex];
    const maxNum        = 3;
    const maxList       = 10;
    
    let listNum         = [];
    let firstNum        = ``;
    let count           = 1;
    let dTLength        = dataToday.length-1;
    
    const checkNum      = (num, currentData, length) => {
        if (num.length !== 0 || count === maxNum) {
            return { num, currentData, length, count };
        }
        count++;
        return checkNum(currentData[length-1], currentData, length-1);
    }

    const updateCountType = (counts) => counts > maxNum ? 1 : counts;

    const getCorrectIndex = (allData, length, currentIndex) => {
        if (allData[currentIndex][length].length > 0) {
            return length;
        }
        return getCorrectIndex(allData, checkIndexArray({ num: length-1, length: dTLength }), currentIndex);
    }

    const getListNum = (allData, content, countList, countType, returnArr = []) => {
        let { currentIndex, listLength } = content;

        returnArr.push(allData[currentIndex][listLength]);
        countList++;

        if (countList > maxList) {
            return returnArr;
        }

        countType = updateCountType(countType+1);
        listLength--;
        if (countType === 1) {
            currentIndex    = checkIndexArray({ num: currentIndex-1, length: 30 });
            listLength      = dTLength;
            if (allData[currentIndex][listLength].length === 0) {
                listLength = getCorrectIndex(allData, checkIndexArray({ num: listLength-1, length: dTLength }), currentIndex);
            }
        }

        content = {
            ...content,
            currentIndex,
            listLength
        };

        return getListNum( allData, content, countList, countType, returnArr );
    }

    if (dataIndex === 0 && dataToday[dTLength].length === 0) {
        // do this when it is last day of the month
        // check if 30 and 29 for `000` or empty
    }

    if ( dataToday[dTLength].length === 0 ) {
        //first number not yet inputed
        let currentIndex    = dataIndex;
        let getNum          = checkNum(dataToday[dTLength], dataToday, dTLength);
        let listLength      = getNum.length;
        firstNum            = getNum.num;

        if (firstNum.length === 0) {
            currentIndex    = checkIndexArray({ num: dataIndex-1, length: 30 });
            listLength      = dTLength;
            count           = 1;
        }

        listNum = getListNum(data, { currentIndex, listLength }, 1, count);
    }

    /**
     * number will inter three times a day
     * current day check if first, 2nd, and third
     * 
     * if first time get yesterday nine numbers
     * if second get yesterday nine numbers plus first
     * if third get nine number plus first and second
     * 
     */

    console.log(dataIndex, listNum, data, `today`);
    return (<>
        <h2>Latest Result from Right to Left</h2>
        <ul className="master theory-1">
            {listNum.map((item,ind)=>(<li className='guide' key={`theory-`+ind}>{item}</li>))}
        </ul>
        <div>Theory One Coming Soon!!!</div>
    </>);
}