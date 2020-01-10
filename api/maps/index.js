const express = require('express');
const mapRouter = express.Router();

const Maps = require('../../models/mapModel')

mapRouter.get('/', (req, res) => {
    Maps.findConservationOrganizations()
        .then(orgs => res.status(200).json(orgs))
        .catch(err => res.status(500).json(err.message))
})
module.exports = mapRouter;
