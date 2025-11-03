const express= require('express');
const { createGroup, getGroups } = require('../controllers/groupController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.route('/').get(getGroups).post(createGroup);

module.exports = router;
