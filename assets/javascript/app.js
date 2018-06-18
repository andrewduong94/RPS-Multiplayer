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
var currentPlayer = ""
var turn = 1
var player1 = null;
var player2 = null;
var player1Name = ""
var player2Name = ""
var player1Choice = ""
var player2Choice = ""


dataRef.ref("/players/").on("value", function(snapshot){
    if (snapshot.child("player1").exists()){
        player1 = snapshot.val().player1;
        player1Name = player1.name;
        userOneDisplay.html(player1Name)
        $('#stats1').html("Win: " + player1.win + " Loss: " + player1.loss + " Ties: " + player1.tie)
        $('#choices1').empty()
        $('#choices1').append('<button class="playerChoice" id="choice1"' + 'data-name="rock">' + "Rock" + '</button>' )
        $('#choices1').append('<button class="playerChoice" id="choice1"' + 'data-name="paper">' + "Paper" + '</button>' )
        $('#choices1').append('<button class="playerChoice" id="choice1"' + 'data-name="scissors">' + "Scissors" + '</button>' )
    }

    else {

        userOneDisplay.html("Waiting for Player 1...")
        $('#choices1').empty()
        $('#choices2').empty()
        $('#stat1').empty()
        $('#result').empty()
    }

    if (snapshot.child("player2").exists()){
        player2 = snapshot.val().player2;
        player2Name = player2.name;
        userTwoDisplay.html(player2Name)
        $('#stats2').html("Win: " + player2.win + " Loss: " + player2.loss + " Ties: " + player2.tie)
        $('#choices2').empty()
        $('#choices2').append('<button class="playerChoice2" id="choice"' + 'data-name="rock">' + "Rock" + '</button>' )
        $('#choices2').append('<button class="playerChoice2" id="choice"' + 'data-name="paper">' + "Paper" + '</button>' )
        $('#choices2').append('<button class="playerChoice2" id="choice"' + 'data-name="scissors">' + "Scissors" + '</button>' )

    }

    else {
 
        userTwoDisplay.html("Waiting for Player 2...")
        $('#choices1').empty()
        $('#choices2').empty()
        $('#stat2').empty()
        $('#result').empty()
    }

})

dataRef.ref().on("value", function(snapshot){
    $('#result').html(snapshot.val().outcome)
    console.log((snapshot.val().outcome))
});


// adding player to game and database
$("#enterName").on("click", function(event){
    event.preventDefault();
    if (!(player1&&player2)){

        if (player1==null){
            var currentPlayer = $("#name").val().trim(); 
            player1 = {
                name: currentPlayer,
                win: 0,
                loss: 0,
                tie: 0,
                choice:""
            };
            //add to database
            dataRef.ref().child("players/player1").set(player1);
            //remove on disconnect
            dataRef.ref("/players/player1").onDisconnect().remove();
            //setting starting turn to Player1
            dataRef.ref().child("/turn").set(1);
            dataRef.ref("outcome").onDisconnect().remove();
            
        }
        else {

            var currentPlayer = $("#name").val().trim();
            player2 = {
                name : currentPlayer,
                win: 0,
                loss: 0,
                tie: 0,
                choice:""
            }
            
            dataRef.ref().child("players/player2").set(player2);
            dataRef.ref("/players/player2").onDisconnect().remove();
            dataRef.ref("outcome").onDisconnect().remove();
        }
    }

});

console.log(currentPlayer)
console.log(turn)

$(document).on("click", ".playerChoice", function(event) {
	event.preventDefault();

if (turn === 1){
    var choice = $(event.target).data('name')
    console.log(choice)
    player1Choice = choice
    dataRef.ref().child("/players/player1/choice").set(choice);
    turn = 2
    dataRef.ref().child("/turn").set(2);
}
});

$(document).on("click", ".playerChoice2", function(event) {
    event.preventDefault();
    
if (turn === 2){
    var choice2 = $(event.target).data('name')
    console.log(choice2)
    player2Choice = choice2
    dataRef.ref().child("/players/player2/choice").set(choice2);
    check()
}
})

function check() {
    console.log(player2.choice)
	if (player1.choice === "rock") {
		if (player2.choice === "rock") {
			
			

			dataRef.ref().child("/outcome/").set("Tie game!");
			dataRef.ref().child("/players/player1/tie").set(player1.tie + 1);
			dataRef.ref().child("/players/player2/tie").set(player2.tie + 1);
		} else if (player2.choice === "paper") {
			
			

			dataRef.ref().child("/outcome/").set("Paper wins!");
			dataRef.ref().child("/players/player1/loss").set(player1.loss + 1);
			dataRef.ref().child("/players/player2/win").set(player2.win + 1);
		} else {
			
			

			dataRef.ref().child("/outcome/").set("Rock wins!");
			dataRef.ref().child("/players/player1/win").set(player1.win + 1);
			dataRef.ref().child("/players/player2/loss").set(player2.loss + 1);
		}

	} else if (player1.choice === "paper") {
		if (player2.choice === "rock") {
			
			

			dataRef.ref().child("/outcome/").set("Paper wins!");
			dataRef.ref().child("/players/player1/win").set(player1.win + 1);
			dataRef.ref().child("/players/player2/loss").set(player2.loss + 1);
		} else if (player2.choice === "paper") {
		

			dataRef.ref().child("/outcome/").set("Tie game!");
			dataRef.ref().child("/players/player1/tie").set(player1.tie + 1);
			dataRef.ref().child("/players/player2/tie").set(player2.tie + 1);
		} else { 
			
			

			dataRef.ref().child("/outcome/").set("Scissors win!");
			dataRef.ref().child("/players/player1/loss").set(player1.loss + 1);
			dataRef.ref().child("/players/player2/win").set(player2.win + 1);
		}

	} else if (player1.choice === "scissors") {
		if (player2.choice === "rock") {
			
			

			dataRef.ref().child("/outcome/").set("Rock wins!");
			dataRef.ref().child("/players/player1/loss").set(player1.loss + 1);
			dataRef.ref().child("/players/player2/win").set(player2.win + 1);
		} else if (player2.choice === "paper") {
			
			

			dataRef.ref().child("/outcome/").set("Scissors win!");
			dataRef.ref().child("/players/player1/win").set(player1.win + 1);
			dataRef.ref().child("/players/player2/loss").set(player2.loss + 1);
		} else {
			
			

			dataRef.ref().child("/outcome/").set("Tie game!");
			dataRef.ref().child("/players/player1/tie").set(player1.tie + 1);
			dataRef.ref().child("/players/player2/tie").set(player2.tie + 1);
		}

	}

	
	turn = 1;
	dataRef.ref().child("/turn").set(1);
}





