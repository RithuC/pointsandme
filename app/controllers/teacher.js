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

function addNewStudent(name,newKey) {
    var userId = firebase.auth().currentUser.uid;

    var updates = {};
    updates['/Students/' + newKey] = {"Name" : name, "Teacher" : userId};
    updates['/Teachers/' + userId + '/Students/' + newKey] = true;

    return firebase.database().ref().update(updates);

}

function createStudentUser(email,password,name) {
    var config = {
        apiKey: "AIzaSyD-WUhW3_jInlUPmMxV7EInTxx17C0Ba74",
        authDomain: "pointsandme.firebaseapp.com",
        databaseURL: "https://pointsandme.firebaseio.com",
        storageBucket: "pointsandme.appspot.com",
        messagingSenderId: "48621216513"
    };

    var secondaryApp = firebase.initializeApp(config, "Secondary");

    secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
        var newKey =  firebaseUser.uid;

        console.log("User " + firebaseUser.uid + " created successfully!");
        //I don't know if the next statement is necessary
        secondaryApp.auth().signOut();

        addNewStudent(name,newKey)
    });
}


function updateRewards(){
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/Rewards/' + userId).once('value').then(function(snapshot) {
        var rewards = snapshot.val();

        for (var key in rewards) {
            if (rewards.hasOwnProperty(key)) {
                $("#rewards").append('<li>'+ rewards[key].Name + '(' + rewards[key].Points +')</li>');
            }
        }
    });
}

function updateAllRequestedRewards(){
    var userId = firebase.auth().currentUser.uid;

    return firebase.database().ref('/RewardsPerTeacher/' + userId).once('value').then(function(snaphsot) {
        var rewards = snaphsot.val();

        for(var key in rewards) {
            if(rewards.hasOwnProperty(key)) {
                addToRewardHistory(key)
            }
        }
    });
}

function addToRewardHistory(rewardId){
    return firebase.database().ref('/RewardsRequested/' + rewardId).once('value').then(function(snaphsot) {
        var reward = snaphsot.val();
        var student = reward.Student;
        var rewardType = reward.Reward;
        var teacher = reward.Teacher;

        firebase.database().ref('/Students/' + student).once('value').then(function(students) {
            var student = students.val();
            var studentName = student.Name;
            console.log(rewardType);

            firebase.database().ref('/Rewards/' + teacher + '/' + rewardType).once('value').then(function(rewards) {
                var reward = rewards.val();
                var rewardName = reward.Name;

                $("#rewardHistory").append('<li>'+ rewardName + '(' + studentName +')</li>');
            });

        });



        for(var key in rewards) {
            if(rewards.hasOwnProperty(key)) {

            }
        }
    });
}