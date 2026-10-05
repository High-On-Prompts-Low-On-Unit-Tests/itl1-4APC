const express = require('express');
const router = express.Router();
const { UniqueConstraintError } = require('sequelize');
const db = require('../models');
const { Evaluation, Project, Criterion, Juror } = db;

// neue Bewertung abspeichern
router.post('/', async (req, res) => {
  const { projectId, criterionId, jurorId, score, comment } = req.body;
  if (!projectId || !criterionId || !jurorId || score === undefined) {
    return res.status(400).json({ error: 'projectId, criterionId, jurorId und score sind Pflichtfelder' });
  }

  const [project, criterion, juror] = await Promise.all([
    Project.findByPk(projectId),
    Criterion.findByPk(criterionId),
    Juror.findByPk(jurorId)
  ]);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  if (!criterion) return res.status(404).json({ error: 'Kriterium nicht gefunden' });
  if (!juror) return res.status(404).json({ error: 'Juror nicht gefunden' });

  try {
    const evaluation = await Evaluation.create({ projectId, criterionId, jurorId, score, comment });
    res.status(201).json(evaluation);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: 'Dieser Juror hat dieses Kriterium für dieses Projekt bereits bewertet' });
    }
    throw err;
  }
});

module.exports = router;
