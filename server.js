const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

const db = new Pool()

app.post('/temps', (req, resp) => {
  const body = req.body
  const temp = Number.parseFloat(body.temp)

  if (Number.isNaN(temp) || temp > 60.0 || temp < -60.0) {
    return resp.status(400).json({ error: 'invalid temperature'})
  }

  if (!Number.isInteger(body.loc_id)) {
    return resp.status(400).json({ error: 'invalid location id' })
  }

  db.query(`INSERT INTO Reading (loc_id, temp, read_time)
            VALUES (${body.loc_id}, ${body.temp}, timestamp 'now')`)
    .then(result => resp.json(body))
    .catch(e => setImmediate(() => {
      resp.status(400).json({ error: 'invalid parameters' })
    }))
})

app.get('/locations', (req, resp) => {
  db.query('SELECT * FROM Location')
    .then(result => 
      resp.json(result.rows
        .map(row => {
          position = { lat: row.lat, lng: row.lng }
          delete row.lat
          delete row.lng
          row.position = position
          return row
        }))
    )
    .catch(e => setImmediate(() => { console.log(e) }))
})

app.get('/temps', (req, resp) => {
  db.query(`SELECT A.loc_id, a.temp as curr, b.temp as lo, c.temp as hi
            FROM (
                  SELECT DISTINCT ON (loc_id) loc_id, temp
                  FROM Reading
                  ORDER BY loc_id, read_time DESC
                 ) A,
                 (
                  SELECT DISTINCT ON (loc_id) loc_id, temp
                  FROM Reading
                  WHERE read_time > timestamp 'now' - interval '24 hours'
                  ORDER BY loc_id, temp
                 ) B,
                 (
                  SELECT DISTINCT ON (loc_id) loc_id, temp
                  FROM Reading
                  WHERE read_time > timestamp 'now' - interval '24 hours'
                  ORDER BY loc_id, temp DESC
                 ) C
            WHERE A.loc_id = B.loc_id
            AND B.loc_id = C.loc_id`)
    .then(result => {
      resp.json(result.rows)
    })
    .catch(e => setImmediate(() => { console.log(e) }))
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => { db.end() })
