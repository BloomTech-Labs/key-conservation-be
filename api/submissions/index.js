const express = require("express");

const router = express.Router();

const Submission = require("../../models/submissionsModel");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);
    if (submission) {
      res.status(200).json({ submission });
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
    const newSubmission = await Submission.insert(postSub);
    if (newSubmission) {
      res.status(201).json({ newSubmission, msg: "Submission added to database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to add submission" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const updatedSubmission = await Submission.update(decision, id);
    if (updatedSubmission) {
      // still need to change all other submissions to denied under the same request,
      // but need skilled impact model for that. for now, just update that submission
      res.status(201).json({ updatedSubmission, msg: "Submission updated in database" });
    }
  } catch (err) {
    res.status(500).json({ err, msg: "Unable to update submission" });
  }
});

module.exports = router;
