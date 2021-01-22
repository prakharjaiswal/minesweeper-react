import React, {useState} from 'react';
import MineSweeper from '../minesweeper/MineSweeper.component';

let useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        onChange: (event) => {
            setValue(event.target.value);
        }
    };
};

export default function GameSelector(props) {
    const rowsInput     = useInput(props.defaultRows);
    const colsInput     = useInput(props.defaultColumns);
    const bombsInput    = useInput(props.defaultBombs); 
    return (
    <div className="game">
        <div className="game-selector">
            <input type="number" {...rowsInput} placeholder="rows" />
            <input type="number" {...colsInput} placeholder="columns" />
            <input type="number" {...bombsInput} placeholder="bombs" />
        </div>
        <MineSweeper rows={parseInt(rowsInput.value,10)} columns={parseInt(colsInput.value, 10)} bombs={parseInt(bombsInput.value, 10)}></MineSweeper>
    </div>
    );
}