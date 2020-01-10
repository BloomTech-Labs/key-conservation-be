const express = require('express')
const airtableRouter = express.Router();


airtableRouter.get('/', (req, res) => {
    res.send({airtable_key: process.env.AIRTABLE_KEY})
})




module.exports = airtableRouter;