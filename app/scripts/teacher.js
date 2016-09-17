function updateStudents(teacher){
    var students = teacher.Students;

    for (var key in students) {
        if (students.hasOwnProperty(key)) {
            if(students[key]){
                addStudent(key);
            }
        }
    }
}

function addStudent(id){
    return firebase.database().ref('/Students/' + id).once('value').then(function(snapshot) {
        console.log(snapshot.val());

        $("#students").append('<li>'+ snapshot.val().Name + '</li>');

    });
}