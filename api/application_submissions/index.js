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
      postSubmission,
    );
    res.status(201).json({ applicationSubmission });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to add submission' });
  }
});

router.put('/', async (req, res) => {
  const { ids } = req.body;
  const { decision } = req.body;

  try {
    // check if all of submissions exist first
    const idsFoundJSON = await ApplicationSubmission.findAllByIds(ids);
    const idsFound = idsFoundJSON.map((idJSON) => idJSON.id);
    if (idsFound.length === ids.length) {
      const applicationSubmissions = await ApplicationSubmission.updateAll(ids, decision);
      res.status(200).json({ applicationSubmissions, message: 'Submissions updated in database' });
    } else {
      // if any submissions are not present in database, then don't update anything
      const idsNotFound = ids.filter((id) => !idsFound.includes(id));
      res.status(400).json({
        message: `No submissions were updated. These id's sent were not found in database: ${idsNotFound}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to update submissions' });
  }
});

module.exports = router;
