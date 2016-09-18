app.controller('studentCtrl',  function($scope, $timeout, $window, $location) {
    $scope.Name = null;

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.database().ref('/Students/' + userId).once('value').then(function(snapshot) {
        var teacher = snapshot.val().Teacher;

        $timeout(function() {
            $scope.Name = snapshot.val().Name;
            $scope.Points = snapshot.val().Points;

            firebase.database().ref('/Rewards/' + teacher + "/").once('value').then(function(snapshot) {
                console.log(snapshot.val());
                var rewards = snapshot.val();

                var reward_list = [];

                for (var key in rewards) {
                    if (rewards.hasOwnProperty(key)) {
                        reward_list.push( {
                            "Name" : rewards[key].Name,
                            "Points" : rewards[key].Points,
                            "Possible" : (rewards[key].Points <= $scope.Points)
                        });
                    }
                }

                $timeout(function() {
                    $scope.Rewards = reward_list;
                });

            });
        });
    });

    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            $window.location.href = "/views";
        }, function(error) {
            alert(error);
        });
    };

});
