const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware')
const {
    getTickets, 
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
} = require('../controllers/tickets.controller')

router.get('/', authMiddleware, getTickets)
router.get('/:id', authMiddleware, getTicketById)
router.post('/', authMiddleware, createTicket)
router.put('/:id', authMiddleware, updateTicket)
router.delete('/:id', authMiddleware, deleteTicket)

module.exports = router