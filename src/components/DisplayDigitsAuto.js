import React from 'react';

export default function DisplayDigitAuto({ data }) {
    const today = new Date();
    const currentDay = today.getDate();
    const dataIndex = currentDay-1;
    console.log(currentDay, data[dataIndex], `today`);
    return (<>
        Coming Soon !
    </>);
}