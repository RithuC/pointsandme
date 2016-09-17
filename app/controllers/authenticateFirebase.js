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
    }
});

