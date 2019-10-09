const express = require('express')
const router = express.Router()

const Species = require('./speciesModel.js')

//Will be needed with the addition for an Administration portal so
// Key Conservation can perform CRUD on the list of species and habitats
const mw = require('../middleware/s3Upload')

// .get(/)
///// We need this for the edit field, need to display all on the edit screen
// sorted by type

// .get(/cons/:consId)
    // This will return all habitats/species for a specific conservation

// .get(/:specID)
      // This will return a specific species/habitat
      // Return conservations that have this one???


// .post(/cons/consID/:specID)
    // Adding a species id to a conservation

// .delete(/cons/consID/:specID)
    // Removing a species id from a conservation


///// SUPER FUTURE STUFF
// .post/.put/.delete(/:specID)
// for creation, modification, or deletion of habitats/species