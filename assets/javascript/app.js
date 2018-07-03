$(document).ready( function() {
    
    // play random clip of Midnight Train to Georgia by Gladys Knight & The Pips on form submission
    var audio = new Audio(),
    i = 0;
    var playlist = new Array('assets/audio/gladys-v1.mp3', 'assets/audio/gladys-v2.mp3', 'assets/audio/gladys-v3.mp3');

    audio.addEventListener('ended', function () {
        i = ++i < playlist.length ? i : 0;
        console.log(i)
        audio.src = playlist[i];
        // audio.play(); commented this out so each clip would play only once
        }, true);
        audio.volume = 0.5;
        audio.loop = false;
        audio.src = playlist[0];
    
    // initialize firebase
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
        var lineName = $('#lineNameInput').val().trim();
            console.log(lineName);
        var destination = $('#destinationInput').val().trim();
            console.log(destination);
        var trainTime = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
            console.log(trainTime);
        var frequency = $('#frequencyInput').val().trim();
            console.log(frequency);

        var newTrain = {
            lineName: lineName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        }
        // pushing user's new train to firebase
        trainData.ref().push(newTrain);

        // clear form fields after submission
        $('#lineNameInput, #destinationInput, #trainTimeInput, #frequencyInput').val('');

        // stop page from refreshing
        return false;

    }); // closing addTrainButton click function

    trainData.ref().on('child_added', function(childSnapshot, prevChildKey) {
        // make sure this is working properly
        console.log(childSnapshot.val());

        //
        var firebaseLineName = childSnapshot.val().lineName;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTime = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        //
        var diffTime = moment().diff(moment.unix(firebaseTrainTime), "minutes");
        var timeRemaining = moment().diff(moment.unix(firebaseTrainTime), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemaining;
            console.log(minutes);
        var nextTrainTime = moment().add(minutes, "m").format("hh:mm A");
            console.log(nextTrainTime);
            console.log(moment().format("hh:mm A"));
            console.log(nextTrainTime);
            console.log(moment().format("X"));

        // appending trainData and remove button to table
        $("#trainTable > tbody").append("<tr><td>" + firebaseLineName + "</td><td>"+ firebaseDestination + "</td><td>"  + "every " + firebaseFrequency + " minutes" + "</td><td>" + nextTrainTime + "</td><td>" + minutes + " minutes away" + "</td>" + "<td><button class='btn btn-outline-dark deleteRow'>Remove</button></td></tr>");

        // playing audio
        audio.play();

        // delete table row on button click from UI and firebase
        $('.deleteRow').click(function(){
            $(this).parents('tr').first().remove();
            var trainData = firebase.database().ref();
            trainData.remove();
        });

    }); // closing trainData.ref() function

}); // closing ready function