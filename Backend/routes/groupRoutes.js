const express= require('express');
const { createGroup, getGroups, getGroupById } = require('../controllers/groupController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.route('/').get(getGroups).post(createGroup);
router.route('/:groupId').get(getGroupById);

module.exports = router;
