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
    }
    else {
        loggedOut();
    }
}

function loggedOut(){
    //TODO: Do shit here that returns to login page etc.
}
