import React from 'react';

function Square(props) {
  return (
    <button
      className={
        'square' +
        (props.isBold ? ' blue-btn' : '') +
        (props.isWin ? ' green-btn' : '')
      }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
