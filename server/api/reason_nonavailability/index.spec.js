'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reason_nonavailabilityCtrlStub = {
  index: 'reason_nonavailabilityCtrl.index',
  show: 'reason_nonavailabilityCtrl.show',
  create: 'reason_nonavailabilityCtrl.create',
  update: 'reason_nonavailabilityCtrl.update',
  destroy: 'reason_nonavailabilityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reason_nonavailabilityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reason_nonavailability.controller': reason_nonavailabilityCtrlStub
});

describe('Reason_nonavailability API Router:', function() {

  it('should return an express router instance', function() {
    reason_nonavailabilityIndex.should.equal(routerStub);
  });

  describe('GET /api/reason_nonavailabilitys', function() {

    it('should route to profile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reason_nonavailabilityCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reason_nonavailabilitys/:id', function() {

    it('should route to reason_nonavailability.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reason_nonavailabilityCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reason_nonavailabilitys', function() {

    it('should route to reason_nonavailability.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reason_nonavailabilityCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reason_nonavailabilitys/:id', function() {

    it('should route to reason_nonavailability.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reason_nonavailabilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reason_nonavailabilitys/:id', function() {

    it('should route to reason_nonavailability.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reason_nonavailabilityCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reason_nonavailabilitys/:id', function() {

    it('should route to reason_nonavailability.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reason_nonavailabilityCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
