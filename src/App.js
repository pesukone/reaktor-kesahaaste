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
      tempVal: '',
      notification: null,
      error: null
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
            this.showNotification("reading added successfully", false)
          })
      })
      .catch(err => {
        this.showNotification(err.response.data.error, true)
      })
  }

  showNotification = (text, isError) => {
    this.setState({ [isError ? "error" : "notification"] : text })
    setTimeout(() => {
      this.setState({ [isError ? "error" : "notification"] : null })
    }, 3000)
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
        containerElement={<div style={{ height: window.innerHeight }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    )
  }
}

export default App;
