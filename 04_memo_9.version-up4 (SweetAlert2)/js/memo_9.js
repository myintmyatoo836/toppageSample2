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
            //値の入力チェック
            if (key== "" || value=="") {
                Swal.fire({
                    title: "Memo app" //タイトルをここに設定
                    , html : "Key, Memoはいずれも必須です。" //メッセジ内容をここに設定
                    , type : "error" //ダイアログにアイコンを表示したい場合に設定する引数　warning, error, success, info, question
                    , allowOutsideClick : false //枠外クリックは許可しない
                    });
                    return;
                }else{
                    let w_msg = "LocalStorageに\n [" + key + " " + value +"] \n を保存 (save) しますか？";
                    Swal.fire({
                        title: "Memo app" // タイトルをここに設定
                        , html : w_msg //メッセージ内容をここに設定
                        , type : "question" //ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                        , showCancelButton : true //キャンセルボタンの表示
                        }).then(function(result) {
                    //確認ダイアログで「ok」を押されたとき、保存する
                    if (result.value === true){
                        localStorage.setItem(key, value);
                        viewStorage(); //localStorageからデータの取得とテーブルへ表示
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。"
                        Swal.fire({
                            title: "Memo app" //タイトルをここに設定
                            , html : w_msg //メッセージ内容をここに設定
                            , type : "success" //ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                            , allowOutsideClick : false //枠外クリックは許可しない
                    });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                    }
                });
            }
        },false
    );
}
  
    //3.localStorageから１件削除 ==> 選択されている行を削除
    function delLocalStorage() {
        const del = document.getElementById("del");
        del.addEventListener("click",
        function(e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1"); //version-up3 add
            const table1 = document.getElementById("table1"); //version-up3 add
            let w_cnt = 0; //選択されているチャックボックスの数が返却される　  //version-up3 w_sel= "0" ==> w_cnt=0
            w_cnt = selectCheckBox("del"); //テーブルからデータ選択   //version-up3 chg: 戻り値：w_sel ==> w_cnt 引数：なし＝＝＞"del"

            if(w_cnt >= 1){ //version-up3 chg w_sel === "1" ==> w_cnt >=1
            //let w_confirm = window.confirm("localStorageから選択されている" + w_cnt + "件を削除　(delete) しますか？"); //version-up3 change
            let w_msg = "LocalStorageから選択されている" + w_cnt + "件を削除しますか？";
            Swal.fire({
                title: "Memo app" // タイトルをここに設定
                , html : w_msg //メッセージ内容をここに設定
                , type : "question" //ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                , showCancelButton : true //キャンセルボタンの表示
                }).then(function(result){
                //確認ダイアログで[ok」を押された時、削除する
            if (result.value === true){
                for(let i = 0; i < chkbox1.length; i++){
                    if(chkbox1[i].checked){ //version-up3 add
                        localStorage.removeItem(tables.rows[i+1].cells[1].firstChild.data);
                    }  //version-up3 add
                }  //version-up3 add
                viewStorage(); //localStorageからのデータの取得とテーブルへ表示
                let w_msg = "localStorageから" + w_cnt + "件を削除 (delete) しました。"; //version-up3 chg
                Swal.fire({
                    title: "Memo app" // タイトルをここに設定
                    , html : w_msg //メッセージ内容をここに設定
                    , type : "success" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , allowOutsideClick : false //キャンセルボタンの表示
                    });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                    }
                });
            }
        },false
    );
 }

    //4.localStorageからすべて削除
    function allClearStorage() {
        const allClear = document.getElementById("allClear");
        allClear.addEventListener("click",
        function(e) {
            e.preventDefault();
            //let w_confirm = window.confirm("localStorageのデータをすべて削除(all clear)します。\nよろしいですか？");
            let w_msg = "LocalStorageのデ－タを全て削除します。\nよろしいですか？";
            Swal.fire({
            title: "Memo app" // タイトルをここに設定
            , html : w_msg //メッセージ内容をここに設定
            , type : "question" //ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
            , showCancelButton : true //キャンセルボタンの表示
            }).then(function(result){

            if(result.value === true){
                localStorage.clear();
                viewStorage();
                //let w_msg = "LocalStorage のデータを全て削除しました。";
                //window.alert(w_msg);
                let w_msg = "LocalStorageのデータを全て削除しました。";
                Swal.fire({
                    title: "Memo app" // タイトルをここに設定
                , html : w_msg //メッセージ内容をここに設定
                , type : "success" //ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                , allowOutsideClick : false //枠外クリックは許可しない
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
};

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e) {
         e.preventDefault();
        selectCheckBox("select"); //テ－ブルからデータ選択//version-up3 chg 引数:なし===> "select"
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
            let w_textKey = ""; 
            let w_textMemo = ""; 

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

        if(mode === "select"){ //version-up3 add
        if(w_cnt === 1) {                                    
            return w_cnt;                              
         }else{                                               
            //window.alert("1つ選択 (select) してください。");    
            Swal.fire({
                 title: "Memo app" // タイトルをここに設定
                , html : "１つ以上選択してください。" //メッセージ内容をここに設定
                , type : "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick : false //枠外クリックは許可しない         
        });
    }
}
    if(mode === "del"){ //version-up3 add
        if(w_cnt >= 1) {                                    
            return w_cnt;                              
        }else{                                               
            //window.alert("1つ選択 (select) してください。");    
            Swal.fire({
                title: "Memo app" // タイトルをここに設定
                , html : "１つ以上選択してください。" //メッセージ内容をここに設定
                , type : "error" //ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                , allowOutsideClick : false //枠外クリックは許可しない         
            });
        }
    }
} 

 //localStorageからのデータ取得とテーブルへ表示
 function viewStorage() {
     const list = document.getElementById("list");
     //htmlのテーブル初期化
     while(list.rows[0]) list.deleteRow(0);

     //localStorageすべての情報の取得
     for(let i=0; i < localStorage.length; i++) {
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
