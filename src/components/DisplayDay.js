import React from 'react';
import { getPossibleCombination } from "../functions/functions";

export default function DisplayDay({ day, data }) {
    const currentDay= parseInt(day) - 1;
    const found     = [];
    let countTemp   = 0;
    if (day.length > 0 && currentDay >= 0 ){
        const searchDayData = data[currentDay] ?? [];
        if (searchDayData.length > 0) {
            //remove duplicate entry
            let tempDayData = [];
            const tempDayData2 = Array.from([...new Set(searchDayData)]);
            const recurringData = ({ dataArray = [], dAIndex = 0 }) => {
                const tempArray = [...dataArray];
                if (dataArray[dAIndex] === undefined) {
                    return dataArray;
                }
                let poss = getPossibleCombination(dataArray[dAIndex]);
                let searchCount = 0;
                dataArray.forEach((item, ind)=>{
                    let searchPoss = poss.find(el=>el===item);
                    if(ind !== dAIndex) {
                        if (searchPoss !== undefined){
                            tempArray.splice(ind+searchCount, 1);
                            searchCount++;
                        }
                    }
                });
                dAIndex++;
                return recurringData({ dataArray: tempArray, dAIndex });
            };
            tempDayData2.sort((a,b)=>(a < b ? 1 : -1));
            tempDayData = recurringData({ dataArray: tempDayData2 });
            if (tempDayData !== undefined && tempDayData.length > 0){
                tempDayData.map((num)=>{
                    const possibilities = getPossibleCombination(num);
                    let count           = 0;
                    searchDayData.map((num2) => {
                        const checkPossibilities = possibilities.find(el=>el===num2)
                        if (checkPossibilities !== undefined) {
                            count++;
                        }
                        return num2;
                    });
                    countTemp+=count;
                    found.push({ count, value: num });
                    return num;
                });
            }
        }
        found.sort((a,b)=>(a.count < b.count ? 1 : -1));
    }
    console.log(countTemp);
    return (<ul className='days'>
        {found.map((item)=>(<li key={item.value+'-'+Math.random}>{item.value}-{item.count}</li>))}
    </ul>);
}