/*var app = angular.module("myApp", ["ngRoute"]);  */
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "indexContent.html",
            controller : "myCtrl"
        })
        .when("/teacherPage", {
            templateUrl : "teachersskeleton.htm"
        })
        .when("/studentPage", {
            templateUrl : "StudentPage.html",
            controller : "studentCtrl"
        });
});