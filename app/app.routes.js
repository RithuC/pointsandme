/*var app = angular.module("myApp", ["ngRoute"]);  */
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "indexContent.html",
            controller : "myCtrl"
        })
        .when("/dashboard", {
            templateUrl : "dashboard.html",
            controller : ""
        })
        .when("/studentDEBUG", {
            templateUrl : "StudentPage.html",
            controller : "studentCtrl"
    });
});