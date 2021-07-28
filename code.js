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
  skipButton: '#root > main > footer > div > div > div:nth-child(2) > button',
  answerButton: '',
  I_Dont_Have_Subject_Knowledge_Reason: '#root > main > footer > div > div > div.sc-hMqMXs.enPIsE.sc-kIPQKe.cBjqrw > div > div > div.sc-RefOD.QZIDq > div > label:nth-child(5)',
  skipSubmitButton: '#root > main > footer > div > div > div.sc-hMqMXs.enPIsE.sc-kIPQKe.cBjqrw > div > div > div.sc-iQKALj.hQXEod > button',
  questionComponent: '#question-comp',
  exitButton: '#root > main > footer > div > div > div.sc-eKZiaR.kLEhPS',
  buttonContainer: '#root > header > div'
};

const fastSkip = ()=>{
  document.querySelector(selectors.skipButton).click();
  document.querySelector(selectors.I_Dont_Have_Subject_Knowledge_Reason).click();
  document.querySelector(selectors.skipSubmitButton).click();
};

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

const addButtons = ()=>{
    const exitButton =  document.querySelector(selectors.exitButton);
    if(exitButton){
       exitButton.remove();    
    }
    const superSkipButton = document.querySelector("#superSkipButton");
    if(!superSkipButton){
        const newButton = '<button style="height:50px;width:200px;text-align:center;position:relative;bottom:-670px;right:-20px;" id="superSkipButton" type="button">Fast Skip</button>'
        document.querySelector(selectors.buttonContainer).innerHTML+=newButton;
        document.querySelector("#superSkipButton").addEventListener("click", skipAndStart);
    }
}


let checkQuestionExist;
const repeatCheckQuestionLoaded = ()=>{
   if (document.querySelector(selectors.questionComponent)) {
      clearInterval(checkQuestionExist);
      const key = hasKeyword();
      if(key){
          addButtons();
          alert("found keyword - " + key);
      }else{
          skipAndStart();
      }
   }
};
const skipAndStart = ()=>{
    fastSkip();
    start();
}
const start = ()=>{
    checkQuestionExist = setInterval(repeatCheckQuestionLoaded, 2000);
}

start();
