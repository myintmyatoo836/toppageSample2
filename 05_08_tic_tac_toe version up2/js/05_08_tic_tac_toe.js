"use strict";

//flagがpen-flagのときpenguinsのターン、bear-flagのときbearのターン
let flag = "pen-flag";

//turn数をcounter
let counter = 9;

//class ="square" を取得
const squares = document.getElementsByClassName("square");

//Arrayに変換
//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Object/Array/from
const squaresArray = Array.from(squares);

//squaresの要素を取得
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//NewGame ボタン取得
const newgamebtn_display = document.getElementById("newgame-btn"); //New Game button areaの要素を取得
const newgamebtn = document.getElementById("btn90"); //New Game button の要素を取得

// Win or Lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

let winningLine = null;

//メッセージ
const msgtxt1 = '<p class="image"><img src ="img/penguins.png" width=61px height=61px></p><p class="text">Penguins Attack! (your turn)</p>';
const msgtxt2 = '<p class="image"><img src ="img/whitebear.png" width=61px height=61px></p><p class="text">WhiteBear Attack! (computer turn)</p>';
const msgtxt3 = '<p class="image"><img src ="img/penguins.png" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src ="img/whitebear.png" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Whitebear Win!!</p>';
const msgtxt5 = '<p class="image"><img src ="img/penguins.png" width=61px height=61px><img src ="img/whitebear.png" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';

//Sound
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];
// ********************************************
// ベージ本体が読み込まれたタイミングで実行するコード
// ********************************************
window.addEventListener("DOMContentLoaded",
    function() {
        //メッセージ（最初はpenguinsのターンから）
        setMessage("pen-turn");
        //squareがクリック可能かを判断するクラスを追加
        squaresArray.forEach(function(square){
            square.classList.add("js-clickable");
        });
    }, false
);

// ********************************************
// Win or Lose Judgment Lineを配列化
// ********************************************

// JavaScriptでfilterを使う方法；https://techacademy.jp/megazine/15575
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

// ********************************************
//squareをクリックしたときにイベント発火（はっか）
// ********************************************
// クリックしたsquareに、penguinsかbearを表示。両像を表示したsquareはクリックできないようにする。win or lose Judgementの呼び出し
//クリックしたときの処理

squaresArray.forEach(function (square) {
    square.addEventListener('click', () => {
        let gameOverFlg = isSelect(square); //gameStatusを追加

        //GameOverではない場合、クマのターン(auto)
        if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox"); 
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function() {
                  bearTurn();  
                },
                "2000"
            );
        }
    });
});

// ****************************************
// クリックしたsquareにはpenguinsかbearを表示
// 表示したところはクリックしたできないようにする。
// win or lose 判定の呼び出し
//***************************************** 
function isSelect(selectSquare) {
    let gameOverFlg = "0";

    if (flag === "pen-flag") {
        //click sound
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play(); //再生

        selectSquare.classList.add("js-pen-checked");//squareにはpenguinsを表示。
        selectSquare.classList.add("js-unclickable");//squareをclickできないようにする。
        selectSquare.classList.remove("js-clickable");//squareをclick可能かを判断するクラスを削除

        //penguins win
        if (isWinner("penguins")) {
            setMessage("pen-win"); //display win message
            gameOver("penguins");
            return gameOverFlg = "1";
        }
        setMessage("bear-turn");
        flag = "bear-flag";

    } else {
        //Click Sound
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play(); //再生

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        selectSquare.classList.remove("js-clickable");//squareがクリック可能かを判断するクラスを削除

        //white-bear win
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return gameOverFlg = "1";
        }

        setMessage("pen-turn");
        flag = "pen-flag";
    }

    //ターン数counterをー１する
    counter--;

    //ターン数＝０になったらDRAW
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
        return gameOverFlg = "1";
    }

    return gameOverFlg = "0";
}
// ****************************************
// 勝敗判定（しょうはいはんてい）
// ****************************************
// classListの使い方まとめ:https//giita.com/tomokichi ruby/items/2460c5902d19b81cace5
function isWinner(symbol) {
    //some: １つでも条件を満たしていらばTrueを返す
    const result = lineArray.some(function (line) {
        //every: 全て条件を満たしていらばTrueを返す
        const subResult = line.every(function (square) {
            if(symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if(symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        //trueを返したlineをwinningLineに代入
        if (subResult) {winningLine = line}

        return subResult;
    });
    return result;
}
// メッセージ切り替え関数
// ****************************************

function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML=msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML=msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML=msgtxt3; 
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML=msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML=msgtxt5;  
            break;                 
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}

function gameOver(status) {
    //GameOver Sound
    let w_sound //wk soundの種類
    switch (status) {
        case "penguins":
            w_sound = gameSound[2];
            break;

         case "bear":
            w_sound = gameSound[3];
            break;

        case "draw":
            w_sound = gameSound[4];
            break;
        }

        let music = new Audio(w_sound);
        music.currentTime = 0;
        music.play(); //再生
    
    //all square unclickable
    //squaresArray.forEach(function (square) {
        //square.classList.add("js-unclickable");
    //});
    squaresBox.classList.add("js-unclickable");//squares-boxをクリックできないようにする。

    //display New Game button : display
    newgamebtn_display.classList.remove("js-hidden");

    //winEffect
    if(status=== "penguins") {
        //winner-line penguins high-light
        if (winningLine) {
            winningLine.forEach(function (square) {
            square.classList.add("js-pen_highLight");
            });
        }
        //penguins win!! ==>snow color is pink
        $(document).snowfall({
            flakeColor : "rgb(255,240,245)", //雪の色
            maxSpeed : 3, //最大速度
            minSpeed : 1, //最小速度
            maxSize : 20, //最大サイズ
            minSize : 10, //最小サイズ
            round : true
        });
    } else if(status=== "bear") {
        //winner-line bear high-light
        if(winningLine) {  
            winningLine.forEach(function (square) {
            square.classList.add("js-bear_highLight"); 
            });
        }
        //whitebear win!! ==>snow color is blue
        $(document).snowfall({
            flakeColor : "rgb(175,238,238)", //雪の色
            maxSpeed : 3, //最大速度
            minSpeed : 1, //最小速度
            maxSize : 20, //最大サイズ
            minSize : 10, //最小サイズ
            round : true
        });
    }
}

//NewGame ボタン　クリック時、　ゲーム初期化
//***************************************************/
// classListの使い方まとめ：https://giita.com/tomokichi ruby/items/2460c5902d19b81cace5
newgamebtn.addEventListener("click", function() {
    //penguin のターン
    flag = "pen-flag";
    //タ－ン数counter
    counter = 9;
    winningLine = null;
    squaresArray.forEach(function (square) {
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
        square.classList.add("js-clickable");//squareがクリック可能かを判断するクラスを追加
    });

    //squares box をクリックで来るようにようにする
    squaresBox.classList.remove("js-unclickable");

    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");

    //snowfall stop
    $(document).snowfall("clear");
});

function bearTurn() {
    let bearTurnEnd = "0";
    let gameOverFlg = "0";

    while(bearTurnEnd === "0") {

        //クマのリーチ行検索(attack)
        bearTurnEnd = isReach("bear");
        if(bearTurnEnd === "1") {//クマのリーチ行あり・・・この一手で終わり
            gameOverFlg = "1";
            break; //while を終了
        }

        //ペンギンのリーチ行検索(defence)
        bearTurnEnd = isReach("penguins");
        if(bearTurnEnd === "1") {
            break; //while を終了
        }
    

    //まだマス目を選んでいない場合、クリックできるマス目をランダムにえらぶ
    const bearSquare = squaresArray.filter(function(square) {
        return square.classList.contains("js-clickable");
    });

    let n = Math.floor(Math.random()*bearSquare.length);
    gameOverFlg = isSelect(bearSquare[n]);
    break; //while を終了
}

    if (gameOverFlg === "0") {
        const squaresBox = document.getElementById("squaresBox");
        squaresBox.classList.remove("js-unclickable");
    }
}

//**********************************************************/
//リーチ行を探す
//**********************************************************/
function isReach(status) {
    let bearTurnEnd = "0"; //クマのターン

    lineArray.some(function (line) {
        let bearCheckCnt = 0; //クマがチェックさらている数
        let penCheckCnt = 0; //penguinがチェックさらている数

        line.forEach(function (square) {
            if(square.classList.contains("js-bear-checked")) {
                bearCheckCnt++;
            }
            if(square.classList.contains("js-pen-checked")) {
                penCheckCnt++;
            }
        });

        //クマのリーチ行検時に、クマのリーチ行あり
        if(status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
            bearTurnEnd = "1"; //クマのリーチ行あり
        }

        //ペンギンのリーチ行検時に、ペンギンのリーチ行あり
        if(status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
            bearTurnEnd = "1"; //penguinのリーチ行あり
        }

        //クマがペンギンのリーチ行ありの場合、空いているクマ目を選択する
        if(bearTurnEnd === "1") {
            line.some(function (square){
                if(square.classList.contains("js-clickable")) {
                    isSelect(square);
                    return true;
                }
            })
            return true;
        }
    });
    return bearTurnEnd;
}