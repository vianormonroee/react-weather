import React, { useState } from 'react'
import api from './api.js'

function App() {
  const [data, setData] = useState('')

  const getInfo = async () => {
    const res = await api.getInfo()
    setData(JSON.stringify(res))
  }

  return (
    <div>
      <button onClick={() => console.log(getInfo())}>GET INFO</button>
      {data}
    </div>
  )
}

export default App
