let notes = [
  {
    id: "1",
    content: "HTML is easy rendering language",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})
app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})
app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const responseNote = request.body
  notes = notes.map(note => note.id !== id ? note : responseNote)
  response.json(responseNote)
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)
  notes.push(note)
  response.json(note)
})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})