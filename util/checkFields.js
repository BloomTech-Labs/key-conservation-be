// Utility that allows checking of required fields in a request
// body by simpling passing an array of keys

const checkFields = (requiredFields, body) => {
  let error;
  requiredFields.forEach((field) => {
    if (body[field] === undefined || (typeof body[field] === 'string' && body[field].trim() === '')) {
      error = `The '${field}' field is required!`;
    }
  });
  return error;
};

module.exports = checkFields;
