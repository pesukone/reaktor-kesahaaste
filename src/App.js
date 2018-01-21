import React from 'react'

import MapContainer from './components/MapContainer'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    const { locations } = props
    this.state = {
      locations: locations,
      selected: null
    }
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
