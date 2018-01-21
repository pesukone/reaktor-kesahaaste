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
      selected: null
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

  toggleInfo = ({ open }) => () => {
    this.setState({ infoVisible: !open })
  }

  findByName = (name) => 
    this.state.locations
    .filter(loc =>
      loc.name === name)[0]

  select = (location) => () => {
    this.setState({
      selected: location
    })
  }

  isSelected = (location) => location === this.state.selected

  render() {
    return (
      <MapContainer
        locations={this.state.locations}
        temps={this.state.temps}
        select={this.select}
        isSelected={this.isSelected}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMh8h0ZICtnm-NRLEz2ya1X8odVGh_Abw&v=3.exp"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "600px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    )
  }
}

export default App;
