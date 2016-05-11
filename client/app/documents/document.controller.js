'use strict';

angular.module('clickeatApp')
  .controller('DocumentCtrl', function ($scope,$http) {
    $scope.documents = {
        'GP':[
                    {label:'GMC Registration Certificate',name:'GMCReg'},
                    {label:'Latest Performer List Report',name:'GPPerformerList'},
                    {label:'Indemnity Insurance Certificate', name:'GPIndemnityInsurance'},
                    {label:' Passport/Work Permit/EEA card',name:'GPEligibility'},
                    {label:'Current DBS',name:'GPDBS'},
                    {label:'Latest CV',name:'GPCV'},
                    {label:'Passport / Driving License',name:'GPId'}
                ],
      'Dentist':[
                        {label:'GDC Registration Certificate',name:'GDCReg'},
                        {label:'Performer List Report',name:'DentPerformerList'},
                        {label:'Indemnity Insurance Certificate',name:'DentIndemnityInsurance'},
                        {label:'Passport / Work Permit',name:'DentEligibility'},
                        {label:'Current DBS',name:'DentDBS '} ,
                        {label:'Latest CV',name:'DentCV'},
                        {label:'Passport / Driving License',name:'DentId'}
                ],
            'Nurse(Dental)':[
                        {label:'NMC Registration Certificate',name:'NMCReg'},
                        {label:'Passport / EEA card/ Work Permit',name:'NurseEligibility'},
                        {label:'Current DBS',name:'NurseDBS'},
                        {label:'Latest CV',name:'NurseCV'},
                        {label:'Passport / Driving License',name:'NurseID'},
                        {label:'Qualifications Certificate',name:'NurseQualifications'},
                        {label:'Training Certificate',name:'NurseTrainCert'}
                    ],
            'Nurse(Non-Dental)':[
                        {label:'NMC Registration Certificate',name:'NMCReg'},
                        {label:'Passport / EEA card/ Work Permit',name:'NurseEligibility'},
                        {label:'Current DBS',name:'NurseDBS'},
                        {label:'Latest CV',name:'NurseCV'},
                        {label:'Passport / Driving License',name:'NurseID'},
                        {label:'Qualifications Certificate',name:'NurseQualifications'},
                        {label:'Training Certificate',name:'NurseTrainCert'}
                    ],
            'contract':[

                    {label:'Contract Certificate',name:'contract'}
            ]
  
    };
    $scope.edit = function(index){
      $scope.currentRef = $scope.user.referance[index];
      $scope.currentIndex = index;
    }
    $scope.remove = function(index,cat){
      $scope.documents[cat].splice(index,1);
    }
    $scope.add = function(label,name,cat){
      $scope.documents[cat].push({label:label,name:name});
    };

  });
