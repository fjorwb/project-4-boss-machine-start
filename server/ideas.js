const express = require('express')
const ideasRouter = express.Router();

module.exports = ideasRouter;

const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');


ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// add a new Minion to database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// get Minion by id from database
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

// update a single Minion in database
ideasRouter.put('/:ideaId', (req, res, next) => {
  let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
});

// delete a Minion by id out from database
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

