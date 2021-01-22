import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MineSweeper from './components/minesweeper/MineSweeper.component';
// import GameSelector from './components/gameselector/GameSelector.component';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <GameSelector defaultRows={10} defaultColumns={10} defaultBombs={10}></GameSelector> */}
    {/* <MineSweeper rows={parseInt(rowsInput.value,10)} columns={parseInt(colsInput.value, 10)} bombs={parseInt(bombsInput.value, 10)}></MineSweeper> */}
    <MineSweeper rows={14} columns={14} bombs={20}></MineSweeper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
