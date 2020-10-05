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

  const HPa_TO_MMHg = 0.75

  if (!query.units) query.units = 'metric'

  const weatherApiQuery = Object.keys(query)
    .map(key => `${key}=${query[key]}`)
    .join('&')

  let info

  try {
    info = await axios.get(
      encodeURI(`${apiUrl}?${weatherApiQuery}&lang=ru&appid=${WEATHER_API_KEY}`)
    )
  } catch (err) {
    res.json(err)
    return
  }

  let {
    name: location,
    weather: [{ description, id: weatherId, main: weatherType }],
    wind: { deg, speed: windSpeed },
    main: { pressure, temp, humidity },
    clouds: { all: cloudiness },
  } = info.data

  const windDirections = {
    N: 'Северный',
    E: 'Восточный',
    S: 'Южный',
    W: 'Западный',
  }

  const weatherPresets = {
    Clouds:
      weatherId === 801 ? ['partly_cloudy', '#498CEC'] : ['cloud', '#498CEC'],
    Snow: ['rain', '#7290B9'],
    Clear: ['sun', '#3CB2E8'],
    Drizzle: ['rain', '#7290B9'],
    Rain: ['rain', '#7290B9'],
    Thunderstorm: ['storm', '#4D5D73'],
  }

  let windDirection

  let preset = weatherPresets[weatherType] || ['cloud', '#8AADDE']

  pressure *= HPa_TO_MMHg
  pressure = pressure.toFixed(0)
  temp = temp.toFixed(0)
  windSpeed = windSpeed.toFixed(0)

  if (deg < 90) windDirection = windDirections['N']
  else if (deg < 180) windDirection = windDirections['E']
  else if (deg < 270) windDirection = windDirections['S']
  else windDirection = windDirections['W']

  res.json({
    location,
    description,
    weatherType,
    windDirection,
    windSpeed,
    pressure,
    temp,
    preset,
    humidity,
    cloudiness,
  })
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
