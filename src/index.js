import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const locations = [
  {
    name: "Helsinki",
    position: {
      lat: 60.1697530,
      lng: 24.9490830
    },
    id: 1
  },
  {
    name: "Tokio",
    position: {
      lat: 35.6584421,
      lng: 139.7328635
    },
    id: 2
  },
  {
    name: "New York",
    position: {
      lat: 40.7406905,
      lng: -73.9938438
    },
    id: 3
  },
  {
    name: "Amsterdam",
    position: {
      lat: 52.3650691,
      lng: 4.9040238
    },
    id: 4
  },
  {
    name: "Dubai",
    position: {
      lat: 25.092535,
      lng: 55.1562243
    },
    id: 5
  }
]

ReactDOM.render(<App locations={locations} />, document.getElementById('root'));
