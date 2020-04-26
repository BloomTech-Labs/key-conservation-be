
exports.up = function (knex) {
  return knex.schema.raw(`
    ALTER TYPE enum_skills ADD VALUE 'SENSORS' AFTER 'RESEARCH';
    ALTER TYPE enum_skills ADD VALUE 'CAMERA_TRAPS' AFTER 'BUSINESS_DEVELOPMENT';
  `);
};

exports.down = function () {};

exports.config = { transaction: false };
