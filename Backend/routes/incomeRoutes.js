const express = require('express');
const { addIncome, getIncomes } = require('../controllers/incomeController');
const protect = require('../middleware/middleware');
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

router.post('/', protect, wrapAsync(addIncome));
router.get('/', protect, wrapAsync(getIncomes));

module.exports = router;
