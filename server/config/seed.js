/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Vacancy from '../api/vacancy/vacancy.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(() => {

    User.createAsync({
      provider: 'local',
      fname: 'Practice',
      lname: 'User',
      mobile: 9494949794,
      tc: true,
      category: [],
      email: 'practice@example.com',
      role: 'practice',
      password: 'practice'
    },{
      provider: 'local',
      fname: 'Locum ',
      lname: 'User',
      mobile: 9494949793,
      tc: true,
      category: [],
      email: 'locum@example.com',
      role: 'locum',
      password: 'locum'
    }, {
      provider: 'local',
      role: 'admin',
      mobile: 9494943794,
      fname: 'Admin',
      lname: 'User',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
Vacancy.find({}).removeAsync()
  .then(() => {

    Vacancy.createAsync({
       category: "cat",
      desc: "desc",
      skill: "skill",
      count: 1,
      rate: 3,
      date: new Date(),
      time: new Date()
    })
    .then(() => {
      console.log('finished populating vacancy');
    });
  });
