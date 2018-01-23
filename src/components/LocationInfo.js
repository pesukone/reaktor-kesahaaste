import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

const LocationInfo = ({ state, location, select, addReading, inputChange }) => {
  const temps = getTemps(state, location)
    return (
    <Marker
      position={location.position}
      onClick={select(location)}
    >
      {isSelected(state, location) && <InfoWindow onCloseClick={select(null)}>
        <div>
          <CurrentTemp
            locName={location.name}
            temps={temps}
          />
          <CurrentDayInfo temps={temps} />
          <TempInput 
            addReading={addReading}
            tempVal={state.tempVal}
            inputChange={inputChange}
          />
        </div>
      </InfoWindow>}
    </Marker>
  )
}

const CurrentDayInfo = ({ temps }) => {
  if (temps) {
    return (
      <div>
        <h3>Last 24h:</h3>
        highest: {`${temps.hi}°C`}
        <br />
        lowest: {`${temps.lo}°C`}
      </div>
    )
  } else {
    return (
      <b>no temperature data available</b>
    )
  }
}

const CurrentTemp = ({ locName, temps }) =>
  temps ?
    <h2>{`${locName} ${temps.curr}°C`}</h2> :
    <h2>{locName}</h2>

const TempInput = ({ addReading, tempVal, inputChange }) => {
  return (
    <div>
      <h3>Add reading (°C):</h3>
      <form onSubmit={addReading}>
        <input
          value={tempVal}
          onChange={inputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const getTemps = (state, loc) =>
  state.temps.filter(temp =>
    loc.id === temp.loc_id)[0]

const isSelected = (state, loc) => state.selected === loc

export default LocationInfo
