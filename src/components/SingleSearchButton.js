import React, { useState } from "react";
import { checkLengthDigitKeyCode, addZero } from "../functions/functions";

export default function SingleSearchButton(props) {
    const [searchText, setSearchText] = useState('');
    const { onSearch } = props;
    function checkDigitChangeSearch (item) {
        setSearchText(item.target.value);
    }
    function checkDigit (item) {
        const number = item.target.value;
        if (checkLengthDigitKeyCode({ l: 3, value: item.target.value, keyCode: item.keyCode })) {
            item.preventDefault();
        }
        if (item.keyCode === 13) {
            let final = addZero(number);
            onSearch(final);
        }
    }
    return (
        <div className="inputers">
            <input name="search" type="number" min="0" max="999" onChange={checkDigitChangeSearch.bind(this)} onKeyDown={checkDigit.bind(this)} value={searchText}/>
        </div>
    );
}