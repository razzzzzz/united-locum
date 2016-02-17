'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var profileCtrlStub = {
  index: 'profileCtrl.index',
  show: 'profileCtrl.show',
  create: 'profileCtrl.create',
  update: 'profileCtrl.update',
  destroy: 'profileCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var profileIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './profile.controller': profileCtrlStub
});

describe('Profile API Router:', function() {

  it('should return an express router instance', function() {
    profileIndex.should.equal(routerStub);
  });

  describe('GET /api/profiles', function() {

    it('should route to profile.controller.index', function() {
      routerStub.get
        .withArgs('/', 'profileCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/profiles/:id', function() {

    it('should route to profile.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'profileCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/profiles', function() {

    it('should route to profile.controller.create', function() {
      routerStub.post
        .withArgs('/', 'profileCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/profiles/:id', function() {

    it('should route to profile.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'profileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/profiles/:id', function() {

    it('should route to profile.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'profileCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/profiles/:id', function() {

    it('should route to profile.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'profileCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
