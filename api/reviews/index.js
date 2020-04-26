const express = require('express');

const router = express.Router();

const ProjectReviews = require('../../models/projectReviewsModel');

router.post('/', async (req, res) => {
    try {
      const [projectReview] = await ProjectReviews.insert(req.body);
      res.status(201).json({ projectReview });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: 'Unable to add review' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const projectReviews = await ProjectReviews.findById(id);
      if (projectReviews) {
        res.status(200).json({ projectReviews, msg: "Review was found" });
      } else {
        res.status(404).json({ message: 'Review not found in the database' });
      }
    } catch (error) {
      res.status(500).json({ error, message: 'Unable to make request to server', });
    }
  });

module.exports = router;