const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let users = [
  {
    name: 'Cacu',
    email: 'cacu@ucu.com',
    password: '12345',
    confirmPassword: '12345',
    id: 1
  },
  {
    name: 'thamara',
    email: 'thamara@gmail.com',
    password: '1234',
    confirmPassword: '1234',
    id: 2
  },
  {
    name: 'tincho',
    email: 'tincho@ucu.com',
    password: '123',
    confirmPassword: '123',
    id: 3
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (request, response) => {
  response.json(users)
})

app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const user = users.find(user => user.id === id)

  if (user) {
    response.send(user)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  users = users.filter(user => user.id !== id)
  response.status(204).end()
})

app.post('/api/users', (request, response) => {
  const user = request.body
  if (!user || !user.email) {
    return response.status(400).json({
      error: 'user.email is missing'
    })
  }
  const ids = users.map(user => user.id)
  const maxId = Math.max(...ids)

  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    id: maxId + 1
  }

  users = users.concat(newUser)

  response.status(201).json(newUser)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
