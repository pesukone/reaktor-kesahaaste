import React from 'react'

import MapContainer from './components/MapContainer'

import locationService from './services/locations'
import tempService from './services/temps'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      temps: [],
      selected: null,
      tempVal: ''
    }
  }

  componentWillMount() {
    locationService
      .getAll()
      .then(locs => {
        this.setState({ locations: locs })
      })
    tempService
      .getAll()
      .then(temps => {
        this.setState({ temps: temps })
      })
  }

  select = (location) => () => {
    this.setState({
      selected: location
    })
  }

  addReading = (e) => {
    e.preventDefault()

    const reading = {
      loc_id: this.state.selected.id,
      temp: this.state.tempVal
    }

    tempService.post(reading)
      .then(() => {
        tempService.getAll()
          .then(temps => {
            this.setState({ temps: temps })
          })
      })
      .catch(err => {
        console.log(err.response.data.error)
      })
  }

  handleInputChange = (e) => {
    this.setState({
      tempVal: e.target.value
    })
  }

  render() {
    return (
      <MapContainer
        state={this.state}
        select={this.select}
        addReading={this.addReading}
        inputChange={this.handleInputChange}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8h0ZICtnm-NRLEz2ya1X8odVGh_Abw&v=3.exp"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "600px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    )
  }
}

export default App;
