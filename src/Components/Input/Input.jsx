import { memo, useRef } from 'react'
import './Input.css'

const Input = ({icon, callSearchGifs, onInputValueChange}) => {
  const inputRef = useRef(null)

  const searchButtonClickHandler = (e) => {
    e.preventDefault();
    if(callSearchGifs && inputRef && inputRef.current) callSearchGifs(inputRef.current.value)
  }

  const inputValueOnChangeHandler = (e) => {
    if(onInputValueChange && e.target.value.trim().length === 0) onInputValueChange();
  }

  return (
    <form onSubmit = {searchButtonClickHandler} className='input-wrapper__div'>
        <input onChange={inputValueOnChangeHandler} ref = {inputRef} name = 'input' className='input' required/>
        <button type = 'submit' className='input-icon__div'>
            {icon}
        </button>
        <span className='placeholder'>
          Search GIFs
        </span>
    </form>
  )
}

export default memo(Input)