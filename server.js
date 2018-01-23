const express = require('express')
const { Pool } = require('pg')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const db = new Pool()

app.get('/', (req, resp) => {
  resp.send('<h1>kukkuu</h1>')
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
    .catch(e => setImmediate(() => { throw e }))
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
    .catch(e => setImmediate(() => { throw e }))
})

app.post('/temps/:id', (req, resp) => {
  const body = req.body

  if (body.content === undefined) {
    return resp.status(400).json({ error: 'content missing'})
  }

  db.query(`INSERT INTO Reading (loc_id, temp, read_time)
            VALUES (id, req.params.temp, timestamp 'now')`)
    .then(result => {
      resp.json(req.body)
    })
    .catch(e => setImmediate(() => {
      throw e
      resp.status(400).json({ error: 'invalid parameters' })
    }))

  resp.json(req.body)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

process.on('SIGTERM', () => { db.end() })
