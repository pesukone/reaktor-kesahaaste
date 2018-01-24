import React from 'react'
import { Marker, InfoWindow } from 'react-google-maps'

import CurrentTemp from './CurrentTemp'
import CurrentDayInfo from './CurrentDayInfo'
import TempInput from './TempInput'
import Notification from './Notification'

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
          <Notification message={state.notification} isError={false} />
          <Notification message={state.error} isError={true} />
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

const getTemps = (state, loc) =>
  state.temps.filter(temp =>
    loc.id === temp.loc_id)[0]

const isSelected = (state, loc) => state.selected === loc

export default LocationInfo
