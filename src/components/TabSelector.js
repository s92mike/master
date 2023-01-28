import React from 'react';

export default function TabSelector({ setOptions, options }) {
    let sidebysideClassName = `current`;
    let bydayClassName      = ``;
    if (`sidebyside` !== options) {
        sidebysideClassName = ``;
        bydayClassName      = `current`;
    }
    const toggleCurrent = () => {
        let changeOption = ``;
        switch (options) {
            case `sidebyside`:
                changeOption = `byday`;
                break;
            case `byday`:
                changeOption = `sidebyside`;
                break;
            default:
                changeOption = `sidebyside`;
                break;
        }
        setOptions(changeOption);
    }
    return (<div className="inputers">
        <button className={sidebysideClassName} onClick={toggleCurrent}>Dikit-dikit</button>
        <button className={bydayClassName} onClick={toggleCurrent}>Inadlawan</button>
    </div>);
}