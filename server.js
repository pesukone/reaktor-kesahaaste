const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = new Pool()

  /*db.query('SELECT * from Location')
  .then(res => {
    console.log(JSON.stringify(res.rows))
  })
  .catch(e => setImmediate(() => { throw e }))*/

app.get('/', (req, resp) => {
  resp.send('<h1>kukkuu</h1>')
})

app.get('/locations', (req, resp) => {
  db.query('SELECT * FROM Location')
    .then(result => {
      resp.json(result.rows.map(row => {
        position = { lat: row.lat, lng: row.lng }
        delete row.lat
        delete row.lng
        row.position = position
        return row
      }))
    })
    .catch(e => setImmediate(() => { throw e }))
})

app.get('/temps', (req, resp) => {
  resp.json([])
})

app.post('/temps', (req, resp) => {
  console.log(req.body)

  resp.json(req.body)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => { db.end() })
