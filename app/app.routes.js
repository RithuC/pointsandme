var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "indexContent.html"
        })
        .when("/teacherPage", {
            templateUrl : "teachersskeleton.htm"
        })
        .when("/studentPage", {
            templateUrl : "StudentPage.html"
        });
});