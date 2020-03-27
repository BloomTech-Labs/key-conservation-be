const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Campaigns = require('../../models/campaignModel');
const CampaignUpdate = require('../../models/updateModel');
const Users = require('../../models/usersModel');
const Reports = require('../../models/reportModel');

const S3Upload = require('../../middleware/s3Upload');

router.get('/', async (req, res) => {
  try {
    const campaignUpdate = await CampaignUpdate.find();
    if (campaignUpdate) {
      res.status(200).json({ campaignUpdate, msg: 'The campaign updates were found' });
    } else {
      res.status(404).json({ msg: 'Campaign updates were not found in the database' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaignUpdate = await CampaignUpdate.findById(req.params.id);

    if (campaignUpdate.is_deactivated) {
      const usr = await Users.findBySub(req.user.sub);

      if (!usr.admin) {
        return res.status(401).json({ msg: 'This post may only be viewed by an administrator' });
      }
    }

    if (campaignUpdate) {
      res.status(200).json({ campaignUpdate, msg: 'The campaign update was found' });
    } else {
      res.status(404).json({ msg: 'Campaign update was not found in the database' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params;

  CampaignUpdate.findCamp(id)
    .then((result) => {
      if (result) {
        return result.is_deactivated ? Users.findBySub(req.user.id) : null;
      }
      return res.status(400).json({ msg: 'This campaign does not exist' });
    })
    .then((user) => {
      if (user && !user.admin) {
        return res.status(401).json({ msg: 'This post may only be viewed by an administrator' });
      }
      return CampaignUpdate.findUpdatesByCamp(id);
    })
    .then((updates) => {
      if (updates[0]) {
        return res.status(200).json({ updates, msg: 'The updates were found for this campaign' });
      }
      return res.status(400).json({ msg: 'This campaign does not have an update yet' });
    })
    .catch((err) => res.status(500).json({ err, msg: 'Unable to make request to server' }));
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  const campaign = await Campaigns.findById(req.body.campaign_id);

  let postCampaignUpdate = {
    ...req.body,
    name: campaign.name,
  };
  let location;
  if (req.file) {
    location = req.file.location;
    postCampaignUpdate = {
      ...postCampaignUpdate,
      image: location,
    };
  }

  try {
    const campaignUpdate = await CampaignUpdate.insert(postCampaignUpdate);
    if (campaignUpdate) {
      log.info(campaignUpdate);
      res.status(201).json({ campaignUpdate, msg: 'Campaign update added to database' });
      // TODO these variables aren't declared anyways? update_img and update_desc
    // } else if (!update_img || !update_desc) {
    //   res.status(404).json({
    //     msg: 'You need an update image and an update description',
    //   });
    }
  } catch (err) {
    log.error(err.message);
    res.status(500).json({ err, msg: 'Unable to add update' });
  }
});

router.put('/:id', S3Upload.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  let location;
  if (req.file) {
    location = req.file.location;
  }

  const newCampaignUpdates = {
    ...req.body,
    image: location,
  };

  try {
    let campaignUpdate = await CampaignUpdate.findById(id);
    const usr = await Users.findBySub(req.user.sub);

    if (usr.id !== campaignUpdate.user_id && !usr.admin) {
      return res.status(401).json({ msg: 'Unauthorized: You may not modify this post' });
    }

    campaignUpdate = await CampaignUpdate.update(newCampaignUpdates, id);

    if (campaignUpdate) {
      res.status(200).json({ msg: 'Successfully updated campaign update', campaignUpdate });
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
    const usr = await Users.findBySub(req.user.sub);
    const campaignUpdate = await CampaignUpdate.findById(id);

    if (campaignUpdate.user_id !== usr.id) {
      if (usr.admin) {
        // Strike this user
        const campaign = await Campaigns.findById(campaignUpdate.campaign_id);

        const targetUsr = await Users.findById(campaign.user_id);

        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1,
          };

          await Users.update(updates, targetUsr.id);
        }
      } else {
        return res.status(401).json({ msg: 'Unauthorized: You may not delete this post' });
      }
    }

    const campaignUpdates = await CampaignUpdate.remove(id);

    // Remove all reports relating to this update

    await Reports.removeWhere({ post_id: id, table_name: 'campaign_updates' });

    if (campaignUpdates) {
      res.status(200).json(campaignUpdates);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign update ID' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to delete campaign update from server' });
  }
});

module.exports = router;
