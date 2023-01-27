import React, { useState } from "react";

export default function SearchButton(props) {
    const [resultText, setResultText] = useState('');
    const [searchText, setSearchText] = useState('');
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
        if (item.keyCode === 13) {
            let final = addZero(number);
            let resultFinal = addZero(resultText);
            props.onChange(final);
            props.onResultChange(resultFinal);
        }
    }
    function checkDigitResult (item) {
        const number = item.target.value;
        if (
            number.length+1 > 3 && 
            ((item.keyCode >= 48 && item.keyCode <= 57) ||
             (item.keyCode >= 96 && item.keyCode <= 105) ||
             (item.keyCode === 69))
        ) {
            item.preventDefault();
        }
        if (item.keyCode === 13) {
            let final = addZero(searchText);
            let resultFinal = addZero(number);
            props.onChange(final);
            props.onResultChange(resultFinal);
        }
    }
    function checkDigitChange (item) {
        setResultText(item.target.value);
    }
    function checkDigitChangeSearch (item) {
        setSearchText(item.target.value);
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
    return(<div className="inputers">
        <label HTMLfor="search">
            Input Search: 
            <input name="search" type="number" min="0" max="999" onChange={checkDigitChangeSearch.bind(this)} onKeyDown={checkDigit.bind(this)}/>
        </label>
        <hr className="break"/>
        <label HTMLfor="result">
            Input Result: 
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this)} onKeyDown={checkDigitResult.bind(this)}/>
        </label>
    </div>);
}