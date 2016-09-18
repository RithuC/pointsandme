app.controller('teacherCtrl', function ($scope, $timeout, $window, $location) {
    $scope.Name = null;
    $scope.Points = null;
    $scope.Email = null;
    $scope.Stars = null;


    if (!firebase.auth().currentUser) {
        $window.location.href = "/views";
        return;
    }

    var userId = firebase.auth().currentUser.uid;

    $scope.updatePoints = function() {
        firebase.database().ref('/Teachers/' + userId + '/Students').once('value').then(function (snapshot) {
            var theirs = snapshot.val();

            $timeout(function () {
                $scope.Name = snapshot.val().Name;
                $scope.Points = snapshot.val().Points;

                firebase.database().ref("/Students").once('value').then(function (snapshot) {
                    console.log(snapshot.val());
                    var students = snapshot.val();

                    var student_list = [];

                    firebase.database().ref("/AchievementsObtained").once('value').then(function (snapshot) {

                        var achievements = snapshot.val();


                        for (var key in students) {
                            if (theirs.hasOwnProperty(key)) {

                                var stars = 0;
                                for (var k in achievements[key]) {
                                    stars++;
                                }

                                student_list.push({
                                    "Id" : key,
                                    "Name": students[key].Name,
                                    "Points": students[key].Points,
                                    "Email": "email@email.org",
                                    "Stars": stars
                                });
                            }
                        }

                        $timeout(function () {


                            firebase.database().ref('/Teachers/' + userId).once('value').then(function(snapshot) {
                                var teacher = snapshot.val();
                                var name = teacher.Name;

                                $timeout(function() {
                                    $scope.Students = student_list;
                                    $scope.Name = name;
                                });
                            });
                        });
                    });
                });
            });
        });
    };




    $scope.updatePoints();

    firebase.database().ref('/Rewards/' + userId).once('value').then(function (snapshot) {
        var rewards = snapshot.val();


        var reward_list = [];
        for (var key in rewards) {
            if (rewards.hasOwnProperty(key)) {
                reward_list.push({
                    "Name": rewards[key].Name,
                    "Points": rewards[key].Points,
                });
            }

        }

        $timeout(function () {
            $scope.Rewards = reward_list;
        });
    });

    $scope.updateRequested = function(){
        firebase.database().ref('/RequestedRewards').once('value').then(function (snapshot) {
            var rewards = snapshot.val();


            var reward_list = [];
            for (var key in rewards) {
                if (rewards.hasOwnProperty(key)) {
                    reward_list.push({
                        "Id" : key,
                        "Name": rewards[key].Reward,
                        "Student": rewards[key].Student,
                    });
                }

            }

            $timeout(function () {
                $scope.ReRewards = reward_list;
            });
        });
    };

    $scope.updateRequested();


    firebase.database().ref('/Achievements/' + userId).once('value').then(function (snapshot) {
        var achievements = snapshot.val();

        var achievement_list = [];
        for (var key in achievements) {
            if (achievements.hasOwnProperty(key)) {
                achievement_list.push({
                    "Name": achievements[key].Name,
                    "Description": achievements[key].Description,
                });
            }

        }

        $timeout(function () {
            $scope.Achievements = achievement_list;
        });
    });

    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            $window.location.href = "/views";
        }, function(error) {
            alert(error);
        });
    };



    $scope.increasePoints = function(student) {

        var points = prompt("Please the ammount of points you wish to add:", 0);
        points *= 1;

        firebase.database().ref('/Students/' + student + '/Points').once('value').then(function(snapshot) {
            var old = snapshot.val();
            firebase.database().ref('/Students/' + student +'/Points').set(old+points);
            $scope.updatePoints();
        });
    };

    $scope.requestDone = function(requestId) {
        firebase.database().ref('/RequestedRewards').child(requestId).remove();
        $scope.updateRequested();
    };
});