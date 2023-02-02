import React from 'react';
import { checkIndexArray } from "../functions/functions";

export default function DisplayDigitAuto({ data }) {
    const today = new Date();
    const currentDay = today.getDate();
    const dataIndex = currentDay-1;
    const typeIndex = data.length-1;
    const dataIndexPrev = checkIndexArray(dataIndex-1);


    console.log(currentDay, data[dataIndex], `today`);
    return (<>
        Coming Soon !
    </>);
}