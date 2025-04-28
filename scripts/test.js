(function () {
    const Test = {
        nextButtonElement: null,
        prevButtonElement: null,
        skipQuestionElement: null,
        testAnswers: null,
        currentQuestionIndex: 1,
        questionTitleElement: null,
        progressBarElement: null,
        quiz: null,
        userResult: [],
        init() {
            checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get("id");

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.startQuiz();
                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }
        },
        startQuiz() {
<<<<<<< HEAD
=======
            console.log(this.quiz);
>>>>>>> origin/main
            this.questionTitleElement = document.getElementById('test-title');
            document.getElementById('pre-title').innerText = this.quiz.name;
            this.testAnswers = document.getElementById('test-answers');
            this.nextButtonElement = document.getElementById('next');
            this.skipQuestionElement = document.getElementById('skip-question');
            this.nextButtonElement.onclick = this.move.bind(this, 'next');
            this.skipQuestionElement.onclick = this.move.bind(this, 'skip-question');
            this.prevButtonElement = document.getElementById('prev');
            this.prevButtonElement.onclick = this.move.bind(this, 'prev');
            this.prepareProgressBar();
            this.showQuestion();

            const timerElement = document.getElementById('timer');
            let seconds = 59;
            const interval = setInterval(function (){
                seconds--;
                timerElement.innerText = seconds;
                if(seconds === 0) {
                    clearInterval(interval);
                    this.complete();
                }
            }.bind(this), 1000);
        },
        prepareProgressBar() {
            for (let i = 0; i < this.quiz.questions.length; i++) {
                this.progressBarElement = document.getElementById('test-progress-bar');
                const itemElement = document.createElement('div');
                itemElement.className = 'test-progress-bar-item' + (i === 0 ? ' active' : '');
<<<<<<< HEAD
                let afterWidth = 760 / (this.quiz.questions.length - 1);
                itemElement.style.setProperty('--after-width', afterWidth + 'px');
=======
>>>>>>> origin/main
                const circleElement = document.createElement('div');
                circleElement.className = 'test-progress-bar-circle';
                const textElement = document.createElement('div');
                textElement.className = 'test-progress-bar-text';
                textElement.innerText = 'Вопрос' + (i + 1);
                itemElement.appendChild(circleElement);
                itemElement.appendChild(textElement);
                this.progressBarElement.appendChild(itemElement);

            }
        },
        showQuestion() {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ': </span>' + activeQuestion.question;
            this.testAnswers.innerHTML = '';
            const that = this;
            const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
            activeQuestion.answers.forEach((answer) => {

                const optionElement = document.createElement('div');
                optionElement.className = 'test-answer';

                const inputId = 'answer-' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer';
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('value', answer.id);

                if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                    inputElement.setAttribute('checked', 'checked');
                }

                inputElement.onchange = function () {
                    that.chooseAnswer();
                }

                const labelElement = document.createElement('label');
                labelElement.setAttribute('for', inputId);
                labelElement.innerText = answer.answer;

                optionElement.appendChild(inputElement);
                optionElement.appendChild(labelElement);

                this.testAnswers.appendChild(optionElement);
            });
            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled');
            } else {
                this.nextButtonElement.setAttribute('disabled', 'disabled');
            }

            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            } else {
                this.nextButtonElement.innerText = 'Далее';
            }
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            } else {
                this.prevButtonElement.setAttribute('disabled', 'disabled');
            }
        },
        chooseAnswer() {
            this.nextButtonElement.removeAttribute('disabled')
        },
        move(action) {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            const chosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
                return element.checked;
            });

            let chosenAnswerId = null;
            if (chosenAnswer && chosenAnswer.value) {
                chosenAnswerId = Number(chosenAnswer.value);

            }

            const existingResult = this.userResult.find(item => {
                return item.questionId === activeQuestion.id;
            });
            if (existingResult) {
                existingResult.chosenAnswerId = chosenAnswerId;
            } else {
                this.userResult.push({
                    questionId: activeQuestion.id,
                    chosenAnswerId: chosenAnswerId,
                });
            }

            if (action === 'next' || action === 'skip-question') {
                if (this.currentQuestionIndex !== this.quiz.questions.length) {
                    this.currentQuestionIndex++;
                } else if (this.currentQuestionIndex === this.quiz.questions.length){
                    this.complete();
                    // location.href = 'result.html';
                }
            } else {
                this.currentQuestionIndex--;
            }

            Array.from(this.progressBarElement.children).forEach((item, index) => {
                const currentItemIndex = index + 1;
                item.classList.remove('active');
                item.classList.remove('complete');

                if (currentItemIndex === this.currentQuestionIndex) {
                    item.classList.add('active');
                } else if (currentItemIndex < this.currentQuestionIndex) {
                    item.classList.add('complete');
                }

            })
            this.showQuestion();
        },
        complete(){
            const url = new URL(location.href);
            const name = url.searchParams.get('name');
            const surname = url.searchParams.get('surname');
            const email = url.searchParams.get('email');
            const testId = url.searchParams.get("id");

            const xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://testologia.ru/pass-quiz?id=' + testId, false);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.send(JSON.stringify({
                name: name,
<<<<<<< HEAD
                lastName: surname,
=======
                surname: surname,
>>>>>>> origin/main
                email: email,
                id: testId,
                results: this.userResult,
            }));
            if (xhr.status === 200 && xhr.responseText) {
                let result = null;
<<<<<<< HEAD
                let paramString = '';
=======
>>>>>>> origin/main
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                if(result){
<<<<<<< HEAD
                    let paramString = '?score=' + result.score + '&total=' + result.total;
                    location.href = 'result.html' + paramString;
=======
                    console.log(result);
>>>>>>> origin/main
                }
            } else {
                location.href = 'index.html';
            }
        },
    }
    Test.init();
})();