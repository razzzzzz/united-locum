/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vacancys              ->  index
 * POST    /api/vacancys              ->  create
 * GET     /api/vacancys/:id          ->  show
 * PUT     /api/vacancys/:id          ->  update
 * DELETE  /api/vacancys/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Vacancy from './vacancy.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Vacancys
export function index(req, res) {
  Vacancy.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vacancy from the DB
export function show(req, res) {
  Vacancy.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vacancy in the DB
export function create(req, res) {
  Vacancy.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Vacancy in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Vacancy.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//updating reject and accept
export function updateStatus(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Vacancy.findByIdAndUpdateAsync(req.params.id,{'$set':{'proposedUsers':req.body.proposedUsers}},{ "new": true })
    .then(function(response){
      res.status(204).end();
    });
}


// Deletes a Vacancy from the DB
export function destroy(req, res) {
  Vacancy.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function getVacancy(req, res){
  
}