'use strict';

var app = require('../..');
import request from 'supertest';

var newReason_nonavailability;

describe('reason_nonavailability API:', function() {

  describe('GET /api/reason_nonavailabilitys', function() {
    var reason_nonavailabilitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/reason_nonavailabilitys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reason_nonavailabilitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reason_nonavailabilitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reason_nonavailabilitys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reason_nonavailabilitys')
        .send({
          name: 'New Reason_nonavailability',
          info: 'This is the brand new reason_nonavailability!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReason_nonavailability = res.body;
          done();
        });
    });

    it('should respond with the newly created reason_nonavailability', function() {
      newReason_nonavailability.name.should.equal('New Reason_nonavailability');
      newReason_nonavailability.info.should.equal('This is the brand new reason_nonavailability!!!');
    });

  });

  describe('GET /api/reason_nonavailabilitys/:id', function() {
    var reason_nonavailability;

    beforeEach(function(done) {
      request(app)
        .get('/api/reason_nonavailabilitys/' + newReason_nonavailability._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reason_nonavailability = res.body;
          done();
        });
    });

    afterEach(function() {
      reason_nonavailability = {};
    });

    it('should respond with the requested reason_nonavailability', function() {
      reason_nonavailability.name.should.equal('New Reason_nonavailability');
      reason_nonavailability.info.should.equal('This is the brand new reason_nonavailability!!!');
    });

  });

  describe('PUT /api/reason_nonavailabilitys/:id', function() {
    var updatedReason_nonavailability;

    beforeEach(function(done) {
      request(app)
        .put('/api/reason_nonavailabilitys/' + newReason_nonavailability._id)
        .send({
          name: 'Updated Reason_nonavailability',
          info: 'This is the updated reason_nonavailability!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReason_nonavailability = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReason_nonavailability = {};
    });

    it('should respond with the updated reason_nonavailability', function() {
      updatedReason_nonavailability.name.should.equal('Updated Reason_nonavailability');
      updatedReason_nonavailability.info.should.equal('This is the updated reason_nonavailability!!!');
    });

  });

  describe('DELETE /api/reason_nonavailabilitys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reason_nonavailabilitys/' + newReason_nonavailability._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reason_nonavailability does not exist', function(done) {
      request(app)
        .delete('/api/reason_nonavailabilitys/' + newReason_nonavailability._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
