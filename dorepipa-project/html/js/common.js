var session = new QiSession();
var pushed = false;
var timer;

//ボタン操作用関数

function clickSelect(msg){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/detect/selectBtn", msg);
    });
}

function clickEnd(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/detect/end", "");
    });
}

function buttonPush(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/button", "");
    });
}

function backToMenu(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/toMenu", "");
    });
}

function backToSelect(msg){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/selectAgain", msg);
    });
}



//メニュー画面関連
function selectMode(msg){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/mode", msg);
    });
}


function showMenu(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/showMenu').done(function(subscriber) {
			subscriber.signal.connect(function(){
				$('.scenes').hide();
				$("#menu").show();
				
			});
		});
	});
}

function reload(){
	$("#group").show();
	$("#solo").show();
	pushed = false;
}

function setTimer() {
    timer = setTimeout('reload()', 10000);
}


//画面切り替え用関数

function showLogo(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/logoView').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				$('.scenes').hide();
				pushed = false;
			});
		});
	});
}

function changeView(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/changeView').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				
				$('.scenes').hide();
				
				if (value == "detect"){
					$("#detect").show();
					$("#skip").attr('src', 'images/skip_button.png');
					$("#end").attr('src', 'images/end_button.png');
					timer_id = null;
				} else if (value == "select") {
					$("#select").show();
				} else if (value == "lesson") {
					$("#lesson").show();
				} else if (value == "feedback") {
					$("#feedback").show();
				} else {
					$("#logoView").show();
				}
				
				pushed = false;
				
			});
		});
	});
}

//フェーズ毎の画面切り替え

function changeViewInPhase(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/phase/changeView').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				
				$('.scenes').hide();
				
				if (value == "detect"){
					$("#detect").show();
					showCalling();
					clearTimer(timer);
				} else if (value == "select"){
					$("#select").show();
					selectButtons();
				} else if (value == "lesson") {
					$("#lesson").show();
					$("#illustWrapper").hide();
					showPlayBtn();
				} else if (value == "feedback"){
					$("#feedback").show();
					showFeedButtons();
				} else if (value == "s_detect"){
					$("#s_detect").show();
					clearTimer(timer);
				} else if (value == "s_feedback"){
					$("#s_feedback").show();
				} else if (value == "loading") {
					$("#loading").show();
				} else {
					$("#logoWrapper").show();
				}
				
				pushed = false;
				
			});
		});
	});
}


//奏者認識操作での画面切り替え

function showCalling(){
	$("#calling").show();
	$("#skip").attr("src", "images/skip_button.png");
	$("#next").attr("src", "images/next_button.png");
	$("#again").attr("src", "images/again_button.png");
	pushed = false;
}

function showCheck(){
	$("#calling").hide();
	pushed = false;
}

function showNoData(){
	$("#detect").hide();
	pushed = false;
}



function changeCheck(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/voiceDetection/getName').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				if(value == "none"){
					showNoData();
				} else {
					showCheck();
				}
			});
		});
	});
}

//曲選択画面

function selectButtons(){
	$("#s_buttonWrapper").show();
}

function startLesson(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/startLesson", "");
    });
}

//演奏画面
function showPlayBtn(){
	$("#lessonBtn").show();
}

function songPlay(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/play", "");
    });
	$("#lessonBtn").delay(500).hide();
	$('#illustWrapper').show();
}


//ボタンリセット
function buttonReset(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/buttonReset').done(function(subscriber) {
			subscriber.signal.connect(function(){
				$("#group").attr("src", "images/group_button.png");
				$("#solo").attr("src", "images/solo_button.png");
				$("#end").attr("src", "images/end_button.png");
				$("#kaeru").attr("src", "images/kaerunouta.png");
				$("#start").attr("src", "images/start.png");
				$("#back").attr("src", 'images/back_btn.png');
				$('#lesson_again').attr("src", 'images/back.png');
				$("#to_menu").attr("src", 'images/to_menu.png');
				$("#s_end").attr("src", "images/next_button.png");
				$("#s_again").attr("src", "images/again_button.png");
				$("#listen").attr("src", "images/listen.png");
				$("#no_listen").attr("src", "images/no_listen.png");
				pushed = false;
			})
		});
	});
}

//奏者認識画面（個人）
function showNoDataSolo(){
	$("#s_detect").hide();
}

function changeCheckSolo(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/voiceDetection/getNameSolo').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				if(value == ""){
					showNoDataSolo();
				} else {
					$("#s_detect").show();
				}
			})
		});
	});
}

//評価画面（個人）

function listen(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/accessment", "");
    });
    pushed = false;
}

function noListen(){
	session.service("ALMemory").done(function (ALMemory) {
    	ALMemory.raiseEvent("MyApp/DorePipa/noAccessment", "");
    });
    pushed = false;
}

function showScore(){
	session.service('ALMemory').done(function (ALMemory) {
		ALMemory.subscriber('MyApp/DorePipa/showScore').done(function(subscriber) {
			subscriber.signal.connect(function(value){
				$("#score").text(value);
				$("#s_score").show();
			});
		});
	});
}

$(function() {	
	
	//共通
	changeViewInPhase();
	changeView();
	showLogo();
	buttonReset();
	
	//menu
	showMenu();
	
	$("#group").on('touchstart', function(){
		
		if(!pushed){
			$(this).attr("src", "images/group_button_on.png");
			pushed = true;
			buttonPush();
			selectMode("0");
			setTimer();
		}
	});

	$("#solo").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/solo_button_on.png");
			pushed = true;
			buttonPush();
			selectMode("1");
			setTimer();
		}
	});
	
	
	//detect
	changeCheck();
	
	$("#skip").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/skip_button_on.png");
			pushed = true;
			buttonPush();
			clickSelect($(this).attr("data"));
		}
	});
	
	$("#next").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/next_button_on.png");
			pushed = true;
			buttonPush();
			clickSelect($(this).attr("data"));
		}
	});
	
	$("#again").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/again_button_on.png");
			pushed = true;
			buttonPush();
			clickSelect($(this).attr("data"));
		}
	});
	
	$("#end").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/end_button_on.png");
			pushed = true;
			buttonPush();
			clickEnd();
		}
	});
	
	//select
	$('#kaeru').on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/kaerunouta_on.png");
			pushed = true;
			buttonPush();
			startLesson();
		}
	});
	
	
	//play
	$('#start').on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/start_on.png");
			pushed = true;
			buttonPush();
			setTimeout(function(){
				songPlay();
			}, 500);
		}
	});
	
	$('#back').on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/back_btn_on.png");
			pushed = true;
			buttonPush();
			backToSelect("1");
		}
	});
	
	//feedback
	$('#lesson_again').on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/back_on.png");
			pushed = true;
			buttonPush();
			setTimeout(function(){
				backToSelect("1");
			}, 500);
		}
	});
	
	$('#to_menu').on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/to_menu_on.png");
			pushed = true;
			buttonPush();
			setTimeout(function(){
				backToMenu();
			}, 500);
		}
	});
	
	
	//solo detect
	changeCheckSolo();
	
	$("#s_again").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/again_button_on.png");
			pushed = true;
			buttonPush();
			clickSelect("");
		}
	});
	
	$("#s_end").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/next_button_on.png");
			pushed = true;
			buttonPush();
			clickEnd();
		}
	});
	
	//solo feedback
	showScore();
	
	$("#listen").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/listen_on.png");
			pushed = true;
			buttonPush();
			setTimeout(function(){
				listen();
			}, 500);
		}
	});
	
	$("#no_listen").on('touchstart', function(){
		if(!pushed){
			$(this).attr("src", "images/no_listen_on.png");
			pushed = true;
			buttonPush();
			setTimeout(function(){
				noListen();
			}, 500);
		}
	});

});

