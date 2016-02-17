'use strict';

var app = require('../..');
import request from 'supertest';

var newDairy;

describe('Dairy API:', function() {

  describe('GET /api/dairys', function() {
    var dairys;

    beforeEach(function(done) {
      request(app)
        .get('/api/dairys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dairys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      dairys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/dairys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dairys')
        .send({
          name: 'New Dairy',
          info: 'This is the brand new dairy!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDairy = res.body;
          done();
        });
    });

    it('should respond with the newly created dairy', function() {
      newDairy.name.should.equal('New Dairy');
      newDairy.info.should.equal('This is the brand new dairy!!!');
    });

  });

  describe('GET /api/dairys/:id', function() {
    var dairy;

    beforeEach(function(done) {
      request(app)
        .get('/api/dairys/' + newDairy._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dairy = res.body;
          done();
        });
    });

    afterEach(function() {
      dairy = {};
    });

    it('should respond with the requested dairy', function() {
      dairy.name.should.equal('New Dairy');
      dairy.info.should.equal('This is the brand new dairy!!!');
    });

  });

  describe('PUT /api/dairys/:id', function() {
    var updatedDairy;

    beforeEach(function(done) {
      request(app)
        .put('/api/dairys/' + newDairy._id)
        .send({
          name: 'Updated Dairy',
          info: 'This is the updated dairy!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDairy = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDairy = {};
    });

    it('should respond with the updated dairy', function() {
      updatedDairy.name.should.equal('Updated Dairy');
      updatedDairy.info.should.equal('This is the updated dairy!!!');
    });

  });

  describe('DELETE /api/dairys/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dairys/' + newDairy._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dairy does not exist', function(done) {
      request(app)
        .delete('/api/dairys/' + newDairy._id)
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
