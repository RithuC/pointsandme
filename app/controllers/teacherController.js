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

					firebase.database().ref("/Students").once('value').then(function(snapshot) {
						console.log(snapshot.val());
						var students = snapshot.val();

						var student_list = [];

						firebase.database().ref("/AchievementsObtained").once('value').then(function(snapshot){

						var achievements = snapshot.val();


						for (var key in students) {
							if (theirs.hasOwnProperty(key)) {

								var stars = 0;
								for(var k in achievements[key]){
									stars++;
								}

								student_list.push({
									"Name": students[key].Name,
									"Points": students[key].Points,
									"Email" : "email@email.org",
									"Stars" : stars
								});
							}
						}

						$timeout(function() {
							$scope.Students = student_list;
						});
					});
					});
			});
	});
});