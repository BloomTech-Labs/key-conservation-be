const express = require('express');

const router = express.Router();

const db = require('../../database/dbConfig');
const log = require('../../logger');

const Reports = require('../../database/models/reportModel');
const Users = require('../../database/models/usersModel');

const checkFields = require('../../../util/checkFields');

const { getSimilarReportCount, assignIdTag } = require('./helpers');

// Retrieve all reports
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const { type, archive } = req.query;

    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin) throw new Error('Only an admin is authorized to view reports!');

    // Retrieve reports
    let response = await Reports.find();

    // eslint-disable-next-line default-case
    switch (type) {
      case 'users':
        response = response.filter((report) => report.table_name === 'users');
        break;
      case 'campaigns':
        response = response.filter(
          (report) => report.table_name === 'campaigns'
            || report.table_name === 'campaign_updates',
        );
        break;
      case 'comments':
        response = response.filter((report) => report.table_name === 'comments');
        break;
    }

    response = response.filter((report) => {
      if (archive === 'true') {
        return report.is_archived;
      }
      return !report.is_archived;
    });

    // Calculate section of response to be returned
    const RESULTS_PER_PAGE = 20;
    let startIndex = 0;
    let endIndex = RESULTS_PER_PAGE;

    if (req.query.page) {
      const page = parseInt(req.query.page, 10);
      startIndex = page * RESULTS_PER_PAGE;
      endIndex = startIndex + RESULTS_PER_PAGE;
    }

    // Make sure our end index does not overshoot
    if (endIndex > response.length) endIndex = response.length;

    const reports = response.slice(startIndex, endIndex);

    log.info('constructing response');

    const ids = reports.map((report) => report.reported_user);

    const namesAndAvatars = await Users.getNameAndAvatarByIds(ids);

    // Slice our response to desired section
    response = {
      // How many pages of data are available?
      pages: Math.ceil(response.length / RESULTS_PER_PAGE),
      // For each report, we will need to format it to maximize
      // usefulness to the frontend, and minimize requests to the
      // backend
      reports: await Promise.all(
        reports.map(async (report) => {
          // Get data on the reported item
          const reportedAccount = namesAndAvatars.find((d) => d.id === report.reported_user);

          const uniqueReports = await getSimilarReportCount(report);

          // TODO rename shorthand
          return {
            id: report.id,
            reported_by: report.reported_by,
            report_desc: report.report_desc,
            reported_at: report.reported_at,
            table_name: report.table_name,
            unique_reports: uniqueReports, // How many unique reports have been made about this?
            image: reportedAccount.avatar, // Image of reported account/post goes here
            name: reportedAccount.name, // Name of the reported account/post
          };
        }),
      ),
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: err.message || 'An internal server error occurred',
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
    if (!user.admin) throw new Error('Only an admin is authorized to view reports!');

    const response = await Reports.findById(req.params.id);

    if (!response) {
      return res.status(404).json({ message: 'A report with that ID does not exist' });
    }

    let otherReports = await Reports.findWhere({
      reported_user: response.reported_user,
    });

    otherReports = otherReports.filter(
      (report) => report.id !== parseInt(req.params.id, 10),
    );

    const ids = otherReports.map((report) => report.reported_by);

    const users = await Users.getNameAndAvatarByIds(ids);

    response.other_reports = await Promise.all(
      otherReports.map(async (report) => {
        const reportedBy = users.find((u) => u.id === report.reported_by);

        return {
          ...report,
          unique_reports: await getSimilarReportCount(report),
          reported_by: {
            id: reportedBy.id,
            name: reportedBy.name,
          },
        };
      }),
    );

    const uniqueReports = await getSimilarReportCount(response);

    response.unique_reports = uniqueReports;

    const reportedBy = await Users.findById(response.reported_by);

    response.reported_by = {
      id: reportedBy.id,
      name: reportedBy.name || 'User',
    };

    return res.status(200).json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    // Make sure body contains all necessary fields
    const required = ['postId', 'postType', 'desc'];
    const error = checkFields(required, req.body);
    if (error) throw new Error(error);

    const types = ['users', 'campaigns', 'campaign_updates', 'comments'];

    // Make sure provided type is a valid table name
    if (!types.includes(req.body.postType)) {
      throw new Error(
        `Field 'postType' must be one of the following valid types: ${types}`,
      );
    }

    // Make sure that item of provided id exists in provided table
    const [item] = await db(req.body.postType).where({
      [assignIdTag(req.body.postType)]: req.body.postId,
    });

    if (!item) {
      throw new Error(
        `An item of id ${req.body.postId} in table ${req.body.postType} does not exist`,
      );
    }

    // Get user id
    const userId = (await Users.findBySub(req.user.sub)).id;

    // Who's being reported?
    let reportedUserId;

    switch (req.body.postType) {
      case types[1]: {
        // Campaigns

        // Get the campaign
        const [campaign] = await db('campaigns').where({
          id: req.body.postId,
        });
        // Get 'user_id' from campaign
        reportedUserId = campaign.user_id;
        break;
      }
      case types[2]: {
        // Campaign Updates

        // Get campaign update
        const [campaignUpdate] = await db('campaign_updates').where({
          id: req.body.postId,
        });
        // Get campaign from campaign update
        const [campaign] = await db('campaigns').where({
          id: campaignUpdate.id,
        });
        // Get 'user_id' from campaign
        reportedUserId = campaign.user_id;
        break;
      }
      case types[3]: {
        // Comments
        // Get comment
        const [comment] = await db('comments').where({
          id: req.body.postId,
        });
        // Get 'user_id' from comment
        reportedUserId = comment.user_id;
        break;
      }
      default: {
        reportedUserId = req.body.postId;
        break;
      }
    }

    // Make sure this reported hasn't already been made
    const duplicates = await Reports.findWhere({
      reported_by: userId,
      post_id: req.body.postId,
      table_name: req.body.postType,
      reported_user: reportedUserId,
    });

    if (duplicates.length > 0) {
      return res.sendStatus(200);
    }

    // TODO?
    // Construct report object
    const report = {
      reported_by: userId,
      post_id: req.body.postId,
      table_name: req.body.postType,
      report_desc: req.body.desc || '',
      reported_user: reportedUserId,
    };

    // Save report in database
    await Reports.insert(report);

    // Return a status of 201 CREATED
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred',
    });
  }
});

router.post('/archive/:id', async (req, res) => {
  try {
    const updates = {
      is_archived: true,
    };

    await Reports.update(req.params.id, updates);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      message: err.message || 'An error occurred while archiving this report',
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
    if (!user.admin) throw new Error('Only an admin is authorized to delete reports!');

    // Extract report ID from params
    const { id } = req.params;

    // Try to delete report
    await Reports.remove(id);

    // Respond with 200 OK
    res.sendStatus(200);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'An internal server error occurred.',
    });
  }
});

module.exports = router;
