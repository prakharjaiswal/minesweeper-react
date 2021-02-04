import {useState} from 'react';
let useInput = (initialValue, handler) => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        onChange: (event) => {
            setValue(event.target.value);
            handler(event);
        }
    };
};

export default useInput;