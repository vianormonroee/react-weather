import React, { useState, useEffect } from 'react'
import { Header } from './components/index'
import api from '../../api/index'
import './index.css'

function Home() {
  const [data, setData] = useState()
  const [position, setPosition] = useState()
  const [units, setUnits] = useState('celsius')

  useEffect(() => {
    getInfo(position)
  }, [position])

  async function getInfo(pos) {
    const { data: resData } = await api.getInfo(pos)
    if (!resData) return
    if (resData.code) return console.warn({ Error: resData.code })
    if (resData.message) return console.warn({ Error: resData.message })
    setData(resData)
  }

  function convertToFahrenheit(num) {
    const fahrenheitTemp = num * (9 / 5) + 32
    return fahrenheitTemp.toFixed(0)
  }

  if (!data) return null

  return (
    <div className={'root'} style={{ backgroundColor: data.preset[1] }}>
      <Header
        position={position}
        units={units}
        setPosition={setPosition}
        locationName={data.location}
        setUnits={setUnits}
      />
      <div className={'main'}>
        <div className={'temperature'}>
          <img
            alt=""
            src={'http://localhost:3000/' + data.preset[0] + '.svg'}
          />
          <div className={'temperatureLabel'}>
            {(units === 'fahrenheit' ? convertToFahrenheit(data.temp) : data.temp) +
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

export default Home
