'use strict';

var app = require('../..');
import request from 'supertest';

var newProfile;

describe('Profile API:', function() {

  describe('GET /api/profiles', function() {
    var profiles;

    beforeEach(function(done) {
      request(app)
        .get('/api/profiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          profiles = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      profiles.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/profiles', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/profiles')
        .send({
          name: 'New Profile',
          info: 'This is the brand new profile!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProfile = res.body;
          done();
        });
    });

    it('should respond with the newly created profile', function() {
      newProfile.name.should.equal('New Profile');
      newProfile.info.should.equal('This is the brand new profile!!!');
    });

  });

  describe('GET /api/profiles/:id', function() {
    var profile;

    beforeEach(function(done) {
      request(app)
        .get('/api/profiles/' + newProfile._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          profile = res.body;
          done();
        });
    });

    afterEach(function() {
      profile = {};
    });

    it('should respond with the requested profile', function() {
      profile.name.should.equal('New Profile');
      profile.info.should.equal('This is the brand new profile!!!');
    });

  });

  describe('PUT /api/profiles/:id', function() {
    var updatedProfile;

    beforeEach(function(done) {
      request(app)
        .put('/api/profiles/' + newProfile._id)
        .send({
          name: 'Updated Profile',
          info: 'This is the updated profile!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProfile = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProfile = {};
    });

    it('should respond with the updated profile', function() {
      updatedProfile.name.should.equal('Updated Profile');
      updatedProfile.info.should.equal('This is the updated profile!!!');
    });

  });

  describe('DELETE /api/profiles/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/profiles/' + newProfile._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when profile does not exist', function(done) {
      request(app)
        .delete('/api/profiles/' + newProfile._id)
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
