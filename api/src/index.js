require('dotenv').config()

const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const ticketsRoutes = require('./routes/tickets.routes')

const app = express()
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