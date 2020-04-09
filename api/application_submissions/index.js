const express = require('express');

const router = express.Router();

const ApplicationSubmission = require('../../models/applicationSubmissionsModel');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const applicationSubmission = await ApplicationSubmission.findById(id);
    if (applicationSubmission) {
      res.status(200).json({ applicationSubmission, error: null });
    } else {
      res.status(404).json({ message: 'Submission not found in the database' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error, message: 'Unable to make request to server' });
  }
});

router.post('/', async (req, res) => {
  const postSubmission = {
    ...req.body,
    decision: 'PENDING',
  };
  try {
    const [applicationSubmission] = await ApplicationSubmission.insert(
      postSubmission
    );
    res.status(201).json({ applicationSubmission });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to add submission' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    let applicationSubmission = await ApplicationSubmission.findById(id);
    if (applicationSubmission) {
      if (decision === 'ACCEPTED') {
        const { skilled_impact_request_id } = applicationSubmission;
        applicationSubmission = await ApplicationSubmission.acceptAndDenyAllOthers(
          id,
          skilled_impact_request_id
        );
      } else {
        applicationSubmission = await ApplicationSubmission.update(
          id,
          decision
        );
      }
      res
        .status(200)
        .json({
          applicationSubmission,
          message: 'Submission updated in database',
        });
    } else {
      res.status(404).json({ message: 'Submission not found in database' });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to update submission' });
  }
});

module.exports = router;
