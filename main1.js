let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
//Set options
let currentIndex = 0;


function getQuestion() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let questionObject = JSON.parse(this.responseText)
            let questionCount = questionObject.length;
            console.log(questionCount);

            //create bullets + set questions count 
            createBullets(questionCount);
            //add question data
            addQuestionData(questionObject[currentIndex], questionCount);
        }
    };

    myRequest.open("GET", "html_question.json", true);
    myRequest.send();
}
getQuestion();

function createBullets(num) {
    countSpan.innerHTML = num;
    //create span 
    for (let i = 0; i < num; i++) {
        //create span 
        let theBullet = document.createElement("span");
        //check if its first span
        if (i === 0) {
            theBullet.className = "on";
        }
        //append bullets to main bullets container
        bulletsSpanContainer.appendChild(theBullet);
    }
}



function addQuestionData(obj, count) {
    //create h2 question title 
    let questionTitle = document.createElement("h2");
    //create  question text
    let questionText = document.createTextNode(obj['title']);
    //append text to h2
    questionTitle.appendChild(questionText);
    //append the h2 to the quiz area
    quizArea.appendChild(questionTitle);

    //create the answers
    for (let i = 1; i <= 4; i++) {
        //create main answer div
        let mainDiv = document.createElement("div");
        mainDiv.className = 'answer';
        //create radio input
        let radioInput = document.createElement("input");

        //Add Type +name +Id +Data-attribute
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = 'answer_${i}';
        radioInput.dataset.answer = obj['answer_${i}'];
    }
}