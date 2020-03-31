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
    res.status(500).json({ error, message: 'Unable to make request to server' });
  }
});

router.post('/', async (req, res) => {
  const postSubmission = {
    ...req.body,
    decision: 'PENDING',
  };
  try {
    const [applicationSubmission] = await ApplicationSubmission.insert(postSubmission);
    res.status(201).json({ applicationSubmission });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to add submission' });
  }
});

router.put('/', async (req, res) => {
  const { ids } = req.body; 
  const { decision } = req.body;

  try {
    const applicationSubmissions = await ApplicationSubmission.updateAll(ids, decision);
    // return 200 if all submissions successfully updated
    if(applicationSubmissions.length == ids.length) {
      res.status(200).json({ applicationSubmissions, message: 'Submissions updated in database' });
    }
    // return 404 if no submissions found, else return 202 (accepted, but some processing still needed)
    // for when some submissions are updated and some aren't
    else if(applicationSubmissions.length == 0){ 
      res.status(404).json({ message: 'Submissions not found in database' });
    }
    else {
      const numSubmissionsFound = applicationSubmissions.length;
      const numSubmissionsNotFound = ids.length - numSubmissionsFound;
      res.status(202).json({
        applicationSubmissions,
        message: `${numSubmissionsFound} submissions updated in database, ${numSubmissionsNotFound} submissions not found in database`
      });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to update submission' });
  }
});

module.exports = router;
