const db = require('../database/dbConfig.js')
const Cons = require('../users/userModel.js')

module.exports = {
  findSpecs,
  findConsSpecs,
  insertSpecs,
  deleteSpecs,
  modifySpecs,
}

function findSpecs() {
  return db('speciesHabitats')
    .select('*')
}

function findConsSpecs(consId) {
  return db('conservationCats')
    .join('speciesHabitats', 'speciesHabitats.spec_hab_id', 'conservationCats.spec_hab_id')
    .where('conservationCats.conservation_id', consId)
    .select(
      'speciesHabitats.spec_hab_name',
      'spec_hab_photo',
      'spec_hab_type'
    )
}

function insertSpecs(specAdded) {
  db('conservationCats')
    .insert(specAdded)
    .returning('updatedSpecs')
}

function deleteSpecs(specRemoved) {
  db('conservationCats')
    .where(specRemoved)
    .del()
}

async function modifySpecs(consId, specArray) {
  const consCurrent = await findConsSpecs(consId)
  for (i = 0; i < consCurrent.length; i++) {
    if 
  }
}