const express = require('express');
const log = require('../../logger');

const router = express.Router();

const CampUpdate = require('../../models/updateModel');

const mw = require('../../middleware/s3Upload');

router.get('/', async (req, res) => {
  try {
    const campUpdate = await CampUpdate.find();
    if (campUpdate) {
      res.status(200).json({ campUpdate, msg: 'The campaign updates were found' });
    } else {
      res.status(404).json({ msg: 'Campaign updates were not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campUpdate = await CampUpdate.findById(req.params.id);
    if (campUpdate) {
      res.status(200).json({ campUpdate, msg: 'The campaign update was found' });
    } else {
      res.status(404).json({ msg: 'Campaign update was not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params;

  CampUpdate.findCamp(id)
    .then((result) => {
      if (result) {
        CampUpdate.findUpdatesByCamp(id)
          .then((campUpdates) => {
            log.info(campUpdates);
            if (campUpdates[0]) {
              res.status(200).json({ campUpdates, msg: 'The updates were found for this campaign' });
            } else {
              res.status(400).json({ msg: 'This campaign does not have an update yet' });
            }
          })
          .catch((err) => res.status(500).json({ err, msg: 'Unable to make request to server' }));
      } else {
        res.status(400).json({ msg: 'This campaign does not exist' });
      }
    });
});

router.post('/', mw.upload.single('photo'), async (req, res) => {
  let postCampUpdate = req.body;
  let location;
  if (req.file) {
    location = req.file.location;
    postCampUpdate = {
      ...req.body,
      update_img: location,
    };
  }

  try {
    const newCampUpdates = await CampUpdate.insert(postCampUpdate);
    if (newCampUpdates) {
      log.info(newCampUpdates);
      res.status(201).json({ newCampUpdates, msg: 'Campaign update added to database' });
    } else if (!update_img || !update_desc) {
      res.status(404).json({
        msg:
            'You need an update image and an update description',
      });
    }
  } catch (err) {
    log.error(err.message);
    res.status(500).json({ err, msg: 'Unable to add update' });
  }
});

router.put('/:id', mw.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  let location;
  if (req.file) {
    location = req.file.location;
  }

  const newCampUpdates = {
    ...req.body,
    update_img: location,
  };

  try {
    const editCampUpdate = await CampUpdate.update(newCampUpdates, id);
    if (editCampUpdate) {
      res.status(200).json({ msg: 'Successfully updated campaign update', editCampUpdate });
    } else {
      res.status(404).json({ msg: 'The campaign update would not be updated' });
    }
  } catch (err) {
    log.error(err);

    res
      .status(500)
      .json({ err, msg: 'Unable to update the update' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const campUpdates = await CampUpdate.remove(id);
    if (campUpdates) {
      res.status(200).json(campUpdates);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign update ID' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to delete campaign update from server' });
  }
});

module.exports = router;
