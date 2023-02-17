

(() => {


    'use strict'
    const button = document.querySelector("#start-game");
    const questions = [
        "¿Tu carta es de CORAZONES o de PICAS?",
        "¿Es roja?",
        "¿Es de valor alto?",
        "¿Es par?",
        "¿Es alguna de éstas? 2 de Corazones, 10 de Corazones, 1 de Picas, 9 de Picas, 1 de Rombos, 9 de Rombos, 2 de Trebol, 10 de Trebol",
        "¿Es alguna de éstas? 9 de Corazones, 10 de Corazones, 1 de Picas, 2 de Picas, 1 de Rombos, 2 de Rombos, 9 de Trebol, 10 de Trebol",
        "¿Es alguna de éstas? 1 de Corazones, 10 de Corazones, 1 de Picas, 10 de Picas, 2 de Rombos, 9 de Rombos, 2 de Trebol, 9 de Trebol",
    ];
    let answers = [];
    const body = document.querySelector('body');
    
    
    const createQuestions = (text) => {
        const question = document.createElement('h2');
        question.innerHTML = text;
        question.id = "question";
        question.className = "text-center ";
        body.appendChild(question);
        const divButton = document.createElement('div');
        divButton.className = "d-flex justify-content-evenly w-25 mx-auto";
        for (let i = 0; i < 2; i++) {
            let button = document.createElement('button');
            if (i == 0) {
                button.innerHTML = "Si";
                button.id = "si";
                button.className = "btn btn-success";
                button.onclick = function () { buttonFuction(0); };
    
            }
            else {
    
                button.innerHTML = "No";
                button.id = "no";
                button.className = "btn btn-danger";
                button.onclick = function () { buttonFuction(1); };
            }
            divButton.appendChild(button);
        }
        body.appendChild(divButton);
    };
    
    const buttonFuction = (answer) => {
        console.log(answer);
    
        answers.push(answer);
    
        if (answers.length === questions.length) {
    
            validateAnswers(answers);
        }
        else {
            document.querySelector("#question").innerHTML = questions[answers.length];
        }
    
    
    };
    
    const validateAnswers = (answer) => {
    
        document.querySelector("#question").remove();
        document.querySelector("#si").remove();
        document.querySelector("#no").remove();
        get_my_letter(answer);
    
    
    
    };
    
    const get_my_letter = (answer) => {
    const checklist = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 1],
            [0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 1],
            [0, 1, 1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 1, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 0],
            [1, 0, 1, 1, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 0],
            [1, 1, 1, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1]
        ];
        const dic_name = {
            '0': '10H', '1': '9H', '2': '2H', '3': 'AH', '4': '10S', '5': '9S', '6': '2S', '7': 'AS',
            '8': '10D', '9': '9D', '10': '2D', '11': 'AD', '12': '10C', '13': '9C', '14': '2C', '15': 'AC'
        };
    
        let different_array = [];
        for (let item of checklist) {
            let index_array = [];
            for (let idx in item) {
                if (item[idx] !== answer[idx]) {
                    index_array.push(parseInt(idx) + 1);
    
                }
            }
            different_array.push(index_array);
    
    
        }
    
        let len_array = [];
        console.log(different_array);
    
        for (let x of different_array) {
            len_array.push(x.length);
    
        }
        const min_num = Math.min.apply(Math, len_array);
        const ind_num = len_array.indexOf(min_num);
        console.log(len_array);
        console.log(min_num);
        console.log(ind_num);
        const card = dic_name[ind_num.toString()];
        console.log('Tu carta es :', card);
        let lie = "";
        if (min_num > 0) {
            lie = different_array[ind_num][0];
            console.log('mentiste en la pregunta: ', lie);
        }
        const image_html = document.createElement('img');
        image_html.src = "assets/cartas/" + card + ".png";
        image_html.className = "img-fluid";
        image_html.style.width = "150px";
        image_html.style.height = "200px";;
        const titleHtml = document.createElement('h2');
        const lieHtml = document.createElement('h2');
        titleHtml.innerHTML = "Tu carta es la siguiente:";
        //titleHtml.className = "text-warning";
        const divCard = document.createElement('div');
        divCard.className = "d-flex flex-column align-items-center text-center";
        if (lie !== "") {
            lieHtml.innerHTML = "Me mentiste en la pregunta " + lie + " Mentiros@!!";
            lieHtml.className = "text-danger";
            
            
        }
        else {
            lieHtml.innerHTML = "Que honest@! no mentiste en ninguna pregunta";
            lieHtml.className = "text-warning";
        }
        divCard.appendChild(lieHtml);
        divCard.appendChild(titleHtml);
        divCard.appendChild(image_html);
        body.appendChild(divCard);
    
    };
    
    button.addEventListener("click", () => {
        console.log("hello world");
    
        for (let i = 0; i < 2; i++) {
            let rules = document.createElement('h3');
            if (i == 0) {
                rules.innerHTML = "Contesta las siguientes preguntas";
                rules.className = "text-center ";
    
            }
            else {
    
                rules.innerHTML = "Nota: Puedes mentirme en solo UNA pregunta si quieres";
                rules.className = "text-center ";
            }
            body.appendChild(rules);
        }
        const button = document.querySelector("#start-game");
        button.parentElement.removeChild(button);
        createQuestions(questions[answers.length]);
    
    });
    
})()