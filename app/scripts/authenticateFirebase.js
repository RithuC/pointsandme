function authenticate() {
    var email = $('#username').val();
    var password = $('#password').val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert(error);
    });
}
