import React from 'react';
import { getPossibleCombination } from "../functions/functions";

export default function DisplayDay({ day, data }) {
    const currentDay = parseInt(day) - 1;
    if (day.length > 0 && currentDay >= 0 ){
        const searchDayData = data[currentDay] ?? [];
        const found         = [];
        if (searchDayData.length > 0) {
            //remove duplicate entry
            const tempDayData = [...new Set(searchDayData)];
            console.log(tempDayData, 'tempDayData');
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
                found.push({ count, value: num });
                return num;
            });
        }
        found.sort((a,b)=>(a.count < b.count ? 1 : -1));
        console.log(data, `found`);
    }
    return (<div>display here</div>);
}