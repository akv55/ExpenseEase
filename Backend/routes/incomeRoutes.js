const express = require('express');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/incomeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addIncome);
router.get('/', authMiddleware, getIncomes);
router.delete('/:id', authMiddleware, deleteIncome);

module.exports = router;
