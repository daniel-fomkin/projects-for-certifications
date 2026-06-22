'use strict';

const drumButtons = document.querySelector("#pad-bank").querySelectorAll("button");

drumButtons.forEach(el => {
    const audio = el.querySelector("audio");
    const display = document.querySelector("#display");

    el.addEventListener("click", () => {
        audio.play();
        display.textContent = el.id;
    });

    document.addEventListener("keydown", event => {
        if(audio.id == (event.key).toUpperCase()){
            audio.play();
            display.textContent = el.id;
        }
    })
})

