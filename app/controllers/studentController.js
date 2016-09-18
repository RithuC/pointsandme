app.controller('studentCtrl',  function($scope, $timeout, $window) {
    $scope.name = null;

    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/Students/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        $timeout(function() {
            $scope.name = snapshot.val().Name;
        });
    });
});
