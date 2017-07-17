// create angular app
var app = angular.module('validationApp',[]);

app.factory('Password', function() {
	function getStrength(pass) {
		var score = 0;
		if(!pass)
			return score;

		var letters = new Object();
		for (var i=0; i<pass.length; i++) {
			letters[pass[i]] = (letters[pass[i]] || 0) + 1;
			score += 5.0 / letters[pass[i]];
		}

	    // bonus points for mixing it up
	    var variations = {
	    	digits: /\d/.test(pass),
	    	lower: /[a-z]/.test(pass),
	    	upper: /[A-Z]/.test(pass),
	    	nonWords: /\W/.test(pass),
	    }

	    var variationCount = 0;
	    for (var check in variations) {
	    	variationCount += (variations[check] == true) ? 1 : 0;
	    }
	    score += (variationCount - 1) * 10;

	    if(score > 100) score = 100;

	    return parseInt(score);
	}

	return {
		getStrength: function(pass){
			return getStrength(pass);
		}
	}
});

	// create angular controller
	app.controller('mainController', function($scope) {

		// function to submit the form after all validation has occurred
		$scope.entries = [];			
		$scope.submitForm = function() {

			
			var valid_user = $scope.user
			$scope.valid_user = valid_user

			$scope.entries.push({ 'fullName':$scope.valid_user.name, 'userName': $scope.valid_user.username, 'email':$scope.valid_user.email });
			console.log($scope.entries);

		};

	});

	
	

	 app.controller('PasswordCtrl' ,function($scope, Password) {
	 	$scope.user = {}

		$scope.$watch("user.password", function(pass) {
			$scope.passwordStrength = Password.getStrength(pass) * 6.75;
			 if($scope.passwordStrength < 8) {
			 	$scope.userForm.password.$setValidity('strength', false);

		        } else {

			 	$scope.userForm.password.$setValidity('strength', true);

		     }
			console.log(Password.getStrength(pass))

		
		});

		 
		
	});

