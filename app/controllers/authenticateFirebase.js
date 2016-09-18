app.controller('authenticateCtrl', function($scope, $location, $window) {

    $scope.authenticate = function () {
        var email = $('#username').val();
        var password = $('#password').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response) {
                console.log(response);
                console.log($window.location.href);

            })
            .catch(function (error) {
                alert(error);
            });
    };

    $scope.authStateChanged = function(user){
        if(user) {
            console.log("logged in with data" + user.email + " " + user.displayName);
            $scope.loggedIn();
        }
        else {
            // loggedOut();
        }
    };

    $scope.loggedIn = function(){
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/Teachers/' + userId).once('value').then(function(snapshot) {
            console.log(snapshot.val());
            if(snapshot.val()){
                $scope.$apply(function(){
                    $location.path("teacherPage");
                });
            }
            else {
                $scope.$apply(function(){
                    $location.path("studentPage");
                });
            }

            //updateStudents(snapshot.val());
            //updateRewards();
            //updateAllRequestedRewards();
        });
    };

    firebase.auth().onAuthStateChanged($scope.authStateChanged);
});

