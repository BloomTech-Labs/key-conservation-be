const express = require("express");
const router = express.Router();

const Reports = require("../../models/reportModel");
const Users = require("../../models/usersModel");

const checkFields = require("../../util/checkFields");

// Retrieve all reports
router.get("/", async (req, res) => {
  try {
    // Extract query parameters
    let { page } = req.query;

    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error("Only an admin is authorized to view reports!");

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
      reports
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
      message: "An internal server errir occurred"
    });
  }
});

// Retrieve a specific report
router.get("/:id", async (req, res) => {
  try {
    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error("Only an admin is authorized to view reports!");

    const response = await Reports.findById(req.params.id);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
      message: "An internal server error occurred"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    // Make sure body contains all necessary fields
    const required = ["postId", "postType"];
    const error = checkFields(required, req.body);
    if (error) throw new Error(error);

    const types = ["users", "campaigns", "campagin_updates", "comments"];

    // Make sure provided type is a valid table name
    if (!types.includes(req.body.postType))
      throw new Error(
        `Field 'postType' must be one of the following valid types: ${types}`
      );

    // Get user id
    const userId = (await Users.findBySub(req.user.sub)).id;

    // Construct report object
    const report = {
      reported_by: userId,
      post_id: req.body.postId,
      table_name: req.body.postType,
      report_desc: req.body.desc || ""
    };

    // Save report in database
    await Reports.insert(report);

    // Return a status of 201 CREATED
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "An internal server error occurred"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Get the user's Auth0 ID (sub)
    const { sub } = req.user;

    // Retrieve the user from the database
    const user = await Users.findBySub(sub);

    // Make sure user making request is an admin
    if (!user.admin)
      throw new Error("Only an admin is authorized to delete reports!");
    
    // Extract report ID from params
    const { id } = req.params;

    // Try to delete report
    await Reports.remove(id);

    // Respond with 200 OK
    res.sendStatus(200);
  } catch (err) {
    return res
      .status(500)
      .json({
        error: err.message,
        message: "An internal server error occurred."
      });
  }
});

module.exports = router;
