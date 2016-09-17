var config = {
    apiKey: "AIzaSyD-WUhW3_jInlUPmMxV7EInTxx17C0Ba74",
    authDomain: "pointsandme.firebaseapp.com",
    databaseURL: "https://pointsandme.firebaseio.com",
    storageBucket: "pointsandme.appspot.com",
    messagingSenderId: "48621216513"
};

firebase.initializeApp(config);

$("#teacher").bind("click", function(event){
   $(".login").show();
   $("#teacher").hide();
   $("#student").hide();
});

$("#student").bind("click", function(event){
    $(".login").show();
    $("#teacher").hide();
    $("#student").hide();
});

$("#backToHome").bind("click", function(event) {
    $(".login").hide();
    $("#teacher").show();
    $("#student").show();
});