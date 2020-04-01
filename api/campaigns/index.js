const express = require('express');
const log = require('../../logger');

const router = express.Router();

const Reports = require('../../models/reportModel');
const Users = require('../../models/usersModel');
const Campaigns = require('../../models/campaignModel');
const ApplicationSubmissions = require('../../models/applicationSubmissionsModel');
const SkilledImpactRequests = require('../../models/skilledImpactRequestsModel');
const S3Upload = require('../../middleware/s3Upload');

const pick = require('../../util/pick.js');

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaigns.find();
    res.status(200).json({ campaigns, msg: 'The campaigns were found' });
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to make request to server' });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Campaigns.findCampaign(id).then((result) => {
    if (result) {
      return Campaigns.findById(id);
    }
    res.status(400).json({ msg: 'Campaign was not found in the database' });
  }).then(async (campaign) => {
    // If this campaign belongs to a deactivated account, then
    // only an admin should be able to see it

    if (campaign.is_deactivated) {
      const user = await Users.findBySub(req.user.sub);
      if (!user.admin) {
        return res.status(401).json({ msg: 'This campaign may only be viewed by an administrator' });
      }
    }
    return res.status(200).json({ campaign, msg: 'The campaign was found' });
  })
    .catch((err) => {
      log.error(err);
      res.status(500).json({ err, msg: 'Unable to make request to server' });
    });
});

router.get('/camp/:id', (req, res) => {
  const { id } = req.params;

  // TODO Campaigns.findUser is a duplicate of Users.findUser so use that instead
  Campaigns.findUser(id)
    .then((result) => {
      log.info(result);
      if (result) {
        if (result.is_deactivated) {
          return Users.findBySub(req.user.sub);
        }
      } else {
        return res.status(404).json({ msg: 'Did not find the campaign by this user id' });
      }
    })
    .then((user) => {
      if (user && !user.admin) {
        return res.status(401).json({
          msg: "This user's campaigns may only be viewed by an administrator",
        });
      } return Campaigns.findCampByUserId(id);
    })
    .then((campaign) => {
      if (campaign) {
        return res.status(200).json({ campaign, msg: 'The campaigns were found for this org' });
      }
    })
    .catch((err) => res.status(500).json({ msg: err.message }));
});

router.get('/:id/submissions', async (req, res) => {
  const { id } = req.params;
  try {
    const applicationSubmissions = await ApplicationSubmissions.findAllByCampaignId(id);
    res.status(200).json({ applicationSubmissions, error: null });
  } catch (error) {
    res.status(500).json({ error, message: 'Unable to make request to server' });
  }
});

router.post('/', S3Upload.upload.single('photo'), async (req, res) => {
  const { location } = req.file;
  const campaign_props = ['user_id', 'name', 'description', 'call_to_action', 'urgency'];

  const postCampaign = {
    ...pick(req.body, campaign_props),
    image: location,
  };

  try {
    const newCampaigns = await Campaigns.insert(postCampaign);
    const newSkilledImpactRequests = await SkilledImpactRequests.insertSkilledImpactRequests(req.body.skilled_impact_requests, newCampaigns.id);
    if (newCampaigns && newSkilledImpactRequests) {
      log.info('inserted campaign including skilled impact requests', newCampaigns, newSkilledImpactRequests);
      res.status(201).json({ newCampaigns, msg: 'Campaign added to database' });
    } else if (
      !postCampaign.image
        || !postCampaign.name
        || !postCampaign.description
        || !postCampaign.call_to_action
        || !req.body.skilled_impact_requests
    ) {
      log.info('no data');
      res.status(404).json({
        msg: 'You need campaign image, campaign name, campaign description, and skilled impact requests',
      });
    }
  } catch (err) {
    log.error(err.message);
    res.status(500).json({ err, msg: 'Unable to add campaign' });
  }
});

router.put('/:id', S3Upload.upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  let location;
  if (req.file) {
    location = req.file.location;
  }

  const newCampaigns = {
    ...req.body,
    image: location,
  };

  try {
    const campaign = await Campaigns.findById(id);
    const user = await Users.findBySub(req.user.sub);

    if (campaign.user_id !== user.id && !user.admin) {
      return res.status(401).json({ msg: 'Unauthorized: You may not modify this campaign' });
    }

    const editCampaign = await Campaigns.update(newCampaigns, id);
    if (editCampaign) {
      res.status(200).json({ msg: 'Successfully updated campaign', editCampaign });
    } else {
      res.status(404).json({ msg: 'The campaign would not be updated' });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ err, msg: 'Unable to update campaign to the server' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findBySub(req.user.sub);
    const campaign = await Campaigns.findById(id);

    if (campaign.user_id !== user.id) {
      if (user.admin) {
        // Strike this user
        const targetUsr = await Users.findById(campaign.user_id);

        if (!targetUsr.is_deactivated) {
          const updates = {
            strikes: targetUsr.strikes + 1,
          };

          await Users.update(updates, targetUsr.id);
        }
      } else {
        return res.status(401).json({ msg: 'Unauthorized: You may not delete this campaign' });
      }
    }

    const campaigns = await Campaigns.remove(id);

    // Remove all reports relating to this post
    await Reports.removeWhere({ post_id: id, table_name: 'campaigns' });

    if (campaigns) {
      res.status(200).json(campaigns);
    } else {
      res.status(404).json({ msg: 'Unable to find campaign ID' });
    }
  } catch (err) {
    res.status(500).json({ err, msg: 'Unable to delete campaign from server' });
  }
});

module.exports = router;
