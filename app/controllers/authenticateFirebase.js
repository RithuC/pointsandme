app.controller('authenticateCtrl', function($scope, $location) {



    $scope.authenticate = function () {
        var email = $('#username').val();
        var password = $('#password').val();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(response) {
                console.log(response);
                $location.path("dashboard.html");
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

            //updateStudents(snapshot.val());
            //updateRewards();
            //updateAllRequestedRewards();

            $("h1").text("Welcome " + snapshot.val().Name);
        });
    };

    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            $scope.loggedOut();
        }, function(error) {
            alert(error);
        });
    };

    $scope.loggedOut = function(){
        // This may be quick and dirty, but it works
        location.reload(true)
    };

    firebase.auth().onAuthStateChanged($scope.authStateChanged);
});

