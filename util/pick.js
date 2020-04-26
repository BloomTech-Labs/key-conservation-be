/**
 * Picks all properties listed in the `props` array from an object.
 * @param obj object to pick properties from
 * @param props array of properties to pick from the object
 * @returns {{}|{[p: string]: *}} subobject of obj containing only the properties requested
 */
function pick(obj, props) {
  return Object.keys(obj)
    .filter((key) => props.includes(key))
    .reduce((picked, key) => ({ ...picked, [key]: obj[key] }), {});
}

module.exports = pick;
