import { useState } from "react";
import confetti from 'canvas-confetti';

import { Square } from "./components/Square";
import { TURNS } from "./constant";
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from "./components/WinnerModal";
import { resetGameFromStorage, saveGameToStorage } from "./logic/storage";

function App() {
  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });
  const [ turn, setTurn ] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  const [ winner, setWinner ] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameFromStorage();

  }


  const updateBoard = (index) => {
    //No actualizamos la casilla si ya está ocupada
    if (board[index] || winner) return;
    //Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({board: newBoard, turn: newTurn});

    //Comprobamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    }else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <button onClick={resetGame}>Empezar de nuevo</button>
        <section className="game">
          {
            board.map((square, index) =>(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
              </Square>  
            ))
          }
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
