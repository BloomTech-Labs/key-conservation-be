const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Reports = require('../../models/reportModel');
const Users = require('../../models/usersModel');
const Camp = require('../../models/campaignModel');
const ApplicationSubmissions = require('../../models/applicationSubmissionsModel');

const mw = require('../../middleware/s3Upload');

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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Camp.findCampaign(id)
    .then(result => {
      log.info(result);
      if (result) {
        return Camp.findById(id);
      } else {
        res.status(400).json({ msg: 'Campaign was not found in the database' });
      }
    })
    .then(async camp => {
      // If this campaign belongs to a deactivated account, then
      // only an admin should be able to see it
      if (camp.is_deactivated) {
        const user = await Users.findBySub(req.user.sub);

        if (!user.admin) {
          return res.status(401).json({
            msg: 'This campaign may only be viewed by an administrator'
          });
        }
      }

      return res.status(200).json({ camp, msg: 'The campaign was found' });
    })
    .catch(err =>
      res.status(500).json({ err, msg: 'Unable to make request to server' })
    );
});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params;

  Camp.findUser(id)
    .then(result => {
      log.info(result);
      if (result) {
        if (result.is_deactivated) {
          return Users.findBySub(req.user.sub);
        }
      } else {
        return res
          .status(404)
          .json({ msg: 'Did not find the campaign by this user id' });
      }
    })
    .then(user => {
      if (user && !user.admin) {
        return res.status(401).json({
          msg: "This user's campaigns may only be viewed by an administrator"
        });
      } else return Camp.findCampByUserId(id);
    })
    .then(camp => {
      if (camp)
        return res
          .status(200)
          .json({ camp, msg: 'The campaigns were found for this org' });
    })
    .catch(err => {
      return res.status(500).json({ msg: err.message });
    });
});

router.get('/:id/submissions', async (req, res) => {
  
  const { id } = req.params;
  
  ApplicationSubmissions.findByCampaignId(id)
    .then(applicationSubmissions => {
      res.status(200).json({ applicationSubmissions });
    }).catch(error => {
      res.status(500).json({ error });
    })
})

router.post('/', mw.upload.single('photo'), async (req, res) => {
  const { location } = req.file;

  const postCamp = {
    ...req.body,
    camp_img: location
  };

  try {
    const newCamps = await Camp.insert(postCamp);
    if (newCamps) {
      log.info(newCamps);
      res.status(201).json({ newCamps, msg: 'Campaign added to database' });
    } else if (
      !postCamp.camp_img ||
      !postCamp.camp_name ||
      !postCamp.camp_desc ||
      !postCamp.camp_cta
    ) {
      log.info('no data');
      res.status(404).json({
        msg: 'You need campaign image, campaign name, and campaign description'
      });
    }
  } catch (err) {
    log.error(err.message);
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
    const camp = await Camp.findById(id);
    const user = await Users.findBySub(req.user.sub);

    if (camp.users_id !== user.id && !user.admin) {
      return res
        .status(401)
        .json({ msg: 'Unauthorized: You may not modify this campaign' });
    }

    const editCamp = await Camp.update(newCamps, id);
    if (editCamp) {
      res.status(200).json({ msg: 'Successfully updated campaign', editCamp });
    } else {
      res.status(404).json({ msg: 'The campaign would not be updated' });
    }
  } catch (err) {
    log.error(err);

    res
      .status(500)
      .json({ err, msg: 'Unable to update campaign to the server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findBySub(req.user.sub);
    const camp = await Camp.findById(id);

    if (camp.users_id !== user.id) {

      if (user.admin) {
        // Strike this user
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
          .json({ msg: 'Unauthorized: You may not delete this campaign' });
    }

    const camps = await Camp.remove(id);

    // Remove all reports relating to this post
    await Reports.removeWhere({post_id: id, table_name: 'campaigns'})

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
