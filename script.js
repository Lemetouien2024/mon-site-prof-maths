let questionsData = [];

fetch('qcm.json')
    .then(response => response.json())
    .then(data => {
        questionsData = data;
        afficherQuestions();
    });

function afficherQuestions() {
    const container = document.getElementById("questions");
    container.innerHTML = "";
    questionsData.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question");
        div.innerHTML = `<p>${index + 1}. ${q.texte}</p>` +
            q.reponses.map((rep, i) =>
                `<label><input type="radio" name="q${index}" value="${i}"> ${rep}</label><br>`
            ).join("");
        container.appendChild(div);
    });
    MathJax.typeset(); // affichage LaTeX
}

function corriger() {
    let score = 0;
    questionsData.forEach((q, index) => {
        const reponse = document.querySelector(`input[name="q${index}"]:checked`);
        if (reponse && parseInt(reponse.value) === q.correcte) score++;
    });
    document.getElementById("resultat").innerText = `Votre score : ${score} / ${questionsData.length}`;
}

