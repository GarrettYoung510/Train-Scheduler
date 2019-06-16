// firebase info
const firebaseConfig = {
    apiKey: "AIzaSyA31MYUswwsnUSoU5LMxgzoyqWMurbyuGw",
    authDomain: "train-scheduler-72b1b.firebaseapp.com",
    databaseURL: "https://train-scheduler-72b1b.firebaseio.com",
    projectId: "train-scheduler-72b1b",
    storageBucket: "train-scheduler-72b1b.appspot.com",
    messagingSenderId: "286718348948",
    appId: "1:286718348948:web:2ed25d5c69ca046e"
};

// initialize app
firebase.initializeApp(firebaseConfig);


// variable to reference the database
const trainData = firebase.database();

// triggers on click event for submit button
$('#submit').on('click',function(){
    // pull value and trim data that was inputted
    let trainName = $('#train-name').val().trim();
    let destination = $('#train-destination').val().trim();
    let firstTrain = moment($('#train-time').val().trim(), "HH:mm").subtract(10,"years").format("X");
    let frequency = $('#train-frequency').val().trim();

// create a const object for train
const newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
}

// push newTrain data to train firebase
trainData.ref().push(newTrain);

// alert user that the train has been added
alert("Your Train has been added");

// pull values for each of these
$('#train-name').val("");
$('#train-destination').val("");
$('#train-time').val("");
$('#train-frequency').val("");

// return false so this will stop running
return false;
})

// pull data from firebase that was inputted before 
trainData.ref().on("child_added", function(snapshot){

    // variables for holding the snapshots of the data
    let name = snapshot.val().name;
    let destination = snapshot.val().destination;
    let frequency = snapshot.val().frequency;
    let firstTrain = snapshot.val().firstTrain;

    // use moment to convert to unix for calculations finding the remainder of frequency
    let remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    // subtract remainder from frequency
    let minutes = frequency - remainder;
    // display arrival in minutes
    let arrival = moment().add(minutes, "m").format("hh:mm A");

    // console logs to check if displaying properly
    // console.log(remainder);
    // console.log(minutes);
    // console.log(arrival);

    $("#trainSchedule > tBody").append(`<tr><td>${name}</td><td>${destination}</td><td>${frequency}</td><td>${arrival}</td><td>${minutes}</td></tr>`);


})

