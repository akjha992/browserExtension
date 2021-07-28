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
  exitButton: '#root > main > footer > div > div > div.sc-eKZiaR.kLEhPS > button'
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
    document.querySelector(selectors.exitButton).className = "sc-jTzLTM gKItAZ sc-jqCOkK gRVFSE sc-bbmXgH fGVldU";
    document.querySelector(selectors.exitButton).innerText = "SuperSkip";
    document.querySelector(selectors.exitButton).onclick = fastSkip;
}

const checkQuestionExist = setInterval(function() {
   if (document.querySelector(selectors.questionComponent)) {
      addButtons();
      const key = hasKeyword();
      if(key){
          alert("found keyword " +key);
          clearInterval(checkQuestionExist);
      }else{
          fastSkip();
      }
   }
}, 3000)

//fastSkip();

//alert(alert("Ready"));
//checkQuestionExist();
//alert(alert("Ready"));
