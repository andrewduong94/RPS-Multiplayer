//firebase

var config = {
        apiKey: "AIzaSyDzKiFnYN-QBriH_wPqvIcPqIRSiletn60",
        authDomain: "rpsgame-c64fe.firebaseapp.com",
        databaseURL: "https://rpsgame-c64fe.firebaseio.com",
        projectId: "rpsgame-c64fe",
        storageBucket: "rpsgame-c64fe.appspot.com",
        messagingSenderId: "262865121502"
  };
  firebase.initializeApp(config);

var dataRef = firebase.database();
var userOneDisplay = $('#userOne')
var userTwoDisplay = $('#userTwo')

var player1 = null;
var player2 = null;


dataRef.ref("/players/").on("value", function(snapshot){
    
})


// adding player to game and database
$("#enterName").on("click", function(event){
    event.preventDefault();
    if (!(player1&&player2)){

        if (player1==null){
            var player1Name = $("#name").val().trim();
            console.log(player1Name)
            player1 = {
                name: player1Name,
                win: 0,
                loss: 0,
                tie: 0,
                choice:""
            };
            //add to database
            dataRef.ref().child("players/player1").set(player1);
            //remove on disconnect
            dataRef.ref("/players/player1").onDisconnect().remove();

            
        }
        else {
            var player2Name = $("#name").val().trim();
            player2 = {
                name : player2Name,
                win: 0,
                loss: 0,
                tie: 0,
                choice:""
            }
            
            dataRef.ref().child("players/player2").set(player2);
            dataRef.ref("/players/player2").onDisconnect().remove();
        }
    }

});




