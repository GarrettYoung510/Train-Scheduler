const firebaseConfig = {
    apiKey: "AIzaSyA31MYUswwsnUSoU5LMxgzoyqWMurbyuGw",
    authDomain: "train-scheduler-72b1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-72b1b.firebaseio.com",
    projectId: "train-scheduler-72b1b",
    storageBucket: "train-scheduler-72b1b.appspot.com",
    messagingSenderId: "286718348948",
    appId: "1:286718348948:web:2ed25d5c69ca046e"
};


firebase.initializeApp(firebaseConfig);
// initialize app

// variable to reference the database
const trainData = firebase.database();

$('#submit').on('click',function(){
    let trainName = $('#train-name').val().trim();
    let destination = $('#train-destination').val().trim();
    let firstTrain = moment($('#train-time').val().trim(), "HH:mm").subtract(10,"years").format("X");
    let frequency = $('#train-frequency').val().trim();

const newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
}

trainData.ref().push(newTrain);

alert("Your Train has been added");

$('#train-name').val("");
$('#train-destination').val("");
$('#train-time').val("");
$('#train-frequency').val("");

return false;
})

// pull data from firebase
trainData.ref().on("child_added", function(snapshot){
    let name = snapshot.val().name;
    let destination = snapshot.val().destination;
    let frequency = snapshot.val().frequency;
    let firstTrain = snapshot.val().firstTrain;

    let remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    let minutes = frequency - remainder;
    let arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainSchedule > tBody").append(`<tr><td>${name}</td><td>${destination}</td><td>${frequency}</td><td>${arrival}</td><td>${minutes}</td></tr>`);


})

