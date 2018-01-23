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
  /*db.query(`SELECT DISTINCT ON (locId) locId as id, temp as curr
            FROM Reading
            ORDER BY locId, readTime DESC`)
    .then(result => {
      console.log(JSON.stringify(result.rows))
    })
    .catch(e => setImmediate(() => { throw e }))

  db.query(`SELECT DISTINCT ON (locId) locId as id, temp as lo
            FROM Reading
            WHERE readTime > timestamp 'now' - interval '24 hours'
            ORDER BY locId, temp`)
    .then(result => {
      console.log(JSON.stringify(result.rows))
    })
    .catch(e => setimmediate(() => { throw e }))*/
  db.query(`SELECT A.locId as id, a.temp as curr, b.temp as lo, c.temp as hi
            FROM (
                  SELECT DISTINCT ON (locId) locId, temp
                  FROM Reading
                  ORDER BY locId, readTime DESC
                 ) A,
                 (
                  SELECT DISTINCT ON (locId) locId, temp
                  FROM Reading
                  WHERE readTime > timestamp 'now' - interval '24 hours'
                  ORDER BY locId, temp
                 ) B,
                 (
                  SELECT DISTINCT ON (locId) locId, temp
                  FROM Reading
                  WHERE readTime > timestamp 'now' - interval '24 hours'
                  ORDER BY locId, temp DESC
                 ) C
            WHERE A.locId = B.locId
            AND B.locId = C.locId`)
    .then(result => {
      console.log(JSON.stringify(result.rows))
    })
    .catch(e => setImmediate(() => { throw e }))
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
