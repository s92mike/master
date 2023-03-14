import React from "react";

export default function TabSelector({ setOptions, options }) {
  let sidebysideClassName = `current`;
  let bydayClassName = ``;
  let sidebysidev1ClassName = ``;
  let imageSurigaoClassName = ``;
  let theoryTwo = ``;
  if (`byday` === options) {
    bydayClassName = `current`;
    sidebysideClassName = ``;
    sidebysidev1ClassName = ``;
    imageSurigaoClassName = ``;
    theoryTwo = ``;
  }
  if (`sidebysidev1` === options) {
    bydayClassName = ``;
    sidebysideClassName = ``;
    sidebysidev1ClassName = `current`;
    imageSurigaoClassName = ``;
    theoryTwo = ``;
  }
  if (`image-surigao` === options) {
    bydayClassName = ``;
    sidebysideClassName = ``;
    sidebysidev1ClassName = ``;
    imageSurigaoClassName = `current`;
    theoryTwo = ``;
  }
  if (`theory-two` === options) {
    bydayClassName = ``;
    sidebysideClassName = ``;
    sidebysidev1ClassName = ``;
    imageSurigaoClassName = ``;
    theoryTwo = ``;
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
      case `image-surigao`:
        changeOption = `image-surigao`;
        break;
      case `theory-two`:
        changeOption = `theory-two`;
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
        className={imageSurigaoClassName}
        onClick={toggleCurrent.bind(this, `image-surigao`)}
      >
        Image
      </button>
      <button
        className={sidebysidev1ClassName}
        onClick={toggleCurrent.bind(this, `sidebysidev1`)}
      >
        Theory One
      </button>
      <button
        className={theoryTwo}
        onClick={toggleCurrent.bind(this, `theory-two`)}
      >
        Theory Two
      </button>
    </div>
  );
}
