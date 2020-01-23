const checkFields = (requiredFields, body) => {
  let error;
  requiredFields.forEach(field => {
    if(body[field] === undefined || (typeof body[field] === 'string' && body[field].trim() === '')) {
      error = `The '${field}' field is required!`;
    }
  })
  return error;
}

module.exports = checkFields;