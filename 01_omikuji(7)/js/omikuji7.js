"use strict";

window.addEventListener("DOMContentLoaded",
function(){
let popMessage = "いらっしゃい！おみくじ引いてって！";
window.alert(popMessage);
},false

);

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function(){
  let n = Math.floor(Math.random() * 3);

    switch(n){
        case 0:
            btn1.textContent = "Very Happy!";
            btn1.style.color = "#FF0000";
            btn1.style.fontSize = "40px";
            break;

        case 1:
            btn1.textContent = "Happy!";
            btn1.style.color = "#fff001";
            btn1.style.fontSize = "30px";
            break;

        case 2:
            btn1.textContent = "UnHappy!";
            btn1.style.color = "#261e1c";
            btn1.style.fontSize = "15px";
            break;          
    }
}, false
);