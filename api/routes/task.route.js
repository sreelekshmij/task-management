const express = require("express");
const { authenticate } = require("../middleware/auth");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  taskController.createTask
);
router.get("/", authenticate, taskController.getAllTasks);

router.get("/:id", authenticate, taskController.getTaskById);
router.patch("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);

module.exports = router;