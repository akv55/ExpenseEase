const express = require("express");
const protect = require("../middleware/middleware");
const wrapAsync = require("../utils/wrapAsync");
const {
  sendGroupInvites,
  getMyInvites,
  respondToInvite,
} = require("../controllers/groupInviteController");

const router = express.Router();

router.use(protect);

router.post("/send", wrapAsync(sendGroupInvites));
router.get("/", wrapAsync(getMyInvites));
router.post("/:inviteId/respond", wrapAsync(respondToInvite));

module.exports = router;
