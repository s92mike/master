import React, { useState } from "react";

export default function MaxListDropDown({ onChange }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      onChange(event.target.value);
    }
    return (<select value={selectedOption} onChange={handleSelectChange}>
        <option value="9">9</option>
        <option value="10" selected>10</option>
        <option value="12">12</option>
        <option value="90">90</option>
        <option value="180">90</option>
    </select>)
}