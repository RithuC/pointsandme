app.controller('myCtrl', function($scope) {
    $scope.isTeacher= null;
    $scope.isStudent= null;
    $scope.register = null;
    $scope.initial = true;
    $scope.goBack = null;

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
