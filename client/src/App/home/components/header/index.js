import React, { useState } from 'react'
import SearchInput from './SearchInput'
import './index.css'

function Header({ position, units, locationName, setPosition, setUnits }) {
  const [searchMode, setSearchMode] = useState()
  const [searchText, setSearchText] = useState('')

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

  function submitLocation() {
    setPosition(searchText)
    setSearchText('')
    setSearchMode(false)
  }

  function onInputChange(event) {
    setSearchText(event.target.value)
  }

  return (
    <div className={'head'}>
      {(searchMode && (
        <SearchInput
          value={searchText}
          onChange={onInputChange}
          submit={submitLocation}
        />
      )) || (
        <div className={'location'}>
          <div className={'locationName'}>{locationName}</div>
          <div className={'locationOptions'}>
            <button
              className={searchMode ? 'activeButton' : 'passiveButton'}
              onClick={() => setSearchMode(true)}
            >
              <div className={searchMode ? 'activeLocation' : 'changeLocation'}>
                Сменить город
              </div>
            </button>
            <button
              className={position ? 'activeButton' : 'passiveButton'}
              onClick={getPos}
            >
              <div className={'locationOptions'}>
                <img alt='' src="http://localhost:3000/location.svg" />
                <div className={position ? 'activeLocation' : 'changeLocation'}>
                  {'Мое местоположение'}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

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
  )
}

export default Header
