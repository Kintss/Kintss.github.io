const quiz = [
    { 
      level: "Rodada 1",
      questions: [
        { question: "Qual era o clima exato no dia em que nos conhecemos?", options: ["23°C e ensolarado", "21°C com 50% de umidade", "22°C e parcialmente nublado", "26°C e céu limpo"], correct: -1 },
        { question: "Quantas vezes piscamos juntos no nosso primeiro dia como casal?", options: ["1.452", "42", "1.530", "628"], correct: -1 },
        { question: "Quantas mensagens trocamos no primeiro dia em que começamos a conversar?", options: ["87", "112", "168", "150"], correct: -1 }
      ]
    },
    { 
      level: "Rodada 2",
      questions: [
        { question: "Qual era o horário exato do nosso primeiro encontro?", options: ["19:32", "18:00", "19:45", "19:50"], correct: -1 },
        { question: "O que você pediu para beber no nosso primeiro jantar?", options: ["Suco de fruta", "Água com gás", "Refrigerante", "Vinho"], correct: -1 },
        { question: "Qual foi a primeira comida que preparamos juntos?", options: ["Macarrão carbonara", "Omelete", "Cookies", "Bolo"], correct: -1 }
      ]
    },
    { 
      level: "Rodada 3",
      questions: [
        { question: "Quem é a pessoa mais importante da minha vida?", options: ["Gabriella Torres", "-", "-", "-"], correct: 0 },
        { question: "Qual é o meu nome?", options: ["Ygor Quintes dos Santos", "Igor Rintes dos Santos", "Igor Quintes dos Santos", "Quintes dos Santos Igor"], correct: 2 },
        { question: "Qual é a cor dos meus olhos?", options: ["Vermelho", "Roxo", "Arco-íris", "Castanho"], correct: 3 }
      ]
    }
  ];

  let currentRound = 0;
  let currentQuestion = 0;
  let correctAnswers = 0;

  const rulesElement = document.getElementById("rules");
  const gameElement = document.getElementById("game");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-button");
  const announcementElement = document.getElementById("announcement");
  const scoreElement = document.getElementById("score");
  const correctAudio = document.getElementById("correct-audio");
  const wrongAudio = document.getElementById("wrong-audio");

  document.getElementById("start-button").onclick = startQuiz;

  function startQuiz() {
    rulesElement.classList.add("hidden");
    gameElement.classList.remove("hidden");
    startRound();
  }

  function startRound() {
    correctAnswers = 0;
    updateScore();
    showAnnouncement(quiz[currentRound].level);
  }

  function showAnnouncement(message) {
    questionElement.innerHTML = "";
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");

    announcementElement.textContent = message;
    announcementElement.classList.remove("hidden");
    setTimeout(() => {
      announcementElement.classList.add("hidden");
      loadQuestion();
    }, 2000);
  }

  function loadQuestion() {
    const round = quiz[currentRound];
    const questionData = round.questions[currentQuestion];

    questionElement.textContent = questionData.question;
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");

    questionData.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => handleAnswer(index, button);
      optionsElement.appendChild(button);
    });
  }

  function handleAnswer(selected, button) {
    const round = quiz[currentRound];
    const questionData = round.questions[currentQuestion];

    if (selected === questionData.correct) {
      correctAudio.play();
      button.classList.add("correct");
      correctAnswers++;
      updateScore();
      startLightHeartRain(); // Leve chuva de corações
    } else {
      wrongAudio.play();
      button.classList.add("wrong");
      if ("vibrate" in navigator) navigator.vibrate(200);
    }

    Array.from(optionsElement.children).forEach(btn => btn.disabled = true);
    nextButton.classList.remove("hidden");
  }

  function updateScore() {
    scoreElement.textContent = `Acertos: ${correctAnswers}`;
  }

  nextButton.onclick = () => {
      currentQuestion++;
    
      if (currentQuestion >= quiz[currentRound].questions.length) {
        currentRound++;
        if (currentRound >= quiz.length) {
          // Final do jogo
          announcementElement.textContent = "Parabéns! Você ganhou!";
          startHeavyHeartRain(); // Chuva densa de corações
        } else {
          currentQuestion = 0;
          startRound();
        }
      } else {
        loadQuestion();
      }
  };

  function startLightHeartRain() {
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.textContent = "❤️";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * -50}%`;
      heart.style.animationDuration = `${Math.random() * 0.5 + 1}s`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 2500);
    }
  }

  function startHeavyHeartRain() {
      document.body.innerHTML = ""; // Remove todos os elementos da tela
      
      // Inicia com o fundo vermelho
      document.body.style.backgroundColor = "red"; 
      document.body.style.transition = "background-color 4s"; // Define a transição de cor
      
      // Após 3 segundos, começa a transição para azul e exibe o texto
      setTimeout(() => {
        document.body.style.backgroundColor = "blue"; // Muda para o fundo azul
    
        // Adiciona o texto do contrato
        const contractContainer = document.createElement("div");
        contractContainer.style.color = "white";
        contractContainer.style.textAlign = "center";
        contractContainer.style.padding = "20px";
        contractContainer.style.fontFamily = "Arial, sans-serif";
        contractContainer.innerHTML = `
          <h1>Seu Prêmio</h1>
          <p>
            <strong>Contrato de Relacionamento</strong><br><br>
            Eu, Gabriella Torres de Almeida, aceito manter este relacionamento com 
            Igor Quintes dos Santos por mais ∞ anos, cuidando, amando e sendo 
            parceiro(a) em todas as aventuras da vida. Este contrato é válido até o infinito 
            e além. ❤️<br><br>
            Assinado, com amor, no dia ${new Date().toLocaleDateString()}.
          </p>
          <p id="signature" style="font-size: 24px; font-family: 'Cursive', sans-serif;"></p>
          <button id="sign-button" style="
            background-color: transparent;
            color: black;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
          ">🖊️</button>
        `;
        document.body.appendChild(contractContainer);
  
        // Adiciona funcionalidade ao botão de assinar
        document.getElementById("sign-button").onclick = () => {
          const signature = document.getElementById("signature");
          signature.textContent = "Gabriella Torres de Almeida";
          signature.style.fontFamily = "'Great Vibes', cursive"; // Fonte que lembra assinatura
          signature.style.fontSize = "32px";
          signature.style.color = "white";
          signature.style.transition = "opacity 1s";
          signature.style.opacity = "1"; // Torna visível
        };
      }, 5000); // Inicia após 5 segundos
    
      for (let i = 0; i < 200; i++) { // Muito coração
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "❤️";
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * -200}%`;
        heart.style.animationDuration = `${Math.random() * 0.5 + 1}s`;
    
        document.body.appendChild(heart);
    
        setTimeout(() => {
          heart.remove();
        }, 5000);
      }
    }
