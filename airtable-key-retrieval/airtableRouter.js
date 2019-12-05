const express = require('express')
const airtableRouter = express.Router();

const AirtableModel = require('./airtableModel')

function getAirtableKey ()  {
    // return process.env.AIRTABLE_KEY;
    return "I work!!!!!!!"
}
airtableRouter.get('/', (req, res) => {
    res.send({airtable_key: process.env.AIRTABLE_KEY})
})




module.exports = airtableRouter;