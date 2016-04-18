'use strict';

'use strict';
angular.module('clickeatApp').controller('VacancyComponent',function($scope){
	$scope.vacancys = [
		{ category: 'doctor',
  desc: "desc",
  skill: "mbbs",
  count: 1,
  rate: 2,
  date: "14-4-1990",
  from: "14-02-2016",
  to: "14-03-2016",
  practiceId: "id123455"},
  { category: 'nurse',
  desc: "desc",
  skill: "mbbs",
  count: 1,
  rate: 2,
  date: "14-4-1990",
  from: "14-02-2016",
  to: "14-03-2016",
  practiceId: "id123455"},
  { category: 'doctor',
  desc: "desc",
  skill: "mbbs",
  count: 1,
  rate: 2,
  date: "14-4-1990",
  from: "14-02-2016",
  to: "14-03-2016",
  practiceId: "id123455"},
	];

	$scope.edit = function(index){
		alert("have to edit "+index)
	};
	$scope.trash = function(index){
		alert("have to trash "+index)
	}
});
