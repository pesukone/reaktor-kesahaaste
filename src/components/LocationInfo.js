import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

const LocationInfo = ({ location, temps, select, isSelected }) => {
  return (
    <Marker
      position={location.position}
      onClick={select(location)}
    >
      {isSelected(location) && <InfoWindow onCloseClick={select(null)}>
        <div>
          <CurrentTemp locName={location.name} temp={temps.curr} />
          <CurrentDayInfo hi={temps.hi} lo={temps.lo} />
        </div>
      </InfoWindow>}
    </Marker>
  )
}

const CurrentDayInfo = ({ hi, lo }) => {
  return (
    <div>
      <h3>Last 24h:</h3>
        highest: {`${hi}°C`}
        <br />
        lowest: {`${lo}°C`}
    </div>
  )
}

const CurrentTemp = ({ locName, temp }) =>
  <h2>{`${locName} ${temp}°C`}</h2>

export default LocationInfo
