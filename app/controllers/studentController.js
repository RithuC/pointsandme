app.controller('studentCtrl',  function($scope, $timeout, $window, $location) {
    $scope.Name = null;

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.database().ref('/Students/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        $timeout(function() {
            $scope.Name = snapshot.val().Name;
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
