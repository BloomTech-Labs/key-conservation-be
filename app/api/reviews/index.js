const express = require('express');

const router = express.Router();

const ProjectReviews = require('../../database/models/projectReviewsModel');

router.post('/', async (req, res) => {
  try {
    const reviews = [req.body.likely_to_recommend, req.body.supporter_communication, req.body.provided_value];
    const validMetrics = reviews.filter((r) => !r.isInteger() || r < 1 || r > 5).length === 0;
    if (!validMetrics) return res.status(400).json({ message: 'Incorrect input for review' });
    const [projectReview] = await ProjectReviews.insert(req.body);
    return res.status(201).json({ projectReview });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to add review' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectReview = await ProjectReviews.findById(id);
    if (!projectReview) return res.status(404).json({ message: 'Review not found in the database' });
    return res.status(200).json({ projectReview, msg: 'Review was found' });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to make request to server' });
  }
});

module.exports = router;
