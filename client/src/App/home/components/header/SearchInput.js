import React, { useRef, useEffect } from 'react'
import './index.css'

function SearchInput({ value, onChange, submit }) {
  const input = useRef()

  useEffect(() => {
    input.current.focus()
  }, [])

  function handlePressKey(event) {
    if (event.key === 'Enter') submit()
  }

  return (
    <div className={'searchBox'}>
      <input
        value={value}
        onChange={onChange}
        ref={input}
        onKeyDown={handlePressKey}
      />
      <button className={'submitButton'} onClick={submit}>
        OK
      </button>
    </div>
  )
}

export default SearchInput
