var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "indexContent.html"
        })
        .when("/dashboard", {
            templateUrl : "dashboard.html"
        })
        .when("/studentDEBUG", {
            templateUrl : "StudentPage.html"
    });
});