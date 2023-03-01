import React, { useState } from "react";

export default function MaxListDropDown({ onChange }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      onChange(event.target.value);
    }

    const options = [];
    for (let i = 1; i <= 180; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return (<select value={selectedOption} onChange={handleSelectChange}>
        <option value="24">24</option>
        <option value="60">60</option>
        {options}
    </select>)
}