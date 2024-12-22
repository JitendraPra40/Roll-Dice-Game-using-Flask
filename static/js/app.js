function getBaseUrl() {
    // Check if the app is running locally (localhost) or in production
    return window.location.hostname === 'localhost' ? 'http://127.0.0.1:5000' : 'https://roll-dice-game.onrender.com';
}

function set_turns() {
    turns = document.getElementById("turns").value;

    console.log(turns);
    
    showMessage(turns +  " " + " " + "Round selected");
    
    
        
    
    //var url = "http://127.0.0.1:5000/set_turns";

    // Get the base URL (local or production)
    var baseUrl = getBaseUrl();
    var url = `${baseUrl}/set_turns`;
    $.post(
        url,
        {
            turns: parseInt(turns),
        },
        function (data, status) {
            console.log(data);
        }
    );


}
let turnCounter = 0;
function roll() {
    turns = document.getElementById("turns").value;
    
    if (turnCounter > turns) {
        alert("You can only roll the dice 5 times.");
        return; // Stop execution if the turn limit is reached
    }
    console.log("Page Loaded");
    comp_score = document.getElementById("comp_score");
    user_score = document.getElementById("user_score");
    
    //var url = "http://127.0.0.1:5000/diceRoll";
    // Get the base URL (local or production)
    var baseUrl = getBaseUrl();
    var url = `${baseUrl}/diceRoll`;
    $.get(url, function (data, status) {
        console.log("got response for scores", data);
        console.log(data.dice_computer);
        console.log(data.dice_user);
        comp_score.innerHTML = data.computer_roll.toString();
        user_score.innerHTML = data.user_roll.toString();
        
        turnCounter++;
       
        if (turnCounter > turns) {
            document.getElementById("roll_button").disabled = true;
            showGameOverPopup(); // Show the custom popup
            return;
        }
    });
}

function show_result() {
    console.log("Page Loaded");
    comp_total_score = document.getElementById("comp_total_score");
    user_total_score = document.getElementById("user_total_score");
    result = document.getElementById("result");
    //var url = "http://127.0.0.1:5000/result";
    // Get the base URL (local or production)
    var baseUrl = getBaseUrl();
    var url = `${baseUrl}/result`;
    $.get(url, function (data, status) {
        console.log("got response for scores", data);
        console.log(data.computer_score);
        console.log(data.user_score);
        comp_total_score.innerHTML = data.computer_score.toString();
        user_total_score.innerHTML = data.user_score.toString();
        result.innerHTML = data.winner.toString();
    });
}


function showGameOverPopup() {
    // Set the message for the popup
    document.getElementById("popupMessage").innerText = "Game Over! Check the Result.";
    document.getElementById("customPopup").style.display = "flex";
    
    setTimeout(function() {
        document.getElementById("messagePopup").style.display = "none";
    }, 1000);
}

function closePopup() {
    document.getElementById("customPopup").style.display = "none";
}


// Show the Message Popup
function showMessage(message) {
    console.log(message);
    document.getElementById("messageText").innerText = message;
    document.getElementById("messagePopup").style.display = "flex";

    // Hide the popup after 3 seconds
    setTimeout(function() {
        document.getElementById("messagePopup").style.display = "none";
    }, 1000); // 3000 milliseconds = 3 seconds
}
