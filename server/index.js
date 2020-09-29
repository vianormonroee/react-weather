const express = require('express')
const { PORT, WEATHER_API_KEY } = require('./config.json')
const axios = require('axios')

const app = express()

app.get('/', (req, res) => {
  res.end()
})

app.get('/getInfo', async (req, res) => {
  const apiUrl = 'http://api.openweathermap.org/data/2.5/weather'
  const { query } = req

  if (!query.units) query.units = 'metric'

  const weatherApiQuery = Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&')

  let info

  console.log(`${apiUrl}?${weatherApiQuery}&lang=ru&appid=${WEATHER_API_KEY}`);

  try {
    info = await axios.get(
      `${apiUrl}?${weatherApiQuery}&lang=ru&appid=${WEATHER_API_KEY}`
    )
  } catch (err) {
    res.json(err)
  }

  res.json(info.data)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
