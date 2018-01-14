import React from 'react';

const PlayerControl = (props) => {

  return (
    <div>
      Filter Position
      <button onClick={() => props.filterTable('QB')}>QB</button>
      <button onClick={() => props.filterTable('RB')}>RB</button>
      <button onClick={() => props.filterTable('WR')}>WR</button>
      <button onClick={() => props.filterTable('TE')}>TE</button>
      <button onClick={() => props.filterTable('DEF')}>DEF</button>
      <button onClick={() => props.filterTable('K')}>K</button>
      <button onClick={() => props.filterTable('LB')}>LB</button>
      <button onClick={() => props.filterTable('DB')}>DB</button>
      <button onClick={() => props.filterTable('DL')}>DL</button>
    </div>
  )

}

export default PlayerControl;