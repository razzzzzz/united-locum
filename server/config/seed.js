/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Vacancy from '../api/vacancy/vacancy.model';
import Userprofile from '../api/profile/profile.model';
import Dairy from '../api/dairy/dairy.model';
import Notification from '../api/notification/notification.model';

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
  Notification.find({}).removeAsync()
  .then(() => {

    Notification.createAsync({
    targetId: '10011',
    requestId: '10128',
    requestName: {  
      first: 'Jhon',
      last: 'Doe'
      },
    pic: 'URL',
    subject: {
      Skill: 'Physician',
      Rate: 10000,
      RequestTime: new Date()
      },
    body: 'Predefined text',
    notifyTimeStamp: new Date(),
    deliveryStatus: 1,
    readStatus: 0

    })
    .then(() => {
     console.log('finished populating Notification');
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
      password: 'practice',
            profileSummary: 'doctor',
      qualifications: [],
      currentAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 12345
      },
      sa: true,
      billingAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 512345
      },
      documents: [],
      practices: [],
      services: 'Basic',
      socialAccount:{
        fb: 'fb.com/kp',
        linkedin: 'linkedin.com/kp',
        skype: 'ghmc',
        twitter: 'tweet',
        pinterest: 'pinte'
      },
      references: [],
      nhsSys:[],
      sessionRates: {
        session1: [{ frm: new Date(), to: new Date(), rate:120 }],
        session2: [{ frm: new Date(), to: new Date(), rate:320 }],
        session3: [{ frm: new Date() , to: new Date(), rate:400 }],
        dayrate: 510,
        outOfOffice: 300 
      } 
    },{
      provider: 'local',
      fname: 'Locum ',
      lname: 'User',
      mobile: 9494949793,
      tc: true,
      category: [],
      email: 'locum@example.com',
      package: 'basic',
      role: 'locum',
      gender:'male',
      password: 'locum',
            profileSummary: 'doctor',
      qualifications: [],
      currentAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 12345
      },
      sa: true,
      billingAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 512345
      },
      documents: [],
      practices: [],
      services: 'Basic',
      socialAccount:{
        fb: 'fb.com/kp',
        linkedin: 'linkedin.com/kp',
        skype: 'ghmc',
        twitter: 'tweet',
        pinterest: 'pinte'
      },
      references: [],
      nhsSys:[],
      sessionRates: {
        session1: [{ frm: new Date(), to: new Date(), rate:120 }],
        session2: [{ frm: new Date(), to: new Date(), rate:320 }],
        session3: [{ frm: new Date() , to: new Date(), rate:400 }],
        dayrate: 510,
        outOfOffice: 300 
      } ,
      category:[
                {
                    "label" : "GP",
                    "id" : 1
                }
            ],
      "idnumber" : "gano",
      performarnumber:'performar123'
    }, {
      provider: 'local',
      role: 'admin',
      mobile: 9494943794,
      fname: 'Admin',
      lname: 'User',
      email: 'admin@example.com',
      password: 'admin',
            profileSummary: 'doctor',
      qualifications: [],
      currentAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 12345
      },
      sa: true,
      billingAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 512345
      },
      documents: [],
      practices: [],
      services: 'Basic',
      socialAccount:{
        fb: 'fb.com/kp',
        linkedin: 'linkedin.com/kp',
        skype: 'ghmc',
        twitter: 'tweet',
        pinterest: 'pinte'
      },
      references: [],
      nhsSys:[],
      sessionRates: {
        session1: [{ frm: new Date(), to: new Date(), rate:120 }],
        session2: [{ frm: new Date(), to: new Date(), rate:320 }],
        session3: [{ frm: new Date() , to: new Date(), rate:400 }],
        dayrate: 510,
        outOfOffice: 300 
      } 
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
Vacancy.find({}).removeAsync()
  .then(() => {

    Vacancy.createAsync({
       category: "Nurse",
      desc: "desc",
      skill: "Ambulatory Case Nursing",
      count: 1,
      rate: 16,
      date:new Date().setDate(new Date().getDate() + 1),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },
  {
    category: "Doctor",
      desc: "desc",
      skill: "Microbiologist",
      count: 1,
      rate: 27,
      date:new Date().setDate(new Date().getDate() + 1),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Dentist",
      desc: "desc",
      skill: "Endodonist",
      count: 1,
      rate: 27,
      date:new Date().setDate(new Date().getDate() + 2),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Doctor",
      desc: "desc",
      skill: "Cardiologist",
      count: 1,
      rate: 24,
      date:new Date().setDate(new Date().getDate() + 2),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Nurse",
      desc: "desc",
      skill: "Dialysis Nursing",
      count: 1,
      rate: 15,
      date:new Date().setDate(new Date().getDate() + 3),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Dentist",
      desc: "desc",
      skill: "Pediatric Dentist",
      count: 1,
      rate: 25,
      date:new Date().setDate(new Date().getDate() + 3),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Doctor",
      desc: "desc",
      skill: "Gynecologist",
      count: 1,
      rate: 25,
      date:new Date().setDate(new Date().getDate() + 4),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Nurse",
      desc: "desc",
      skill: "Cardiac Nursing",
      count: 1,
      rate: 15,
      date:new Date().setDate(new Date().getDate() + 4),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Nurse",
      desc: "desc",
      skill: "Forensic Nursing",
      count: 1,
      rate: 13,
      date:new Date().setDate(new Date().getDate() + 5),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Nurse",
      desc: "desc",
      skill: "Legal Nursing",
      count: 1,
      rate: 14,
      date:new Date().setDate(new Date().getDate() + 5),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Dentist",
      desc: "desc",
      skill: "Prosthodontist",
      count: 1,
      rate: 18,
      date:new Date().setDate(new Date().getDate() + 6),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Dentist",
      desc: "desc",
      skill: "Orthodontist",
      count: 1,
      rate: 20,
      date:new Date().setDate(new Date().getDate() + 6),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Dentist",
      desc: "desc",
      skill: "Endodonist",
      count: 1,
      rate: 19,
      date:new Date().setDate(new Date().getDate() + 7),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{ 
  category: "Dentist",
      desc: "desc",
      skill: "Periodontist",
      count: 1,
      rate: 16,
      date:new Date().setDate(new Date().getDate() + 7),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Doctor",
      desc: "desc",
      skill: "Allergist",
      count: 1,
      rate: 20,
      date:new Date().setDate(new Date().getDate() + 8),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "Doctor",
      desc: "desc",
      skill: "Allergist",
      count: 1,
      rate: 17,
      date:new Date().setDate(new Date().getDate() + 8),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    },{
  category: "doctor",
      desc: "desc",
      skill: "Audiologist",
      count: 1,
      rate: 15,
      date:new Date().setDate(new Date().getDate() + 9),
      from: new Date(),
      to:new Date(),
      practiceId: "String"
  
    }
)
    .then(() => {
      console.log('finished populating vacancy');
    });
  });






Dairy.find({}).removeAsync()
  .then(()=> {
   Dairy.createAsync(
   {
         locumId: 'l001',
         lName: 'Locum1',
         practiceId: 'p001',
         pName: 'Practice1',
         skill: 'Dentist',
         skillId: 'Den',
         date:new Date().setDate(new Date().getDate() + 1),
         time: new Date(),
         state: [],
         stateId: 'lreq',
         activity: 'Attending wedding',
         vacancy: 5,
         rate: 10,
         text: 'Health Problem',
         colorcode: [],
         category: [],
         jobDescription: "job Description",
         zipCode: 523264,
         typeHealthcare: "primary Health care center"

   }).then(() => {
      console.log('finished populating Dairy');
    })
   });





Userprofile.find({}).removeAsync()
  .then(()=> {
   Userprofile.createAsync(
   {
      userId: 'k001',
      profileSummary: 'doctor',
      qualifications: [],
      currentAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 12345
      },
      sa: true,
      billingAddress:{
        houseNumber: 'b24',
        line1: 'c-lane',
        line2: 'manchester',
        line3: 'manch post',
        town: 'manchester',
        country: 'london',
        zipCode : 512345
      },
      documents: [],
      practices: [],
      services: 'Basic',
      socialAccount:{
        fb: 'fb.com/kp',
        linkedin: 'linkedin.com/kp',
        skype: 'ghmc',
        twitter: 'tweet',
        pinterest: 'pinte'
      },
      references: [],
      nhsSys:[],
      sessionRates: {
        session1: [{ frm: new Date(), to: new Date(), rate:120 }],
        session2: [{ frm: new Date(), to: new Date(), rate:320 }],
        session3: [{ frm: new Date() , to: new Date(), rate:400 }],
        dayrate: 510,
        outOfOffice: 300 
      } 
   }).then(() => {
      console.log('finished populating profile');
    })
   });