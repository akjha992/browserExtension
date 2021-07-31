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
  I_Dont_Have_Subject_Knowledge_Reason: '#root > main > footer > div > div > div.sc-hMqMXs.enPIsE.sc-kIPQKe.cBjqrw > div > div > div.sc-RefOD.QZIDq > div > label:nth-child(5)',
  skipSubmitButton: '#root > main > footer > div > div > div.sc-hMqMXs.enPIsE.sc-kIPQKe.cBjqrw > div > div > div.sc-iQKALj.hQXEod > button',
  questionComponent: '#question-comp',
  exitButton: '#root > main > footer > div > div > div.sc-eKZiaR.kLEhPS',
  buttonContainer: '#root > header > div'
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
	if(document.querySelector(selectors.answerButton).innerText=="Submit"){
		return true;
	}else{
		return false;
	}
};
const fastSkip = ()=>{
	const res = areWeAnswering();
	printVersion(res);
  if(document.querySelector(selectors.answerButton).innerText!=="Submit"){
	document.querySelector(selectors.skipButton).click();
        document.querySelector(selectors.I_Dont_Have_Subject_Knowledge_Reason).click();
        document.querySelector(selectors.skipSubmitButton).click();	  
  }
};
const alarm = ()=>{
	var audio = new Audio('https://www.fesliyanstudios.com/soundeffects-download.php?id=5465');
	audio.play();
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
const createNewButton = (buttonId, name, action)=>{
    const btnSelector = "#"+buttonId;
    const btn = document.querySelector(btnSelector);
    if(!btn&&!areWeAnswering()){
        const newButton = `<button style="height:50px;width: 100%;text-align:center;position: ABSOLUTE;bottom:-560px;right:0" id=${buttonId} type="button">${name}</button>`
        document.querySelector(selectors.buttonContainer).innerHTML+=newButton;
        document.querySelector(btnSelector).addEventListener("click", action);
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
			vibrate();
			alarm();
			alert("found keyword :- " + key);
		}else{	
			skipThenStart();
		}
	    }
	    waitForQuestion(action);
    }else{
	    /*
	    	just add a button to do a fast skip
	    */
	    createNewButton("fastSkipButton", "Fast Skip", fastSkip);
    }
}

//Program start, wait for thr first question to load then star the program
const version = "1.06";
waitForQuestion(()=>{
	printVersion(version);
	getArguments();
	start();
});
