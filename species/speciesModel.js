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
  return db('conservationCats')
    .insert(specAdded)
    .returning('updatedSpecs')
}

function deleteSpecs(specRemoved) {
  return db('conservationCats')
    .where(specRemoved)
    .del()
}

async function modifySpecs(consId, specArray) {
  let addedSpecs;
  let removedSpecs;

  const consCurrent = await findConsSpecs(consId)
  // Taking the old information (consCurrent) and new information (specArray)
  // to find any differences to be added or deleted
  if (consCurrent) {
    specArray.map(update => {
      if (consCurrent.find(old => old.spec_hab_id === update.spec_hab_id)) {
          console.log(update)
        } else {
          addedSpecs.push(update)
        }
    })
    
    consCurrent.map(old => {
      if (specArray.find(update => update.spec_hab_id === old.spec_hab_id)) {
        console.log(old)
      } else {
        removedSpecs.push(old)
      }
    })
  } else {
    return consCurrent
  }

  // Determining whether to run the insert or delete functions
  if (addedSpecs.length > 0 && removedSpecs.length > 0) {
    console.log('we in both')
    let updates = await Promise.all([
      insertSpecs(addedSpecs),
      deleteSpecs(removedSpecs)
    ])
    return updates
  } else if (addedSpecs.length > 0) {
    console.log('we in added')
    return insertSpecs(addedSpecs)
  } else if (removedSpecs.length > 0) {
    console.log('we in removed')
    return deleteSpecs(removedSpecs)
  } else {
    console.log('we hit the return nothin')
    return consCurrent
  }

}