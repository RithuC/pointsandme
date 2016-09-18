/*var app = angular.module("myApp", ["ngRoute"]);  */
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "indexContent.html",
            controller : "myCtrl"
        })
        .when("/teacherPage", {
            templateUrl : "TeacherPage.html",
            controller : "teacherCtrl"
        })
        .when("/studentPage", {
            templateUrl : "StudentPage.html",
            controller : "studentCtrl"
        });
});