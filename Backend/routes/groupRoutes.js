const express= require('express');
const { createGroup, getGroups, getGroupById } = require('../controllers/groupController');
const protect = require('../middleware/authMiddleware');
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

router.use(protect);
router.route('/').get(wrapAsync(getGroups)).post(wrapAsync(createGroup));
router.route('/:groupId').get(wrapAsync(getGroupById));

module.exports = router;
