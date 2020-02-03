const express = require('express');
const router = express.Router();

const db = require('../../database/dbConfig');

const Reports = require('../../models/reportModel');
const Users = require('../../models/usersModel');

const checkFields = require('../../util/checkFields');

// This is something I had to do due to the
// unnecessary variation of primary key names
const assignIdTag = table_name => {
  switch (table_name) {
    case 'comments': {
      return `comment_id`;
    }
    case 'campaigns': {
      return `camp_id`;
    }
    case 'campaignUpdates': {
      return `update_id`;
    }
    default: {
      return `id`;
    }
  }
};

// Retrieve all reports
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    let { page } = req.query;

    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error('Only an admin is authorized to view reports!');

    // Retrieve reports
    let response = await Reports.find();

    // Calculate section of response to be returned
    const RESULTS_PER_PAGE = 25;
    let startIndex = 0;
    let endIndex = RESULTS_PER_PAGE;

    if (page) {
      page = parseInt(page);
      startIndex = page * RESULTS_PER_PAGE;
      endIndex = startIndex + RESULTS_PER_PAGE;
    }

    // Make sure our end index does not overshoot
    if (endIndex > response.length) endIndex = response.length;

    const reports = response.slice(startIndex, endIndex);

    // Slice our response to desired section
    response = {
      // How many pages of data are available?
      pages: Math.ceil(response.length / RESULTS_PER_PAGE),
      // For each report, we will need to format it to maximize
      // usefulness to the frontend, and minimize requests to the
      // backend
      reports: await Promise.all(
        reports.map(async report => {
          // Get data on the reported item
          const user = await Users.findById(report.reported_user);

          // How many times has this item been reported?
          const duplicates = await Reports.find({
            reported_user: report.reported_user,
            post_id: report.post_id,
            table_name: report.table_name
          });

          const unique_reports = duplicates.length;

          return {
            id: report.id,
            reported_by: report.reported_by,
            report_desc: report.report_desc,
            reported_at: report.reported_at,
            table_name: report.table_name,
            unique_reports, // How many unique reports have been made about this?
            image: user.profile_image, // Image of reported account/post goes here
            name: user.username // Name of the reported account/post
          };
        })
      )
    };

    return res.status(200).json(response);
  } catch (err) {
    // console.log(err.message);
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred'
    });
  }
});

// Retrieve a specific report
router.get('/:id', async (req, res) => {
  try {
    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error('Only an admin is authorized to view reports!');

    const response = await Reports.findById(req.params.id);

    const otherReports = await Reports.find({reported_user: response.reported_user});

    response.other_reports = otherReports.filter(report => report.id === req.params.id);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    // Make sure body contains all necessary fields
    const required = ['postId', 'postType'];
    const error = checkFields(required, req.body);
    if (error) throw new Error(error);

    const types = ['users', 'campaigns', 'campaignUpdates', 'comments'];

    // Make sure provided type is a valid table name
    if (!types.includes(req.body.postType))
      throw new Error(
        `Field 'postType' must be one of the following valid types: ${types}`
      );

    // Make sure that item of provided id exists in provided table
    const [item] = await db(req.body.postType).where({
      [assignIdTag(req.body.postType)]: req.body.postId
    });

    if (!item) {
      throw new Error(
        `An item of id ${req.body.postId} in table ${req.body.postType} does not exist`
      );
    }

    // Get user id
    const userId = (await Users.findBySub(req.user.sub)).id;

    // Who's being reported?
    let reportedUserId;

    switch(req.body.postType) {
      case types[1]: {
        // Campaigns

        // Get the campaign
        const [camp] = await db('campaigns').where({camp_id: req.body.postId});
        // Get 'users_id' from campaign
        reportedUserId = camp.users_id;
        break;
      }
      case types[2]: {
        // Campaign Updates

        // Get campaign update
        const [camp_update] = await db('campaignUpdates').where({update_id: req.body.postId});
        // Get campaign from campaign update
        const [campaign] = await db('campaigns').where({camp_id: camp_update.camp_id});
        // Get 'users_id' from campaign
        reportedUserId = campaign.users_id;
        break;
      }
      case types[3]: {
        // Comments
        // Get comment
        const [comment] = await db('comments').where({comment_id: req.body.postId});
        // Get 'users_id' from comment
        reportedUserId = comment.users_id;
        break;
      }
      default: {
        reportedUserId = req.body.postId;
        break;
      }
    }

    // Make sure this reported hasn't already been made
    const duplicates = await Reports.find({
      reported_by: userId,
      post_id: req.body.postId,
      table_name: req.body.postType,
      reported_user: reportedUserId
    });

    if(duplicates.length > 0) {
      return res.sendStatus(200);
    }

    // Construct report object
    const report = {
      reported_by: userId,
      post_id: req.body.postId,
      table_name: req.body.postType,
      report_desc: req.body.desc || '',
      reported_user: reportedUserId
    };

    // Save report in database
    await Reports.insert(report);

    // Return a status of 201 CREATED
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred'
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error('Only an admin is authorized to delete reports!');

    // Extract report ID from params
    const { id } = req.params;

    // Try to delete report
    await Reports.remove(id);

    // Respond with 200 OK
    res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred.'
    });
  }
});

module.exports = router;
