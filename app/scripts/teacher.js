function updateStudents(teacher){
    var students = teacher.Students;

    for (var key in students) {
        if (students.hasOwnProperty(key)) {
            if(students[key]){
                addStudentToList(key);
            }
        }
    }
}

function addStudentToList(id){
    return firebase.database().ref('/Students/' + id).once('value').then(function(snapshot) {
        console.log(snapshot.val());

        $("#students").append('<li>'+ snapshot.val().Name + '</li>');

    });
}

function addNewStudent(name) {
    var userId = firebase.auth().currentUser.uid;

    var newKey = firebase.database().ref('Students').push().key;

    var updates = {};
    updates['/Students/' + newKey] = {"Name" : name, "Teacher" : userId};
    updates['/Teachers/' + userId + '/Students/' + newKey] = true;

    return firebase.database().ref().update(updates);

}