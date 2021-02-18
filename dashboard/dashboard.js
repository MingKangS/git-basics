async function triggerNotification1(message) {
    var l = {
        0:"<div class='emoji'></div>Customer is agitated. Show some empathy",
        1:"<div class='emoji'></div>You are speaking too slow. Speak faster",
        2:"<div class='emoji'></div>Customer is happy, build rapport",
        3:"<div class='emoji'></div>Your energy is too low. Raise your energy",
        4:"<div class='emoji'></div>You are interrupting the customer.",
        5:"<div class='emoji'></div>emotion5",
    }
    message = l[Math.floor(Math.random() * 6)];
    triggerNotification(message);
}

const trigger_button = document.getElementById("trigger_button");
console.log(trigger_button)
trigger_button.addEventListener("click",() => {triggerNotification1("test")});


// declare as global variables
var messageQueueList = [];
var toSkipAppend = 0;

// function takes in an emotion as string eg: "happy"
async function triggerNotification(message) {
    // get element in document that displays the message
    const currentMessage = document.getElementById("notification");

    // check if it is already displaying a message, if so, append the previous message to the queue and increment skip counter
    if (currentMessage.innerHTML) {
        appendToQueue(currentMessage.innerHTML.slice(5,-6));
        toSkipAppend += 1;
    }

    // display current message
    currentMessage.innerHTML = "<div>" + message + "</div>";

    // sleep it for 3 seconds before appending to queue
    await sleep();

    // toSkipAppend >= 1 means this message has already been appended to queue so skip this message
    if (toSkipAppend >= 1) {
        console.log(1);
        toSkipAppend -= 1;
    } else {
        console.log(2);
        appendToQueue(message);
        currentMessage.innerHTML = "";
    }
    
    
}

// this function appends the current message to the queue to display the previous five messages
async function appendToQueue(message) {
    
    messageQueueList.push(message.slice());

    // ensures the queue only disply the last five message 
    if (messageQueueList.length > 5) {
        messageQueueList.shift();
    }

    // add messagess to the messageQueue element in document
    var divs = ""
    for (m of messageQueueList.reverse()) {
        divs += "<div>" + m + "</div>";
    }
    messageQueueList.reverse()
    const messageQueue = document.getElementById("messageQueue");
    messageQueue.innerHTML = divs;
}

async function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3000);
    });
}

