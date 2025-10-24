const express = require('express');
const { addIncome, getIncomes } = require('../controllers/incomeController');
const  protect= require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addIncome);
router.get('/', protect, getIncomes);

module.exports = router;
