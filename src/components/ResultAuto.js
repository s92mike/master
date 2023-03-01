import React from "react";
import { Tooltip } from 'react-tooltip';

import SingleSearchButton from "./SingleSearchButton";
import MaxListDropDown from "./MaxListDropDown";

import { getPossibleCombination } from "../functions/functions";

export default function ResultAuto({ info, updateMaxList, changeSearch, searchText }) {
    return (<>
        <p>
          <b>Latest Result from Left to Right</b>
        </p>
        <ul className="master theory-1">
          {info.listNum.map((item, ind) => (
            <li className="guide" key={`theory-` + ind}>
              {item.value}
            </li>
          ))}
        </ul>
        <MaxListDropDown onChange={updateMaxList.bind(this)} />
        <SingleSearchButton onSearch={changeSearch.bind(this)}/>
        <ul className="everything">
          {info.temp2.map((item, ind) => (
            <li 
              key={`item-v1-` + ind}
              className={(getPossibleCombination(searchText).find((el) => el === item[0]) !== undefined ? 'found' : '') + (info.temp3.find((el) => el === item[0]) !== undefined ? ' exclude' : '')} 
            >
              <button 
                key={`button-draw-` + ind}
                data-tooltip-id={`draw-` + ind}
                data-tooltip-content={[...item].splice(2).join(`, `)} 
                data-tooltip-place="top">
                {item.map((item2, ind2) => {
                  const Bold    = () => (1 === ind2 ? <b>{item2}</b> : (2 > ind2) ? <>{item2}</> : <></>);
                  const dash    = (1 === ind2 ? `-` : ``);
                  return <>{dash}<Bold/></>;
                })}
                {`(` + ([...item].splice(2).length) + `)`}
              </button>
              <Tooltip id={`draw-` + ind} />
            </li>
          ))}
        </ul>
        <div className="theory-container">
          {info.listNum.map((item, ind) => (
            <div className='theory' key={`display-theory-` + ind}>
              <p><b>{item.value}</b></p>
              <ul className='first'>
                {info.finalArr[ind].map((item2, ind2) => (
                  <li 
                    className={(getPossibleCombination(searchText).find((el) => el === item2[0]) !== undefined ? 'found' : '')} 
                    key={`item-v1-`+ind2}>{item2[0]} - {item2[1]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>);
}