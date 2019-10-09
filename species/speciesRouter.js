const express = require('express')
const router = express.Router()

const Species = require('./speciesModel.js')
const Users = require('../users/usersModel.js')

//Will be needed with the addition for an Administration portal so
// Key Conservation can perform CRUD on the list of species and habitats
const mw = require('../middleware/s3Upload')

// .get(/)
///// We need this for the edit field, need to display all on the edit screen
// sorted by type
router.get('/', async (request, response) => {
  Species.findSpecs()
    .then(species => {
      response.status(200).json(species)
    })
    .catch(error => {
      console.log(error)
      response.status(500).send(error)
    })
})

// .get(/cons/:consId)
    // This will return all habitats/species for a specific conservation
router.get('/cons/:consId', async (request, response) => {
  const consId = request.params.consId

  try {
    const consSpecies = await Species.findConsSpecs(consId)

    if (consSpecies) {
      response.status(200).json({ consSpecies, msg: 'Conservation Habitats and Species found' })
    } else {
      response.status(404).json({ msg: 'No habitats or species found for this Conservationist' })
    }
  } catch (error) {
    response.status(500).json({ err, msg: 'Unable to make request from server'})
  }
})

// .get(/:specID)
      // This will return a specific species/habitat
      // Return conservations that have this one???


// .post(/cons/consId)
    // Adding a species id to a conservation
router.post('/cons/:consId', async (request, response) => {
  const consId = request.params.consId
  const specArray = request.body

  try {
    const conservation = await Users.findUser(id)

    if (conservation) {

      Species.modifySpecs(specArray)
        .then(specs => {
          console.log(specs)
          response.status(200).json({specs, msg: `Species or Habitats modified for conservation ${consId}`})
        })
        .catch(error => {
          console.log(error)
          response.status(500).json({msg: 'Unable to add species/habitats to Conservation.' })
        })

    } else {
      response.status(404).json({ msg: 'This conservation organization does not exist' })
    }
  } catch (error) {
    response.status(500).json({ msg: 'Unable to find Conservations on the server.' })
  }
})

///// SUPER FUTURE STUFF
////This will be required for the adminstration panel that gets implemented
// .post/.put/.delete(/:specID)
// for creation, modification, or deletion of habitats/species