app.controller('studentCtrl',  function($scope, $timeout, $window) {
    $scope.Name = null;

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.database().ref('/Students/' + userId).once('value').then(function(snapshot) {
        var teacher = snapshot.val().Teacher;

        $timeout(function() {
            $scope.Name = snapshot.val().Name;
        });

        firebase.database().ref('/Rewards/' + teacher + "/").once('value').then(function(snapshot) {
            console.log(snapshot.val());
            var rewards = snapshot.val();

            var reward_list = [];

            for (var key in rewards) {
                if (rewards.hasOwnProperty(key)) {
                    reward_list.push( {
                        "Name" : rewards[key].Name,
                        "Points" : rewards[key].Points
                    });
                }
            }

            $timeout(function() {
                $scope.Rewards = reward_list;
            });

        });
    });
});
