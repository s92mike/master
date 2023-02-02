import React, { useState } from "react";
import { checkLengthDigitKeyCode } from "../functions/functions";

export default function SearchButton(props) {
    const [searchText, setSearchText]   = useState(props.searchText);
    const [results, setResults]         = useState(props.resultText);

    function checkDigit (item) {
        const number = item.target.value;
        if (checkLengthDigitKeyCode({ l: 3, value: item.target.value, keyCode: item.keyCode })) {
            item.preventDefault();
        }
        if (item.keyCode === 13) {
            let final = addZero(number);
            props.onChange(final);
            props.onResultChange(results.map((digit)=>(addZero(digit))));
        }
    }
    function checkDigitResult (item) {
        const number = item.target.value;
        if (checkLengthDigitKeyCode({ l: 3, value: number, keyCode: number.keyCode })) {
            item.preventDefault();
        }
        if (item.keyCode === 13) {
            let final = addZero(searchText);
            props.onChange(final);
            props.onResultChange(results.map((digit)=>(addZero(digit))));
        }
    }
    function checkDigitChange (index, { target: { value } }) {
        let temp = [...results];
        temp[index] = value;
        setResults(temp);
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
                final = ``;
            }
        }
        return final;
    }

    const submitDigits = () => {
        props.onChange(addZero(searchText));
        props.onResultChange(results);
    }
    
    return(<div className="inputers">
        <label htmlFor="search">
            Input Search: 
            <input name="search" type="number" min="0" max="999" onChange={checkDigitChangeSearch.bind(this)} onKeyDown={checkDigit.bind(this)} value={searchText}/>
        </label>
        <hr className="break"/>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 0)} onKeyDown={checkDigitResult.bind(this)} value={results[0]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 1)} onKeyDown={checkDigitResult.bind(this)} value={results[1]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 2)} onKeyDown={checkDigitResult.bind(this)} value={results[2]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 3)} onKeyDown={checkDigitResult.bind(this)} value={results[3]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 4)} onKeyDown={checkDigitResult.bind(this)} value={results[4]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 5)} onKeyDown={checkDigitResult.bind(this)} value={results[5]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 6)} onKeyDown={checkDigitResult.bind(this)} value={results[6]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 7)} onKeyDown={checkDigitResult.bind(this)} value={results[7]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 8)} onKeyDown={checkDigitResult.bind(this)} value={results[8]}/>
        </label>
        <label htmlFor="result">
            <input type="number" name="result" min="0" max="999" onChange={checkDigitChange.bind(this, 9)} onKeyDown={checkDigitResult.bind(this)} value={results[9]}/>
        </label>
        <hr className="break"/>
        <button type="button" onClick={submitDigits.bind(this)}>Search!</button>
    </div>);
}