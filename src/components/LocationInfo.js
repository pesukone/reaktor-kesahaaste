import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

const LocationInfo = ({ location, select, isSelected }) => {
  return (
    <Marker
      position={location.position}
      onClick={select(location)}
    >
      {isSelected(location) && <InfoWindow onCloseClick={select(null)}>
        <div>
          <CurrentTemp location={location} />
          <CurrentDayInfo location={location} />
        </div>
      </InfoWindow>}
    </Marker>
  )
}

const CurrentDayInfo = ({ location }) => {
  return (
    <div>
      <h3>Last 24h:</h3>
        highest: {`${location.temps.hi}°C`}
        <br />
        lowest: {`${location.temps.lo}°C`}
    </div>
  )
}

const CurrentTemp = ({ location }) =>
  <h2>{`${location.name} ${location.temps.curr}°C`}</h2>

export default LocationInfo
