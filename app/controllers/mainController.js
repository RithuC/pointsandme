app.controller('myCtrl', function($scope) {
    $scope.isTeacher= null;
    $scope.isStudent= null;
    $scope.register = null;
    $scope.initial = true;
    $scope.goBack = null;

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD-WUhW3_jInlUPmMxV7EInTxx17C0Ba74",
        authDomain: "pointsandme.firebaseapp.com",
        databaseURL: "https://pointsandme.firebaseio.com",
        storageBucket: "pointsandme.appspot.com",
        messagingSenderId: "48621216513"
    };
    firebase.initializeApp(config);

    $scope.userType = function (type) {
        if(type === "teacher"){
            $scope.isTeacher = true;
            $scope.initial = false;
        }
        else if(type === "student"){
            $scope.isStudent = true;
            $scope.initial = false;
        }
        else if (type === "register"){
            $scope.register = true;
            $scope.initial = false;
        }
        else {
            $scope.initial = true;
            $scope.isTeacher = false;
            $scope.isStudent = false;
        }
    }

});
