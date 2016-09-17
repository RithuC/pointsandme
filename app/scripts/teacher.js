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