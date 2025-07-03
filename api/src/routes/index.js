const express = require("express");
const db = require("../db");
const { verifyToken, requireRole } = require("../middlewares/auth");
const router = express.Router();

router.post("/", verifyToken, requireRole(["admin"]), async (req, res) => {
  const item = await db.create(req.body);
  res.status(201).json(item);
});

router.get(
  "/",
  verifyToken,
  requireRole(["admin", "user"]),
  async (req, res) => {
    const items = await db.getAll();
    res.json(items);
  }
);

router.get(
  "/:id",
  verifyToken,
  requireRole(["admin", "user"]),
  async (req, res) => {
    const item = await db.get(req.params.id);
    res.json(item);
  }
);

router.put("/:id", verifyToken, requireRole(["admin"]), async (req, res) => {
  const updated = await db.update(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", verifyToken, requireRole(["admin"]), async (req, res) => {
  await db.delete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
