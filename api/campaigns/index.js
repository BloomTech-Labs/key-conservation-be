const express = require('express');
const router = express.Router();

const Camp = require('../../models/campaignModel');

const mw = require('../../middleware/s3Upload');

router.get('/', async (req, res) => {
  try {
    console.log("here");
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

router.get('/:id', (req, res) => {
    const { id } = req.params

    Camp.findCampaign(id)
      .then(result => {
        console.log(result)
        if (result) {
          Camp.findById(id)
            .then(camp => res.status(200).json({ camp, msg: 'The campaign was found' }))
            .catch(err => res.status(500).json({ err, msg: 'Unable to make request to server' }))
        } else {
          res.status(400).json({ msg: 'Campaign was not found in the database' });
        }
      })

});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params

  Camp.findUser(id)
    .then(result => {
      console.log(result, 'result')
      if (result) {
        Camp.findCampByUserId(id)
          .then(camp => res.status(200).json({ camp, msg: 'The campaigns were found for this org' }))
          .catch(err => res.status(500).json({ msg: 'Unable to find that Campagain by user ID' }))
      } else {
        res.status(404).json({ msg: 'Did not find the campaign by this user id' })
      }
    })
});

router.post('/', mw.upload.single('photo'), async (req, res) => {
  const { location } = req.file;

  const postCamp = {
    ...req.body,
    camp_img: location
  };

  try {
    const newCamps = await Camp.insert(postCamp);
    if (newCamps) {
      console.log(newCamps);
      res.status(201).json({ newCamps, msg: 'Campaign added to database' });
    } else {
      if (!camp_img || !camp_name || !camp_desc || !camp_cta) {
        console.log('no data');
        res.status(404).json({
          msg:
            'You need campaign image, campaign name, and campaign description'
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err, msg: 'Unable to add campaign' });
  }
});

router.put('/:id', mw.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  let location;
  if (req.file) {
    location = req.file.location;
  }

  const newCamps = {
    ...req.body,
    camp_img: location
  };

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
