const express = require('express');
const router = express.Router();

const Camp = require('./campModel');

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// This creates an authenticated S3 instance
const s3 = new aws.S3({
    apiVersion: "2006-03-01",
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        accessKeyId: process.env.S3_ACCESS_KEY_ID
    }
});

// This is middleware that will process the multipart file upload
const upload = multer({
    storage: multerS3({
        s3, // The s3 instance from above
        // The name of your S3 bucket
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: (req, file, next) => {
            // This names the file. This example prepends the
            // UNIX timestamp to original name of the file,
            // which helps with duplicate file names
            next(null, `files/${Date.now()}_${file.originalname}`);
        }
    })
});

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

router.get('/camp/:id', async (req, res) => {
  try {
    const camp = await Camp.findCampById(req.params.id);
    if (camp) {
      res
        .status(200)
        .json({ camp, msg: 'The campaigns were found for this org' });
    } else {
      res
        .status(404)
        .json({ msg: 'Did not find the campaign by this user id(' });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ e, msg: 'Unable to find that Campagain by user ID' });
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  const { camp_cta, camp_desc, camp_name, users_id } = req.body
  const { location } = req.file

  const postCamp = {
    camp_cta: camp_cta,
    camp_desc: camp_desc,
    camp_name: camp_name,
    users_id: users_id,
    camp_img: location
  }

  try {
    const newCamps = await Camp.insert(postCamp);
    if (newCamps) {
      console.log(newCamps)
      res.status(201).json({ newCamps, msg: 'Campaign added to database' });
    } else {
      if (!campaign_img || !campaign_name || !campaign_desc || !campaign_cta) {
        console.log('no data')
        res.status(404).json({
          msg:
            'You need campaign image, campaign name, and campaign description'
        });
      }
    }
  } catch (err) {
    console.log(err.message)
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
