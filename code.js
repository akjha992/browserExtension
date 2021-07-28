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
  questionComponent: '#question-comp'
};

const fastSkip = ()=>{
  document.querySelector(selectors.skipButton).click();
  document.querySelector(selectors.I_Dont_Have_Subject_Knowledge_Reason).click();
  document.querySelector(selectors.skipSubmitButton).click();
};


const checkQuestionExist = setInterval(function() {
   if (document.querySelector(selectors.questionComponent).length) {
      alert(alert("Ready"));
      clearInterval(checkExist);
   }
}, 1000)

//fastSkip();

//alert(alert("Ready"));
