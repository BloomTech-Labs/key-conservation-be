const express = require('express');

const db = require('../../database/dbConfig');
const restricted = require('../../middleware/authJwt');
const SkillsEnum = require('../../models/skillsEnum');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
  const { distance, lat, long } = req.query;
  const skills = req.query.skills
    ? req.query.skills.split(',').map((skill) => skill.toUpperCase())
    : [];

  if (skills.length > 0) {
    const unknownSkills = skills.filter((skill) => !(skill in SkillsEnum));

    if (unknownSkills.length > 0) {
      return res.status(400).json({ err: `unknown skills: ${unknownSkills.join(',')}` });
    }
  }

  if (distance && Number.isNaN(distance)) {
    return res.status(400).json({ err: 'distance must be a number' });
  }

  if (distance && distance < 0) {
    return res.status(400).json({ err: 'distance must be positive' });
  }

  if (distance && !(lat && long)) {
    return res.status(400).json({ err: 'must specify current location in lat and long fields to use distance' });
  }

  // Inner query: join users table with skills table and aggregate to find all skills for each user.
  // Outer query: find all users where accepting_help_requests is true, and where the user's skills is a superset of the requested skills in the query params.
  const query = db.raw(`
  SELECT *, array_to_json(skills) as skills FROM (
    SELECT users.*, array_agg(skills.skill) AS skills
    FROM users
    INNER JOIN skills ON skills.user_id = users.id
    GROUP BY users.id
  ) AS joined
  WHERE accepting_help_requests IS TRUE
  AND skills @> :requestedSkills
  `, { requestedSkills: skills });

  const users = (await query).rows;

  res.status(200).send(users);
});

module.exports = router;
