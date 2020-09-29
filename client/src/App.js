import React, { useState, useEffect } from 'react'
import api from './api/index.js'
import './App.css'

const HPa_TO_MMHg = 0.75

function App() {
  const [data, setData] = useState({})
  const [position, setPosition] = useState({})

  useEffect(() => {
    const success = pos => setPosition(pos)
    const error = err => console.warn({ Error: err })

    if (navigator.geolocation) {
      // get current geoposition of user
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 5000,
      })
    }
  }, [])

  useEffect(() => {
    if (position) getInfo(position)
  }, [position])

  async function getInfo(pos) {
    const res = await api.getInfo(pos)

    if (!res) return

    console.log(res, 'kaksdkaskdask')
    let {
      name: location,
      weather: [{ description, main: weatherType }],
      wind: { deg, speed: windSpeed },
      main: { pressure, temp, humidity },
      clouds: { all: cloudiness },
    } = res.data

    const windDirections = {
      N: 'Северный',
      E: 'Восточный',
      S: 'Южный',
      W: 'Западный',
    }

    let windDirection

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
      humidity,
      cloudiness,
    })
  }

  return (
    <div className={'root'}>
      <div className={'head'}>
        <div className={'location'}>
          <div className={'locationName'}>{data.location}</div>
          <div className={'locationOptions'}>
            <div className={'changeLocation'}>{'Сменить город'}</div>
            <button className={'button'} onClick={() => console.log('lol')}>
              <div className={'locationOptions'}>
                <img src="http://localhost:3000/location.svg"></img>
                <div className={'changeLocation'}>{'Мое местоположение'}</div>
              </div>
            </button>
          </div>
        </div>
        <div className={'metric'}></div>
      </div>
      <div className={'main'}>
        <div className={'temperature'}>
          <img src="http://localhost:3000/rain.svg"></img>
          <div className={'temperatureLabel'}>{data.temp + '°'}</div>
        </div>
        <div className={'description'}>{data.description}</div>
      </div>
      <div className={'footer'}>
        <div className={'infoBlock'}>
          <div className={'propTitle'}>{'Ветер'}</div>
          <div className={'propValue'}>{data.windSpeed + 'м/с, ' + data.windDirection}</div>
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
