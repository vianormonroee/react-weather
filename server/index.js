const express = require('express')
const { PORT, WEATHER_API_KEY } = require('./config.json')
const axios = require('axios')

const app = express()

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'

app.get('/', (req, res) => {
  console.log('Hello!', { conf })
  res.end()
})

app.get('/getInfo', async (req, res) => {
  const { query: { lat, lon } } = req
  let info
  try {
    info = await axios.get(`${apiUrl}?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${WEATHER_API_KEY}`)
    console.log({info})
  } catch (err) {
    res.json(err)
  }
  res.json(info.data)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
