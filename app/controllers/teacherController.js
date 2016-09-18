app.controller('teacherCtrl', function($scope, $timeout, $window, $location) {
	$scope.Name = null;
	$scope.Points = null;
	$scope.Email = null;
	$scope.Stars = null;


	if (!firebase.auth().currentUser) {
		$window.location.href = "/views";
		return;
	}

	var userId = firebase.auth().currentUser.uid;


	firebase.database().ref('/Teachers/' + userId + '/Students').once('value').then(function(snapshot) {
			var theirs = snapshot.val();

			$timeout(function() {
					$scope.Name = snapshot.val().Name;
					$scope.Points = snapshot.val().Points;

					firebase.database().ref('/Students").once('
						value ').then(function(snapshot) {
						console.log(snapshot.val());
						var students = snapshot.val();

						var student_list = [];

						for (var key in students) {
							if (theirs.hasOwnProperty(key)) {
								student_list.push({
									"Name": students[key].Name,
									"Points": students[key].Points
								});
							}
						}

						$timeout(function() {
							$scope.Students = student_list;
						});
					});
			});

	});

$scope.redeem = function(cost, item) {
	$scope.Points = $scope.Points - cost;
	alert('You have redeemed ' + item + '!');
};

$scope.logout = function() {
	firebase.auth().signOut().then(function() {
		$window.location.href = "/views";
	}, function(error) {
		alert(error);
	});
};

});