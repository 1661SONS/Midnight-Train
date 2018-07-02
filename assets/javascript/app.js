$(document).ready( function() {

    // plug in firebase
    var config = {
        apiKey: "AIzaSyCwDUwCV7Wq4ItyVp6KeLZ-GL0m37_LF2M",
        authDomain: "marta-smarta.firebaseapp.com",
        databaseURL: "https://marta-smarta.firebaseio.com",
        projectId: "marta-smarta",
        storageBucket: "marta-smarta.appspot.com",
        messagingSenderId: "566046497615"
      };
      firebase.initializeApp(config);

      var trainData = firebase.database();

    // button function for grabbing form data
    $('#addTrainButton').on('click', function() {
        
        // defining user inputs as variables
        var trainName = $('#trainNameInput').val().trim();
            console.log(trainName);
        var destination = $('#destinationInput').val().trim();
            console.log(destination);
        var trainTime = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
            console.log(trainTime);
        var frequency = $('#frequencyInput').val().trim();
            console.log(frequency);

        var newTrain = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        }
        // pushing user's new train to firebase
        trainData.ref().push(newTrain);

    }); // closing addTrainButton click function

    
    // need to hook in firebase
    // need to hook in moment.js
    // from form ..
        // need to grab train name
        // need to grab train destination
        // need to grab first train time
        // need to grab train frequency
    // and save as variables
    

























}); // closing ready function