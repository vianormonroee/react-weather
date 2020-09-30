import React, { useState, useEffect } from 'react'
import api from './api/index.js'
import './App.css'

const HPa_TO_MMHg = 0.75

function App() {
  const [data, setData] = useState()
  const [position, setPosition] = useState()
  const [units, setUnits] = useState('celsius')

  useEffect(() => {
    getInfo(position)
  }, [position])

  function getPos() {
    const success = pos => setPosition(pos)
    const error = err => console.warn({ Error: err })

    if (navigator.geolocation) {
      // get current geoposition of user
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 5000,
      })
    }
  }

  async function getInfo(pos) {
    const { data: resData } = await api.getInfo(pos)
    if (!resData) return
    if (resData.code) return console.warn({ Error: resData.code })
    if (resData.message) return console.warn({ Error: resData.message })

    let {
      name: location,
      weather: [{ description, id: weatherId, main: weatherType }],
      wind: { deg, speed: windSpeed },
      main: { pressure, temp, humidity },
      clouds: { all: cloudiness },
    } = resData

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
    temp = temp.toFixed(0)
    pressure = pressure.toFixed(0)

    if (deg < 90) windDirection = windDirections['N']
    else if (deg < 180) windDirection = windDirections['E']
    else if (deg < 270) windDirection = windDirections['S']
    else windDirection = windDirections['W']

    setData({
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
  }

  function toFahrenheit(num) {
    const fahrenheitTemp = num * (9 / 5) + 32
    return fahrenheitTemp.toFixed(0)
  }

  if (!data) return null

  return (
    <div className={'root'} style={{ backgroundColor: data.preset[1] }}>
      <div className={'head'}>
        <div className={'location'}>
          <div className={'locationName'}>{data.location}</div>
          <div className={'locationOptions'}>
            <div className={'changeLocation'}>{'Сменить город'}</div>
            <button
              className={position ? 'activeButton' : 'passiveButton'}
              onClick={() => getPos()}
            >
              <div className={'locationOptions'}>
                <img src="http://localhost:3000/location.svg"></img>
                <div className={position ? 'activeLocation' : 'changeLocation'}>
                  {'Мое местоположение'}
                </div>
              </div>
            </button>
          </div>
        </div>
        <div>
          <div className={'metricContainer'}>
            {'°'}
            <div className={'metric'}>
              <button
                className={'celsius'}
                style={{
                  backgroundColor:
                    units === 'celsius'
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(255,255,255, 0)',
                }}
                onClick={() => setUnits('celsius')}
              >
                C
              </button>
              <button
                className={'fahrenheit'}
                style={{
                  backgroundColor:
                    units === 'fahrenheit'
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(255, 255, 255, 0)',
                }}
                onClick={() => setUnits('fahrenheit')}
              >
                F
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={'main'}>
        <div className={'temperature'}>
          <img src={'http://localhost:3000/' + data.preset[0] + '.svg'}></img>
          <div className={'temperatureLabel'}>
            {(units === 'fahrenheit' ? toFahrenheit(data.temp) : data.temp) +
              (units === 'celsius' ? '°' : '°F')}
          </div>
        </div>
        <div className={'description'}>{data.description}</div>
      </div>
      <div className={'footer'}>
        <div className={'infoBlock'}>
          <div className={'propTitle'}>{'Ветер'}</div>
          <div className={'propValue'}>
            {data.windSpeed + ' м/с, ' + data.windDirection}
          </div>
        </div>
        <div className={'infoBlock'}>
          <div className={'propTitle'}>{'Давление'}</div>
          <div className={'propValue'}>{data.pressure + ' мм рт. ст.'}</div>
        </div>
        <div className={'infoBlock'}>
          <div className={'propTitle'}>{'Влажность'}</div>
          <div className={'propValue'}>{data.humidity + '%'}</div>
        </div>
        <div className={'infoBlock'}>
          <div className={'propTitle'}>{'Вероятность дождя'}</div>
          <div className={'propValue'}>{data.cloudiness + '%'}</div>
        </div>
      </div>
    </div>
  )
}

export default App
