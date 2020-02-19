const express = require("express");

const router = express.Router();

const Sub = require("../../models/submissionsModel");

// this async is needed, "pg-native" module not found error if not async, but why????
router.get("/", async (req, res) => {
  try {
    const subs = await Sub.find();
    if (subs) {
      res.status(200).json({ subs });
    } else {
      res.status(400).json({ message: "Submissions not found in the database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to make request to server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sub = await Sub.findById(id);
    if (sub) {
      res.status(200).json({ sub });
    } else {
      res.status(400).json({ message: "Submission not found in the database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to make request to server" });
  }
});

router.post("/", async (req, res) => {
  const postSub = {
    ...req.body,
    decision: "PENDING"
  };
  try {
    const newSub = await Sub.insert(postSub);
    if (newSub) {
      res.status(201).json({ newSub, msg: "Submission added to database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to add submission" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const updatedSub = await Sub.update(decision, id);
    if (updatedSub) {
      // still need to change all other submissions to denied under the same request,
      // but need skilled impact model for that. for now, just update that submission
      res.status(201).json({ updatedSub, msg: "Submission updated in database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to update submission" });
  }
});

module.exports = router;
