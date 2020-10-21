import React from 'react';
import Square from './Square';
function Board(props) {
  // const renderSquare = (i) => {
  //   return (
  //     <Square
  //       value={props.squares[i]}
  //       onClick={() => props.onClick(i)}
  //       isBold={i === props.boldStep}
  //       isWin={props.winStep.includes(i)}
  //     />
  //   );
  // };

  const createBoard = () => {
    const temps = [];
    for (let i = 0; i < 3; i++) {
      const temp = [];
      for (let j = 0; j < 3; j++) {
        temp.push(
          <Square
            value={props.squares[i * 3 + j]}
            onClick={() => props.onClick(i * 3 + j)}
            isBold={i * 3 + j === props.boldStep}
            isWin={props.winStep.includes(i * 3 + j)}
          />
        );
      }
      temps.push(<div className="board-row">{temp}</div>);
    }
    return temps;
  };

  return <div>{createBoard()}</div>;
}

export default Board;
