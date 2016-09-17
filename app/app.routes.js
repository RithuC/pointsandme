var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "../views/index.html"
        })
        .when("/dashboard", {
            templateUrl : "../views/dashboard.html"
        });
});