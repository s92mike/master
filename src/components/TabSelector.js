import React from "react";

export default function TabSelector({ setOptions, options }) {
  let sidebysideClassName = `current`;
  let bydayClassName = ``;
  let sidebysidev1ClassName = ``;
  if (`byday` === options) {
    bydayClassName = `current`;
    sidebysideClassName = ``;
    sidebysidev1ClassName = ``;
  }
  if (`sidebysidev1` === options) {
    bydayClassName = ``;
    sidebysideClassName = ``;
    sidebysidev1ClassName = `current`;
  }
  const toggleCurrent = (currentOptions) => {
    let changeOption = ``;
    switch (currentOptions) {
      case `sidebyside`:
        changeOption = `sidebyside`;
        break;
      case `byday`:
        changeOption = `byday`;
        break;
      case `sidebysidev1`:
        changeOption = `sidebysidev1`;
        break;
      default:
        changeOption = `sidebyside`;
        break;
    }
    setOptions(changeOption);
  };
  return (
    <div className="inputers">
      <button
        className={sidebysideClassName}
        onClick={toggleCurrent.bind(this, `sidebyside`)}
      >
        Dikit-dikit
      </button>
      <button
        className={bydayClassName}
        onClick={toggleCurrent.bind(this, `byday`)}
      >
        Inadlawan
      </button>
      <button
        className={sidebysidev1ClassName}
        onClick={toggleCurrent.bind(this, `sidebysidev1`)}
      >
        Theory One
      </button>
    </div>
  );
}
