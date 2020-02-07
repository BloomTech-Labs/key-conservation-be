const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Campaigns = require('../../models/campaignModel');
const CampUpdate = require('../../models/updateModel');
const Users = require('../../models/usersModel');

const mw = require('../../middleware/s3Upload');

router.get('/', async (req, res) => {
  try {
    const campUpdate = await CampUpdate.find();
    if (campUpdate) {
      res
        .status(200)
        .json({ campUpdate, msg: 'The campaign updates were found' });
    } else {
      res
        .status(404)
        .json({ msg: 'Campaign updates were not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campUpdate = await CampUpdate.findById(req.params.id);

    if (campUpdate.is_deactivated) {
      const usr = await Users.findBySub(req.user.sub);

      if (!usr.admin) {
        return res
          .status(401)
          .json({ msg: 'This post may only be viewed by an administrator' });
      }
    }

    if (campUpdate) {
      res
        .status(200)
        .json({ campUpdate, msg: 'The campaign update was found' });
    } else {
      res
        .status(404)
        .json({ msg: 'Campaign update was not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params;

  CampUpdate.findCamp(id)
    .then(result => {
      if (result) {
        if (result.is_deactivated) {
          return Users.findBySub(req.user.id);
        } else return null;
      } else {
        return res.status(400).json({ msg: 'This campaign does not exist' });
      }
    })
    .then(user => {
      log.info(user);

      if (user && !user.admin) {
        return res
          .status(401)
          .json({ msg: 'This post may only be viewed by an administrator' });
      } else return CampUpdate.findUpdatesByCamp(id);
    })
    .then(updates => {
      if (updates[0]) {
        return res
          .status(200)
          .json({ updates, msg: 'The updates were found for this campaign' });
      } else {
        return res
          .status(400)
          .json({ msg: 'This campaign does not have an update yet' });
      }
    })
    .catch(err =>
      res.status(500).json({ err, msg: 'Unable to make request to server' })
    );
});

router.post('/', mw.upload.single('photo'), async (req, res) => {
  let postCampUpdate = req.body;
  let location;
  if (req.file) {
    location = req.file.location;
    postCampUpdate = {
      ...req.body,
      update_img: location
    };
  }

  try {
    const newCampUpdates = await CampUpdate.insert(postCampUpdate);
    if (newCampUpdates) {
      log.info(newCampUpdates);
      res
        .status(201)
        .json({ newCampUpdates, msg: 'Campaign update added to database' });
    } else if (!update_img || !update_desc) {
      res.status(404).json({
        msg: 'You need an update image and an update description'
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
    update_img: location
  };

  try {
    const campUpdate = await CampUpdate.findById(id);
    const usr = await Users.findBySub(req.user.id);

    if (usr.id !== campUpdate.users_id && !usr.admin)
      return res
        .status(401)
        .json({ msg: 'Unauthorized: You may not modify this post' });

    const editCampUpdate = await CampUpdate.update(newCampUpdates, id);

    if (editCampUpdate) {
      res
        .status(200)
        .json({ msg: 'Successfully updated campaign update', editCampUpdate });
    } else {
      res.status(404).json({ msg: 'The campaign update would not be updated' });
    }
  } catch (err) {
    log.error(err);

    res.status(500).json({ err, msg: 'Unable to update the update' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const campUpdate = await CampUpdate.findById(id);

    if (campUpdate.users_id !== usr.id) {
      const usr = await Users.findBySub(req.user.sub);

      if (usr.admin) {
        // Strike this user
        const camp = await Campaigns.findById(campUpdate.camp_id);

        const targetUsr = await Users.findById(camp.users_id);

        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1
          };

          await Users.update(updates, targetUsr.id);
        }
      } else
        return res
          .status(401)
          .json({ msg: 'Unauthorized: You may not delete this post' });
    }

    const campUpdates = await CampUpdate.remove(id);
    if (campUpdates) {
      res.status(200).json(campUpdates);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign update ID' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err, msg: 'Unable to delete campaign update from server' });
  }
});

module.exports = router;
