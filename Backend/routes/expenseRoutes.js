const express= require('express');
const wrapAsync = require('../utils/wrapAsync.js');
const { addExpense, getExpenses } = require('../controllers/expenseController');
const protect = require('../middleware/middleware');

const router = express.Router();

router.post('/', protect, wrapAsync(addExpense));
router.get('/', protect, wrapAsync(getExpenses));

module.exports = router;
