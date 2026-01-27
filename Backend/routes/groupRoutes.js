const express= require('express');
const { createGroup, getGroups, getGroupById, deleteGroup, removeGroupMember } = require('../controllers/groupController');
const protect = require('../middleware/middleware');
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

router.use(protect);
router.route('/').get(wrapAsync(getGroups)).post(wrapAsync(createGroup));
router.route('/:groupId').get(wrapAsync(getGroupById)).delete(wrapAsync(deleteGroup));
router.delete('/:groupId/members/:memberId', wrapAsync(removeGroupMember));

module.exports = router;
