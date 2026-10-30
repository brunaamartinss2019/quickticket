require('dotenv').config()

const express = require('express')
const cors = require('cors')
const client = require('prom-client')

const authRoutes = require('./routes/auth.routes')
const ticketsRoutes = require('./routes/tickets.routes')

const app = express()

client.collectDefaultMetrics()

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duración de las peticiones HTTP',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2],
})

app.use((req, res, next) => {
  const end = httpDuration.startTimer()
  res.on('finish', () => {
    const route = req.originalUrl.split('?')[0].replace(/\/\d+/g, '/:id')
    end({ method: req.method, route, status: res.statusCode })
  })
  next()
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketsRoutes)

const authMiddleware = require('./middleware')
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso permitido', user: req.user })
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)  
})