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

 //3.localStorageから１件削除 ==> 選択されている行を削除
 function delLocalStorage() {
     const del = document.getElementById("del");
     del.addEventListener("click",
     function(e) {
         e.preventDefault();
         const chkbox1 = document.getElementsByName("chkbox1"); //version-up3 add
         const table1 = document.getElementById("table1"); //version-up3 add
         let w_cnt = 0; //選択されていれば、"1"が返却（へんきゃく）される //version-up3 w_sel="0" ==> w_cnt=0
         w_cnt = selectCheckBox(del); //テーブルからデータ選択 //version-up3 chg 戻り値：w_sel ==> w_cont 引数：なし==> "del"

         if(w_cnt >= 1){ //version-up3 chg w_sel === "1" ===> w_cnt >= 1
             //const key = document.getElementById("textKey").value; //version-up3 del
             //const value = document.getElementById("textMemo").value; //version-up3 del
             let w_confirm = window.confirm("localStorageから選択されている" + w_cnt + "件を削除　(delete) しますか？"); //version-up3 change
             //確認ダイアログで[ok」を押された時、削除する
             if(w_confirm === true) {
                for(let i=0; i < chkbox1.length; i++){//version-up3 add
                    if(chkbox1[i].checked) { //version-up3 add
             localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); ///version-up3 chg
            } //version-up3 add
        } //version-up3 add
             viewStorage(); //localStorageからのデータの取得とテーブルへ表示
             let w_msg = "localStorageから" + w_cnt + "件を削除 (delete) しました。"; //version-up3 chg
             window.alert(w_msg);
             document.getElementById("textKey").value = "";
             document.getElementById("textMemo").value = "";
                } 
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
         let w_confirm = window.confirm("localStorageのデータをすべて削除(all clear)します。\nよろしいですか？");

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
        selectCheckBox(select); //テ－ブルからデータ選択//version-up3 chg 引数:なし===> "select"
        //selectCheckBox(); //テーブルからデータ選択 version-up2 chg:selectRadioBtn ==> selectCheckBox
        },false
    );
 }

 //テーブルからデータ選択
 function selectCheckBox(mode) {//version-up3 chg 引数：なし ==> mood
   //let w_sel = "0"; //選択されていれば、"１"にする //version-up3 del
    let w_cnt = 0; //選択されているcheckboxの後//version-up2 add
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = ""; //work 
    let w_textMemo = ""; //work 

    for(let i=0; i < chkbox1.length; i++) {//version-up2 chg: radio1 ==> chkbox1
        if(chkbox1[i].checked) { //version-up2 chg: radio1 ==> chkbox1
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;//version-up2 chg:document.getElementById("textKey").value ==> w_textKey
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;//version-up2 chg: document.getElementById("textMemo").value ==> w_textMemo          
            //return w_sel = "1"; version-up2 del
            }// version-up2 add
            w_cnt++; //選択されているcheckbokの数をcount version-up2 add
        }
    }
   
    document.getElementById("textKey").value = w_textKey; 
    document.getElementById("textMemo").value = w_textMemo;
    if(mode === select){ //version-up3 add
       if(w_cnt === 1) {                                    
           return w_cnt;                              
       }else{                                               
           window.alert("1つ選択 (select) してください。");             
        }  
    }  
    
    if(mode === del){ //version-up3 add
        if(w_cnt >= 1) {                                    
            return w_cnt;                              
        }else{                                               
            window.alert("1つ以上選択 (select) してください。");             
         }  
     }
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

         td1.innerHTML = "<input name='chkbox1' type='checkbox'>"; // version-up2 change
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

