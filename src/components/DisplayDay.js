import React from 'react';
import { getPossibleCombination } from "../functions/functions";

export default function DisplayDay({ day, data, daySearch }) {
    const recurringData         = ({ dataArray = [], dAIndex = 0 }) => {
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
    const checkDay          = (currentDay) => {
        return currentDay > 30 ? 0 : currentDay < 0 ? 30 : currentDay;
    }
    const checkDisplayDay   = (currentDay) => {
        let current = ``;
        let next    = ``;
        let prev    = ``;
        let result  = { next, current, prev };
        if (currentDay >= 0) {
            result = {
                next: checkDay(currentDay+1)+1,
                current: checkDay(currentDay)+1,
                prev: checkDay(currentDay-1)+1
            }
        }
        return result;
    }
    const currentDay        = parseInt(day)-1;
    const nextDay           = checkDay(currentDay+1);
    const prevDay           = checkDay(currentDay-1);
    const displayDay        = checkDisplayDay(currentDay);
    let found               = [];
    let foundNext           = [];
    let foundPrev           = [];
    if (day.length > 0 && currentDay >= 0 ){
        const searchDayData     = data[currentDay] ?? [];
        const searchDayDataNext = data[nextDay] ?? [];
        const searchDayDataPrev = data[prevDay] ?? [];
        let searchPossibilities = [];
        if (searchDayData.length > 0) {
            if (daySearch.length > 0) {
                searchPossibilities = getPossibleCombination(daySearch);
            }
            const processData           = (tempDayData) => {
                const found     = [];
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
                        if (num !== `000` && num !== ``){
                            const checkSearchPoss   = searchPossibilities.find(el=>el===num);
                            let className           = checkSearchPoss !== undefined ? `found` : ``;
                            if (count === 0) { count = 1; }
                            found.push({ count, value: num, className });
                        }
                        return num;
                    });
                }
                return found;
            }

            let tempDayData             = [];
            let tempDayNext             = [];
            let tempDayPrev             = [];

            const tempDayData2      = Array.from([...new Set(searchDayData)]);
            const tempDayData2Next  = Array.from([...new Set(searchDayDataNext)]);
            const tempDayData2Prev  = Array.from([...new Set(searchDayDataPrev)]);

            tempDayData2.sort((a,b)=>(a < b ? 1 : -1));
            tempDayData2Next.sort((a,b)=>(a < b ? 1 : -1));
            tempDayData2Prev.sort((a,b)=>(a < b ? 1 : -1));

            tempDayData             = recurringData({ dataArray: tempDayData2 });
            tempDayNext             = recurringData({ dataArray: tempDayData2Next });
            tempDayPrev             = recurringData({ dataArray: tempDayData2Prev });

            found                   = processData(tempDayData);
            foundNext               = processData(tempDayNext);
            foundPrev               = processData(tempDayPrev);
        }

        found.sort((a,b)=>(a.value < b.value ? 1 : -1));
        foundNext.sort((a,b)=>(a.value < b.value ? 1 : -1));
        foundPrev.sort((a,b)=>(a.value < b.value ? 1 : -1));
    }
    return (<div className='container-days'>
        <ul className='days'>
            <li key="day-prev-list">{displayDay.prev}</li>
            {foundPrev.map((item)=>(<li className={item.className} key={item.value+'-'+Math.random}>{item.value}-{item.count}</li>))}
        </ul>
        <ul className='days'>
            <li key="day-curr-list">{displayDay.current}</li>
            {found.map((item)=>(<li className={item.className} key={item.value+'-'+Math.random}>{item.value}-{item.count}</li>))}
        </ul>
        <ul className='days'>
            <li key="day-next-list">{displayDay.next}</li>
            {foundNext.map((item)=>(<li className={item.className} key={item.value+'-'+Math.random}>{item.value}-{item.count}</li>))}
        </ul>
    </div>);
}