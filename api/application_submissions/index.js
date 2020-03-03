const express = require("express");

const router = express.Router();

const ApplicationSubmission = require("../../models/applicationSubmissionsModel");


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await ApplicationSubmission.findById(id);
    if (submission) {
      res.status(200).json({ submission, error: null });
    } else {
      res.status(400).json({ message: "Submission not found in the database" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Unable to make request to server" });
  }
});

router.post("/", async (req, res) => {
  const postSub = {
    ...req.body,
    decision: "PENDING"
  };
  try {
    const [newSubmission] = await ApplicationSubmission.insert(postSub);
    if (newSubmission) {
      res.status(201).json({ newSubmission, message: "Submission added to database" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Unable to add submission" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    // update all other submissions for that skilled impact request to denied
    const applicationSubmission = await ApplicationSubmission.findById(id);

    if(applicationSubmission) {
      const skilled_impact_request_id = applicationSubmission["skilled_impact_request_id"];
      const allSkilledImpactRequestSubmissions = 
            await ApplicationSubmission.findAllBySkilledImpactRequestId(skilled_impact_request_id);
      
      for(let i = 0; i < allSkilledImpactRequestSubmissions.length; i++) {
        await ApplicationSubmission.update(allSkilledImpactRequestSubmissions[i].id, "DENIED");
      }
      // now, update current submission
      const [updatedSubmission] = await ApplicationSubmission.update(id, decision);
      res.status(200).json({ updatedSubmission, message: "Submission updated in database" });

    } else {
      res.status(400).json({ message: "Submission not found in the database" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Unable to update submission" });
  }
});

module.exports = router;
