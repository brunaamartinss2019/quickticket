const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')
const { error } = require('node:console')

const register = async (req, res) => {
    const {name, email, password } = req.body
    try {
        const hash = await bcrypt.hash(password, 10)
        const result= await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email',
            [name, email, hash]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(400).json({error: 'Email ya existe'})
    }
}

const login = async(req, res) => {
    const {email, password } = req.body
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        const user = result.rows[0]
        if (!user) return res.status(401).json({ error: 'Credentiales invalidas' })

        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(401).json({ error: 'credentiales invalidas' })

        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        res.json({ token })
    } catch(err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}
module.exports = { register, login}