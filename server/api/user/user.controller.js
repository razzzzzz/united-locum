'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import _ from 'lodash';

var basePath = './uploads';
var fname = '';
if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
}

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
    User.findAsync({}, '-salt -password')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    //newUser.role = 'user';
    newUser.saveAsync()
        .spread(function(user) {
            var token = jwt.sign({ _id: user._id }, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({ token });
        })
        .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
    var userId = req.params.id;

    User.findByIdAsync(userId)
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

/**
 * Get my info
 */
export function me(req, res, next) {
    var userId = req.user._id;

    User.findOneAsync({ _id: userId }, '-salt -password')
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
    res.redirect('/');
}

/**
 * Search practice to add to locum as per his peferences
 */
export function searchPractice(req, res, next) {
    var searchText = parseInt(req.body.searchText);
    User.findAsync({ 'currentAddress.zipCode': searchText, role: 'practice' }, { _id: 1, fname: 1 })
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Updating practices for locum preferances.
 */
function changePractices(req, res, next) {

    var userId = req.user._id;
    var practices = req.body.practices;
    User.findByIdAsync(userId)
        .then(user => {
            user.practices = practices;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating practices for locum preferances.
 */
function changeNHSSys(req, res, next) {

    var userId = req.params.id;
    var nhsSys = req.body.nhsSys;
    User.findByIdAsync(userId)
        .then(user => {
            user.nhsSys = nhsSys;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating practices for locum preferances.
 */
function changeReferences(req, res, next) {

    var userId = req.params.id;
    var references = req.body.references;
    User.findByIdAsync(userId)
        .then(user => {
            user.references = references;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating changeSocialAC for locum &practice.
 */
function changeSocialAC(req, res, next) {

    var userId = req.params.id;
    var socialAccont = req.body.socialAccont;
    User.findByIdAsync(userId)
        .then(user => {
            user.socialAccont = socialAccont;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating practices for locum & practice.
 */
function changePackage(req, res, next) {

    var userId = req.params.id;
    var package_type = req.body.package;
    User.findByIdAsync(userId)
        .then(user => {
            user.package = package_type;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating changeCurrentAddress for locum & practce.
 */
function changeCurrentAddress(req, res, next) {

    var userId = req.params.id;
    var currentAddress = req.body.currentAddress;
    User.findByIdAsync(userId)
        .then(user => {
            user.currentAddress = currentAddress;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating changeCurrentAddress for locum & practce.
 */
function changeSessionRates(req, res, next) {

    var userId = req.params.id;
    var sessionRates = req.body.sessionRates;
    User.findByIdAsync(userId)
        .then(user => {
            user.sessionRates = sessionRates;
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * Updating changeCurrentAddress for locum & practce.
 */
function changeMain(req, res, next) {

    var userId = req.params.id;
    var main = req.body.main;
    User.findByIdAsync(userId)
        .then(user => {
            _.merge(user,main);
            return user.saveAsync()
                .then(() => {
                    res.status(204).end();
                })
                .catch(validationError(res));
        });
}

/**
 * uploading user documents
 */
function uploadDocuments(req, res, next) {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            var dir = basePath + '/' + req.params.id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
        filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            fname = req.params.name + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];

            User.findByIdAsync(req.params.id)
                .then(user => {
                    user.documents[req.params.name] = basePath + '/' + req.params.id + '/' + fname;
                    return user.saveAsync()
                        .then(() => {
                            // res.json({fileProp:req.params.type,fileName:(basePath+'/'+req.params.id+'/'+fname)});
                            // res.status(204).end();
                        })
                        .catch(validationError(res));
                });
            cb(null, fname);
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ fileProp: req.params.name, fileName: (basePath + '/' + req.params.id + '/' + fname) });
    });
}

export function updateUserProfile(req, res, next) {
    if (req.params.type === 'password') {
        changePassword(req, res, next);
    } else if (req.params.type === 'practices') {
        changePractices(req, res, next);
    } else if (req.params.type === 'documents') {
        uploadDocuments(req, res, next);
    } else if (req.params.type === 'currentAddress') {
        changeCurrentAddress(req, res, next);
    } else if (req.params.type === 'package') {
        changePackage(req, res, next);
    } else if (req.params.type === 'socialAccont') {
        changeSocialAC(req, res, next);
    } else if (req.params.type === 'references') {
        changeReferences(req, res, next);
    } else if (req.params.type === 'nhsSys') {
        changeNHSSys(req, res, next);
    } else if (req.params.type === 'sessionRates') {
        changeSessionRates(req, res, next);
    } else if (req.params.type === 'main') {
        changeMain(req, res, next);
    }
}
