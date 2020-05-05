const express = require('express');

const router = express.Router();

const ProjectReviews = require('../../database/models/projectReviewsModel');

router.post('/', async (req, res) => {
  try {
    const reviews = [req.body.likely_to_recommend, req.body.supporter_communication, req.body.provided_value];
    let correctBool = true;
    for (let i = 0; i < reviews.length; i += 1) {
      if (!(reviews[i].isInteger() && reviews[i] >= 1 && reviews[i] <= 5)) {
        correctBool = false;
        break;
      }
    }
    if (correctBool) {
      const projectReview = await ProjectReviews.insert(req.body);
      res.status(201).json({ projectReview });
    } else {
      res.status(400).json({ message: 'Incorrect input for ratings' });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to add review' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectReview = await ProjectReviews.findById(id);
    if (projectReview) {
      res.status(200).json({ projectReview, msg: 'Review was found' });
    } else {
      res.status(404).json({ message: 'Review not found in the database' });
    }
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to make request to server' });
  }
});

module.exports = router;
