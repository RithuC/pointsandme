app.controller('studentCtrl',  function($scope, $timeout, $window) {
    $scope.Name = null;

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
    firebase.database().ref('/Students/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        $timeout(function() {
            $scope.Name = snapshot.val().Name;
        });
    });
});
