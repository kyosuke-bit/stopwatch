(function(){
    'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入

    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');

    //クリック時の時間を保持するための変数定義
    var startTime;

    //経過時刻を更新するための変数。 初めはだから0で初期化
    var elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    var timerId;

    //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    var timeToadd = 0;


    //ミリ秒の表示ではなく、分とか秒に直すための関数, 他のところからも呼び出すので別関数として作る
    function updateTimetText(){
        
        var hour = Math.floor(elapsedTime / 3600000);

        var minute = Math.floor(elapsedTime / 60000);

        var second = Math.floor(elapsedTime % 60000 / 1000);

        var millisecond = elapsedTime % 1000;

        //文字列の末尾1桁を表示したいのでsliceで負の値(-1)引数で渡してやる。
        millisecond = ('0' + millisecond).slice(-1);

        //HTMLのid　timer部分に表示させる　
        timer.textContent = hour + ':' + minute + ':' + second + ':' + millisecond;
    }


    //再帰的に使える用の関数
    function countUp(){

        //timerId変数はsetTimeoutの返り値になるので代入する
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すDate.now()からstartを押した時の時刻(startTime)を引く
            elapsedTime = Date.now() - startTime + timeToadd;
            updateTimetText()

            //countUp関数自身を呼ぶことで10ミリ秒毎に以下の計算を始める
            countUp();

        //1秒以下の時間を表示するために10ミリ秒後に始めるよう宣言
        },10);
    }

    //startボタンにクリック時のイベントを追加(タイマースタートイベント)
    start.addEventListener('click',function(){

        //現在時刻を示すDate.nowを代入
        startTime = Date.now();

        //再帰的に使えるように関数を作る
        countUp();
    });

    //stopボタンにクリック時のイベントを追加(タイマーストップイベント)
    stop.addEventListener('click',function(){

        //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
       clearTimeout(timerId);


        //タイマーに表示される時間elapsedTimeが現在時刻からスタートボタンを押した時刻を引いたものなので、
        //タイマーを再開させたら0になってしまう。elapsedTime = Date.now - startTime
        //それを回避するためには過去のスタート時間からストップ時間までの経過時間を足してあげなければならない。elapsedTime = Date.now - startTime + timeToadd (timeToadd = ストップを押した時刻(Date.now)から直近のスタート時刻(startTime)を引く)
       timeToadd += Date.now() - startTime;
    });

    //resetボタンにクリック時のイベントを追加(タイマーリセットイベント)
    reset.addEventListener('click',function(){

        //経過時刻を更新するための変数elapsedTimeを0にしてあげつつ、updateTimetTextで0になったタイムを表示。
        elapsedTime = 0;

        //リセット時に0に初期化したいのでリセットを押した際に0を代入してあげる
        timeToadd = 0;

        //updateTimetTextで0になったタイムを表示
        updateTimetText();

    });
})();

//スタートを押した場合の挙動
function clickBtn1(){
	document.getElementById("start").setAttribute("disabled", true);
	document.getElementById("stop").removeAttribute("disabled");
	document.getElementById("reset").removeAttribute("disabled");
}

//ストップを押した場合の挙動
function clickBtn2(){
		document.getElementById("start").removeAttribute("disabled");
		document.getElementById("stop").setAttribute("disabled", true);
}

//リセットを押した場合の挙動
function clickBtn3(){
		document.getElementById("start").removeAttribute("disabled");
		document.getElementById("stop").setAttribute("disabled", true);
		document.getElementById("reset").setAttribute("disabled", true);
}