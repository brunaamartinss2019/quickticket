const pool = require('../db')

const getTickets = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tickets WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.user_id]
        )
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const getTicketById = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tickets WHERE id = $1 AND user_id = $2',
            [req.params.id, req.user.user_id]
        )
        if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket no encontrado' })
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const createTicket = async (req, res) => {
    const { title, description, priority } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO tickets (title, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, priority, req.user.user_id]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const updateTicket = async (req, res) => {
    const { title, description, priority, status } = req.body
    try {
        const result = await pool.query(
            'UPDATE tickets SET title=$1, description=$2, priority=$3, status=$4, updated_at=NOW() WHERE id=$5 AND user_id=$6 RETURNING *',
            [title, description, priority, status, req.params.id, req.user.user_id]
        )
        if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket no encontrado' })
        res.json(result.rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}

const deleteTicket = async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM tickets WHERE id = $1 AND user_id = $2 RETURNING *',
            [req.params.id, req.user.user_id]
        )
        if (result.rows.length === 0) return res.status(404).json({ error: ' Ticket no encontrado' })
        res.json({ message: 'Ticket eliminado' })
    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' })
    }
}

module.exports = { getTickets, getTicketById, createTicket, updateTicket, deleteTicket }