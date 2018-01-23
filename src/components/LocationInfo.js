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
            temp={temps.curr}
          />
          <CurrentDayInfo hi={temps.hi} lo={temps.lo} />
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
    loc.id === temp.locId)[0]

const isSelected = (state, loc) => state.selected === loc

export default LocationInfo
