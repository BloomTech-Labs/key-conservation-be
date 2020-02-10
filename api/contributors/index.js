const express = require('express');

const db = require('../../database/dbConfig');
const restricted = require('../../middleware/authJwt');
const Skills = require('../../models/skills');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
  const { distance, lat, long } = req.query;
  const skills = req.query.skills ?
    req.query.skills
      .split(',')
      .map(skill => skill.toUpperCase())
    : [];

  if (skills) {
    const unknownSkills = [];
    for (const skill of skills) {
      if (!Skills[skill]) {
        unknownSkills.push(skill);
      }
    }

    if (unknownSkills.length > 0) {
      return res.status(400).json({ err: `unknown skills: ${unknownSkills.join(',')}`});
    }
  }

  if (distance && isNaN(distance)) {
    return res.status(400).json({ err: 'distance must be a number' });
  }

  if (distance && distance < 0) {
    return res.status(400).json({ err: 'distance must be positive' });
  }

  if (distance && !(lat && long)) {
    return res.status(400).json({ err: 'must specify current location in lat and long fields to use distance' });
  }

  // Select users and their skills where accepting_help_requests is true,
  // and skills is a superset of the skills in the query params.
  const query = db.raw(`
  SELECT *, array_to_json(skills) as skills FROM (
    SELECT users.*, array_agg(skills.skill) AS skills
    FROM users
    INNER JOIN skills ON skills.user_id = users.id
    GROUP BY users.id
  ) AS joined
  WHERE accepting_help_requests IS TRUE
  AND skills @> :skills
  `, { skills });

  const users = (await query).rows;

  res.status(200).send(users);
});

module.exports = router;
