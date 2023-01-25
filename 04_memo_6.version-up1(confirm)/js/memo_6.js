"use strict";
window.addEventListener("DOMContentLoaded",
    function(){

        if (typeof localStorage === "undefined"){
            window.alert("このブラウザはLocal Storage機能が実装されていません。");
            return;
        }else {
          viewStorage();  //localStorageからデータの取得とテーブルへ表示
            saveLocalStorage(); //2.localStorageへ保存
            delLocalStorage(); //localStorage から１件削除
            allClearStorage(); //localStorageからすべて削除
            selectTable();//5.データ選択
        }
    },false
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function(e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key== "" || value=="") {
                window.alert("Key.Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("localStorageに\n[" + key + " " + value + "]\nを保存しますか?");
                //確認ダイアオグで[ok]を押されたとき、保存するversion-up1 add
                if (w_confirm === true){      //version-up1 add
                  
                localStorage.setItem(key, value);
                viewStorage(); //localStorageからデータの取得とテーブルへ表示
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                } //version-up1 add
            }
        },false
    );
 };

 //3.localStorageから１件削除
 function delLocalStorage() {
     const del = document.getElementById("del");
     del.addEventListener("click",
     function(e) {
         e.preventDefault();
         let w_sel = "0"; //選択されていれば、"1"が返却（へんきゃく）される
         w_sel = selectRadioBtn();

         if(w_sel === "1"){
             const key = document.getElementById("textKey").value;
             const value = document.getElementById("textMemo").value;
             let w_confirm = window.confirm("localStorageから\n[" + key + " " + value + "]\nを削除しいますか？"); //version-up1 add
             if(w_confirm === true) {
             localStorage.removeItem(key);
             viewStorage(); //localStorageからのデータの取得とテーブルへ表示
             let w_msg = "localStorageから" + key + " " + value +  "を削除しました。";
             window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
                } //version-up1 add
            }
        }, false
     );
 }

 //4.localStorageからすべて削除
 function allClearStorage() {
     const allClear = document.getElementById("allClear");
     allClear.addEventListener("click",
     function(e) {
         e.preventDefault();
         let w_confirm = window.confirm("localStorageのデータをすべて削除(all clear)します。\nよろしですか？");

         //確認ダイアオグで[ok]を押されたとき、すべて取得とテーブルへ表示
         if(w_confirm === true){
             localStorage.clear();
             viewStorage();
             let w_msg = "LocalStorage のデータを全て削除しました。";
             window.alert(w_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
            }
        }, false
    );
};
 //5.データ選択
 function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e) {
        e.preventDefault();
        selectRadioBtn(); //テーブルからデータ選択
        },false
    );
 }

 //テーブルからデータ選択
 function selectRadioBtn() {
    let w_sel = "0"; //選択されていれば、"１"にする
    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for(let i=0; i < radio1.length; i++) {
        if(radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i+1].cells[2].firstChild.data;
            return w_sel = "1";
        }
    }

    window.alert("1つ選択（select）してください。");
 };

 //localStorageからのデータ取得とテーブルへ表示
 function viewStorage() {
     const list = document.getElementById("list");
     //htmlのテーブル初期化
     while(list.rows[0]) list.deleteRow(0);

     //localStorageすべての情報の取得
     for(let i=0; i<localStorage.length; i++) {
         let w_key = localStorage.key(i);

         //localStorageのキーと値を表示
         let tr = document.createElement("tr");
         let td1 = document.createElement("td");
         let td2 = document.createElement("td");
         let td3 = document.createElement("td");
         list.appendChild(tr);
         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(td3);

         td1.innerHTML = "<input name='radio1' type='radio'>";
         td2.innerHTML = w_key;
         td3.innerHTML = localStorage.getItem(w_key);
     }

    //jQueryのplugin.tablesorterを使ってテーブルのソート
    //sortlish: 引数１...最初からそうーとしておく列を指定、引数２...０＿昇順、１..降順
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });

    $("#table1").trigger("update");
    };

