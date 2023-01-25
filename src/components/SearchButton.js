import React, { useState } from "react";

export default function SearchButton(props) {
    const [digits, setDigits] = useState('');
    function checkDigit (item) {
        const number = item.target.value;
        if (
            number.length+1 > 3 && 
            ((item.keyCode >= 48 && item.keyCode <= 57) ||
             (item.keyCode >= 96 && item.keyCode <= 105) ||
             (item.keyCode === 69))
        ) {
            item.preventDefault();
        }
        setDigits(`${number}${item.key}`);
        if (item.keyCode === 13) {
            let final = addZero(number);
            props.onChange(final);
        }
    }
    const addZero = (number) => {
        let final = number;
        if (number.length < 3){
            final = `0${number}`;
            if (number.length === 1) {
                final = `00${number}`;
            }
            if (number.length === 0) {
                final = `000`;
            }
        }
        return final;
    }
    const searchDigit = () => {
        if (digits.length > 0) {
            let final = addZero(digits);
            props.onChange(final);
        }
    }
    return(<div className="inputers">
        <input type="number" min="0" max="999" onKeyDown={checkDigit.bind(this)}/><button type="button" onClick={searchDigit}>Search!!!</button>
    </div>);
}