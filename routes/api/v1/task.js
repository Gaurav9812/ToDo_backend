const express = require("express");
const router = express.Router();
const passport = require("passport");
const taskController = require("../../../controller/taskController");

router.post(
  "/createTask",
  passport.authenticate("jwt", { session: false }),
  taskController.createTask
);
router.post(
  "/editTask/:id",
  passport.authenticate("jwt", { session: false }),
  taskController.update
);
router.delete(
  "/deleteTask/:id",
  passport.authenticate("jwt", { session: false }),
  taskController.deleteTask
);

module.exports = router;
