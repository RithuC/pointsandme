firebase.auth().onAuthStateChanged(authStateChanged);

function authenticate() {
    var email = $('#username').val();
    var password = $('#password').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert(error);
    });
}

function authStateChanged(user){
    if(user) {
        console.log("logged in with data" + user.email + " " + user.displayName);
        loggedIn();
    }
    else {
       // loggedOut();
    }
}

function loggedIn(){
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/Teachers/' + userId).once('value').then(function(snapshot) {
        console.log(snapshot.val());

        updateStudents(snapshot.val());
        updateRewards();
        updateAllRequestedRewards();

        $("h1").text("Welcome " + snapshot.val().Name);
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        loggedOut();
    }, function(error) {
        alert(error);
    });
}

function loggedOut(){
    // This may be quick and dirty, but it works
    location.reload(true)
}

