/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/non_availabilitys              ->  index
 * POST    /api/non_availabilitys              ->  create
 * GET     /api/non_availabilitys/:id          ->  show
 * PUT     /api/non_availabilitys/:id          ->  update
 * DELETE  /api/non_availabilitys/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Non_availability from './non_availability.model';

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

// Gets a list of Non_availabilitys
export function index(req, res) {
  Non_availability.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Non_availability from the DB
export function show(req, res) {
  Non_availability.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Non_availability in the DB
export function create(req, res) {
  Non_availability.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Non_availability in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Non_availability.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Non_availability from the DB
export function destroy(req, res) {
  Non_availability.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
