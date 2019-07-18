const express = require('express');
const router = express.Router();

const Camp = require('../Models/campModel');

router.get('/', async (req, res) => {
  try {
    const camp = await Camp.find();

    if (camp) {
      res.status(200).json({ camp, msg: 'The campaigns were found' });
    } else {
      res.status(404).json({ msg: 'Campaigns were not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (camp) {
      res.status(200).json({ camp, msg: 'The campaign was found' });
    } else {
      res.status(404).json({ msg: 'Campaign was not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.post('/', async (req, res) => {
  const camp = req.body;

  try {
    const newCamps = await Camp.insert(camp);
    if (newCamps) {
      res.status(201).json({ newCamps, msg: 'Campaign added to database' });
    } else {
      if (!campaign_img || !campaign_name || !campaign_desc || !campaign_cta) {
        res.status(404).json({
          msg:
            'You need campaign image, campaign name, and campaign description'
        });
      }
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to add campaign' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const newCamps = req.body;
  try {
    const editCamp = await Camp.update(newCamps, id);
    if (editCamp) {
      res.status(200).json({ msg: 'Successfully updated campaign', editCamp });
    } else {
      res.status(404).json({ msg: 'The campaign would not be updated' });
    }
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ err, msg: 'Unable to update campaign to the server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const camps = await Camp.remove(id);
    if (camps) {
      res.status(200).json(camps);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign ID' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to delete campaign from server' });
  }
});

module.exports = router;
