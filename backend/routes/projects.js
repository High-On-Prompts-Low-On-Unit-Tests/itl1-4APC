const express = require('express');
const router = express.Router();
const { fn, col } = require('sequelize');
const db = require('../models');
const { Project, Team, Evaluation, Criterion } = db;

// alle Projekte inkl. Team
router.get('/', async (req, res) => {
  const projects = await Project.findAll({ include: Team });
  res.json(projects);
});

// ein Projekt per ID
router.get('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id, { include: Team });
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  res.json(project);
});

// neues Projekt anlegen
router.post('/', async (req, res) => {
  const { teamId, titel, beschreibung, praesentiertAm } = req.body;
  if (!teamId || !titel || !praesentiertAm) {
    return res.status(400).json({ error: 'teamId, titel und praesentiertAm sind Pflichtfelder' });
  }
  const team = await Team.findByPk(teamId);
  if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
  const project = await Project.create({ teamId, titel, beschreibung, praesentiertAm });
  res.status(201).json(project);
});

// Projekt aktualisieren
router.put('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  await project.update(req.body);
  res.json(project);
});

// Projekt löschen
router.delete('/:id', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  await project.destroy();
  res.status(204).send();
});

// Durchschnitt der Punktzahl für dieses Projekt, gruppiert nach Kriterium
router.get('/:id/durchschnitt', async (req, res) => {
  const project = await Project.findByPk(req.params.id);
  if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
  const ergebnis = await Evaluation.findAll({
    where: { projectId: req.params.id },
    attributes: ['criterionId', [fn('AVG', col('score')), 'durchschnitt']],
    include: [{ model: Criterion, attributes: ['name'] }],
    group: ['criterionId', 'Criterion.id']
  });
  res.json(ergebnis);
});

module.exports = router;
