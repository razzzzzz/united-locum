/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import express from 'express';

export default function(app) {
  // Insert routes below
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/dairys', require('./api/dairy'));
  app.use('/api/profiles', require('./api/profile'));
  app.use('/api/vacancys', require('./api/vacancy'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/things', require('./api/thing'));

  app.use('/auth', require('./auth'));
app.use(express.static(__dirname + '/uploads'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/uploads/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/../uploads/573168c8681aaad81a648393/GPEligibility-1462855906273.pdf'));
    });
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
