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
const database = firebase.database();

// Initial Values
let trainName = "";
let trainDestination = "";
let trainFrequency = 0;
let trainNextArrival = 0;
let trainMinutes = 0;

// variable for holding what value the train entered is in the database
let trainEntered = 0;

// // get snapshot of values currently in database 

// // ----------------------------------------------------------------
// // At the page load and subsequent value changes, get a snapshot of the local data.
// // This function allows you to update your page in real-time when the values within the firebase node bidderData changes

//     // If Firebase has a highPrice and highBidder stored (first case)

//         // Set the local variables for highBidder equal to the stored values in firebase.
//         highBidder = snapshot.val().highBidder;
//         highPrice = parseInt(snapshot.val().highPrice);

//         // change the HTML to reflect the newly updated local values (most recent information from firebase)
//         $("#highest-bidder").text(snapshot.val().highBidder);
//         $("#highest-price").text("$" + snapshot.val().highPrice);

//         // Print the local data to the console.
//         console.log(snapshot.val().highBidder);
//         console.log(snapshot.val().highPrice);
// }

//     // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
//     else {

//         // Change the HTML to reflect the local value in firebase
//         $("#highest-bidder").text(highBidder);
//         $("#highest-price").text("$" + highPrice);

//         // Print the local data to the console.
//         console.log("local High Price");
//         console.log(highBidder);
//         console.log(highPrice);
//     }

//     // If any errors are experienced, log them to console.
// }, function(errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });

// --------------------------------------------------------------

// Whenever a user clicks the submit button
$("#submit").on("click", function(event) {
    event.preventDefault();

    // Get the input values
    var trainNameInput = $("#train-name").val().trim();
    // train name input value and trim to delete trailing spaces
    var trainDestinationInput = $("#train-destination").val().trim();
    // input of train destination input and trim to delete trailing spaces
    var trainTimeInput = $("#train-time").val().trim();
    // input of train time input in and trim to delete trailing spaces
    var trainFrequencyInput = $("#train-frequency").val().trim();
    // input of train frequency input in and trim to delete trailing spaces

    trainEntered++;
    // Log to console the Bidder and Price (Even if not the highest)


    // Save the new price in Firebase
    database.ref("/trainData").push({
        // .push will add the data to this database
        trainNameInput,
        // adds train name input to database
        trainDestinationInput,
        // adds train destination input to database
        trainTimeInput,
        // adds train time input to database
        trainFrequencyInput
        // adds train frequency input to database
    });

    // add new train name to the page
    $('tbody').append(`<tr id="${trainEntered}"></tr>`);
    // creates new table row when a new train is entered

    var $newTrain = $(`<tr  id="${trainEntered}>`).append(`<td></td>`);
    $($newTrain).text(trainNameInput);
    // adds train name to new td created
    $($newTrain).append(`<td></td>`).text(trainDestinationInput);
    // add new destination to the page


    // var $newDestination = $(`'td id=${trainDestinationInput}'`).html(`<td></td>`)
    // $($newDestination).text(trainDestinationInput);
    // // add new time to the page
    // add new frequency to the page


    // // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
    // highBidder = bidderName;
    // highPrice = parseInt(bidderPrice);

    // Change the HTML to reflect the new high price and bidder
    // $("#highest-bidder").text(bidderName);
    // $("#highest-price").text("$" + bidderPrice);
});

dataRef.ref().on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainNameInput);
    console.log(snapshot.val().trainDestinationInput);
    console.log(snapshot.val().trainTimeInput);
    console.log(snapshot.val().trainFrequencyInput);
    // Change the HTML to reflect
    $("#train").text(snapshot.val().trainNameInput);
    $("#destination").text(snapshot.val().trainDestinationInput);
    $("#time").text(snapshot.val().trainTimeInput);
    $("#frequency").text(snapshot.val().trainFrequencyInput);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

database.ref("/trainData").on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        $('#train').append(`<tr>${childSnapshot.trainNameInput.val()}</tr>`)
    })
});
// Assumptions
// var tFrequency = 3;

// // Time is 3:30 AM
// var firstTime = "03:30";

// // First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// // Current Time
// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // Difference between the times
// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// // Time apart (remainder)
// var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// // Minute Until Train
// var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // Next Train
// var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));