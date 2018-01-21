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
    temps: {
      curr: -4.0,
      hi: 10.0,
      lo: -12.0
    },
    id: 1
  },
  {
    name: "Tokyo",
    position: {
      lat: 35.6584421,
      lng: 139.7328635
    },
    temps: {
      curr: 14.0,
      hi: 23.0,
      lo: 8.0
    },
    id: 2
  },
  {
    name: "New York",
    position: {
      lat: 40.7406905,
      lng: -73.9938438
    },
    temps: {
      curr: 3.0,
      hi: 7.0,
      lo: -2.0
    },
    id: 3
  },
  {
    name: "Amsterdam",
    position: {
      lat: 52.3650691,
      lng: 4.9040238
    },
    temps: {
      curr: 8.0,
      hi: 16.0,
      lo: 3.0
    },
    id: 4
  },
  {
    name: "Dubai",
    position: {
      lat: 25.092535,
      lng: 55.1562243
    },
    temps: {
      curr: 23.0,
      hi: 28.0,
      lo: 19.0
    },
    id: 5
  }
]

ReactDOM.render(<App locations={locations} />, document.getElementById('root'));
