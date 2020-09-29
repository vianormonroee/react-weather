const express = require('express')
const { PORT, WEATHER_API_KEY } = require('./config.json')
const request = require('request')

const app = express()

app.get('/', (req, res) => {
  console.log('Hello!', { conf })
  res.end()
})

app.get('/getInfo', async (req, res) => {
  // TODO: fix CORS error because of difference between client and server urls
  let info
  try {
    info = await request.get(
      `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${WEATHER_API_KEY}`
    )
  } catch (err) {
    res.json(err)
  }
  res.json(info)
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
