const express = require('express')
const { Client } = require('pg')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const db = new Client()
db.connect()

  /*db.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message)
  db.end()
})*/

app.get('/', (req, res) => {
  res.send('<h1>kukkuu</h1>')
})

app.post('/temps', (req, res) => {
  console.log(req.body)

  res.json(req.body)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
