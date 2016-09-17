var config = {
    apiKey: "AIzaSyD-WUhW3_jInlUPmMxV7EInTxx17C0Ba74",
    authDomain: "pointsandme.firebaseapp.com",
    databaseURL: "https://pointsandme.firebaseio.com",
    storageBucket: "pointsandme.appspot.com",
    messagingSenderId: "48621216513"
};
firebase.initializeApp(config);

$("#teacher").bind("click", function(event){
   $(".login").removeClass('hidden');
   $("#teacher").hide();
   $("#student").hide();
   $("#register").hide();
});

$("#student").bind("click", function(event){
    $(".login").removeClass('hidden');
    $("#teacher").hide();
    $("#student").hide();
    $("#register").hide();
});

$("#backToHome").bind("click", function(event) {
    $(".login").addClass('hidden');
    $("#teacher").show();
    $("#student").show();
    $("#register").show();
});