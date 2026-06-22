'use strict';

const poll = new Map();

function addOption(option){
    if(!option){
        return "Option cannot be empty.";
    }
    else if(!poll.has(option)){
        poll.set(option, new Set());
        return `Option "${option}" added to the poll.`;
    }
    else{
        return `Option "${option}" already exists.`;
    }
    
}

function vote(option, voterId){
    if(poll.has(option)){
        if(poll.get(option).has(voterId)){
            return `Voter ${voterId} has already voted for "${option}".`;
        }
        else{
            poll.get(option).add(voterId);
            return `Voter ${voterId} voted for "${option}".`;
        }
    }
    else{
        return `Option "${option}" does not exist.`
    }
}

function displayResults(){
    let text = "Poll Results:\n";
    poll.forEach((val, key) => {
       text += `${key}: ${val.size} votes\n`;
    })
    text = text.trim();
    return text;
}


addOption("Turkey");
addOption("Morocco");
addOption("Spain");

vote("Morocco", 0);
vote("Turkey", 3);
vote("Turkey", 1);

console.log(displayResults());