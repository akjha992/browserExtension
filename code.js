const SUPER_SKIP_MAP = [
    "c++",
    " c ",
    "cpp",
    "javascript",
    "python",
    "java",
    "c program",
    ".py",
    "scanner",
    "cout",
    "scanf",
    "iostream",
    "#include",
    "bst",
    "class"
];

const selectors = {
  versionBox: '#root > header > div > a',
  skipButton: '#root > main > footer > div > div > div:nth-child(2) > button',
  answerButton: '#root > main > footer > div > div > div:nth-child(1) > button',
  I_Dont_Have_Subject_Knowledge_Reason: '#skip-modal > div > div.sc-1ia47o9-3.gLqDAV > div > div:nth-child(5) > label',
  skipSubmitButton: '#skip-modal > div > div.sc-1ia47o9-8.ivVfpa > div > button',
  questionComponent: '#question-comp',
  exitButton: '#root > main > footer > div > div > div:nth-child(3) > button',
  buttonContainer: '#root > header > div',
  timerDiv: '#root > main > div > div.lmxvvx-1.dLqNmn > div > div.sc-iomxrj.jFMalr > div > div > div.sc-exkUMo.dZBdXC > div',
  timerMinuteSpan: '#root > main > div > div.lmxvvx-1.dLqNmn > div > div.sc-iomxrj.jFMalr > div > div > div.sc-exkUMo.dZBdXC > div > span:nth-child(3)'
};

const config = {
	TimerCheckInterval: 1, //seconds
	TimerAlertThreshold: 9, // Make timer red if it goes below or equal to this value in minutes
	AutoAnswerQuestionTime: 1, // Click on Answer button if timer goes below or equal to this value in minutes
};

const printVersion = (version)=>{
	document.querySelector(selectors.versionBox).innerText = version;
}

const vibrate = ()=>{
	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
	if (navigator.vibrate) {
		// vibration API supported
		navigator.vibrate(200);
	}
}
const areWeAnswering = ()=>{
	const key = "Submit";
	if(document.querySelector(selectors.answerButton).innerText.toLowerCase().indexOf(key.toLowerCase())!==-1){
	    return key;
	}
	return null;
};
const fastSkip = ()=>{
  if(!areWeAnswering()){
	document.querySelector(selectors.skipButton).click();
        document.querySelector(selectors.I_Dont_Have_Subject_Knowledge_Reason).click();
        document.querySelector(selectors.skipSubmitButton).click();	  
  }
};
const activateSound = ()=>{
	//works only if called by user
	if(!window.canPlaySound){
		playNotificationSound();
	}
}
const playNotificationSound = (action)=>{
	if(window.canPlaySound){
		canPlaySound.currentTime = 0;
		canPlaySound.play().then(()=>{
			if(action){
				action();
			}
		});
	}else{
		const audio = new Audio('https://www.fesliyanstudios.com/soundeffects-download.php?id=5465');
		audio.play().then(function() {
			console.log("Was able to play sound!");
			window.canPlaySound=audio;
			playNotificationSound(action);
		 }).catch(function(){
			console.log("Can't play sound!");
		});	
	}
}
const hasKeyword = () =>{
    const questionText = document.querySelector(selectors.questionComponent).innerText;
    for (i = 0; i < SUPER_SKIP_MAP.length; i++) {
            const keyword =  SUPER_SKIP_MAP[i];
            if(questionText.toLowerCase().indexOf(keyword.toLowerCase())!==-1){
                return keyword;
            }
    }
    return null;
};

const removeExitButton = ()=>{
const exitButton =  document.querySelector(selectors.exitButton);
    if(exitButton){
       exitButton.remove();    
    }
}
const createNewButton = (buttonId, name, action, verticalIndex, removeOnClick)=>{
    let bottomDistance = -560;
    if(verticalIndex){
	    bottomDistance+=verticalIndex*50;
    }
    const btnSelector = "#"+buttonId;
    const btn = document.querySelector(btnSelector);
    if(!btn&&!areWeAnswering()){
        const newButton = `<button style="height:50px;width: 100%;text-align:center;position: ABSOLUTE;bottom:${bottomDistance}px;right:0" id=${buttonId} type="button">${name}</button>`
        document.querySelector(selectors.buttonContainer).innerHTML+=newButton;
        document.querySelector(btnSelector).addEventListener("click", ()=>{
		if(removeOnClick){
			document.querySelector(btnSelector).remove();
		}
		action();
	});
    }
}

// Keeps checking if the question element has loaded or not, in case it loads then it executes the onload method
const waitForQuestion = (onLoad)=>{
	setTimeout(()=>{
		if (document.querySelector(selectors.questionComponent)) {
			onLoad();
		}else{
			waitForQuestion(onLoad);
		}
	}, 1000);
};
let args;
const getArguments = ()=>{
	args = {
		autoskip: false
	};
	args.autoskip = confirm("AutoSkip?");
}
const skipThenStart = ()=>{
    if(!areWeAnswering()){
	setTimeout(start, 1000);
    	fastSkip();    
    }
}
const start = ()=>{
    if(args.autoskip){
	    /*
	    	Wait for the question to load
		Scan for required keywords
		If we find the keyword then alert the user
		add a button to trigger the start method
		if not then skip the question and trigger start method again
	    */
	    const action = ()=>{
		const key = hasKeyword();
		if(key){
			createNewButton("autoSkipButton", "Auto Skip", skipThenStart);
			//vibrate();
			playNotificationSound(()=>{
				alert("found keyword :- " + key);
			});
		}else{	
			skipThenStart();
		}
	    }
	    waitForQuestion(action);
  }else{
	    /*
	    	just add a button to do a fast skip
	    */
	    waitForQuestion(()=>{
		    createNewButton("fastSkipButton", "Fast Skip", fastSkip);
	    });
    }
}

// Check to not miss a question we might be solving
const DontMissThisQuestion = ()=>{
	const checkTimer = setInterval(()=>{
		if(!areWeAnswering()){
			const timerMinuteValue = parseInt(document.querySelector(selectors.timerMinuteSpan).innerText);
			if(timerMinuteValue<=config.AutoAnswerQuestionTime){
				document.querySelector(selectors.answerButton).click();
			}else if(timerMinuteValue<=config.TimerAlertThreshold){
				document.querySelector(selectors.timerDiv).style.color='red';
			}
		}
		
	}, config.TimerCheckInterval*1000);
};
DontMissThisQuestion();
//Program start, wait for thr first question to load then start the program
const version = "1.12";
waitForQuestion(()=>{
	printVersion(version);
	getArguments();
	createNewButton("activateSoundButton", "Sound On", ()=>{
		activateSound();
		start();
	},1, true);
});
