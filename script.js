const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const playerInput = document.getElementById("player-name");
const playerDisplay = document.getElementById("player-display");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressBar = document.querySelector(".progress");
const finalTextEl = document.getElementById("final-text");

let playerName = "";
let currentQuestion = 0;
let story = "";

const questions = [
  {
    question: "Você é um laçador experiente ou está começando?",
    answers: [
      { text: "Experiente", feedback: "Mostrou habilidade e confiança." },
      { text: "Aprendendo", feedback: "Está crescendo e aprendendo com esforço." },
      { text: "Curioso", feedback: "A curiosidade é seu primeiro passo." },
    ]
  },
  {
    question: "Qual tipo de laço você prefere?",
    answers: [
      { text: "Fibra sintética", feedback: "Prefere leveza e resistência." },
      { text: "Couro trançado", feedback: "Valoriza a tradição e o estilo." },
      { text: "Reforçado de rodeio", feedback: "Busca força e velocidade." },
    ]
  },
  {
    question: "Qual é sua técnica favorita?",
    answers: [
      { text: "Cabeçada", feedback: "Mira rápido e certeiro." },
      { text: "Corpo", feedback: "Segurança em primeiro lugar." },
      { text: "Duplo", feedback: "Controle e firmeza." },
    ]
  },
  {
    question: "Onde você costuma praticar?",
    answers: [
      { text: "No campo", feedback: "Enfrenta a realidade do campo aberto." },
      { text: "No rodeio", feedback: "Sente a energia da competição." },
      { text: "No rancho", feedback: "Treina com amigos em clima tranquilo." },
    ]
  },
  {
    question: "Como você se prepara antes de laçar?",
    answers: [
      { text: "Alongo e aqueço", feedback: "Cuida bem do corpo antes do desafio." },
      { text: "Concentro a mente", feedback: "Foco e calma são suas armas." },
      { text: "Vou direto para o laço", feedback: "Confia na coragem acima de tudo." },
    ]
  },
  {
    question: "Um boi foge durante a prova, o que você faz?",
    answers: [
      { text: "Corre atrás e não desiste", feedback: "Sua determinação impressiona." },
      { text: "Mantém a calma e espera o momento certo", feedback: "Paciência é sua estratégia." },
      { text: "Pede ajuda ao parceiro", feedback: "Valoriza o trabalho em equipe." },
    ]
  },
  {
    question: "Como você avalia sua última apresentação?",
    answers: [
      { text: "Foi um sucesso!", feedback: "Brilhou diante do público." },
      { text: "Cometi erros, mas aprendi", feedback: "Evolui com cada experiência." },
      { text: "Foi frustrante", feedback: "A determinação para melhorar é sua força." },
    ]
  }
];

function startGame() {
  playerName = playerInput.value.trim();
  if (!playerName) {
    alert("Digite seu nome para começar!");
    return;
  }

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQuestion = 0;
  story = "";
  updateProgress();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  playerDisplay.textContent = playerName;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  // animação de fade-in para pergunta
  questionEl.classList.remove("fade-in");
  void questionEl.offsetWidth;
  questionEl.classList.add("fade-in");

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.classList.add("fade-in");
    btn.addEventListener("click", () => selectAnswer(answer.feedback));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(feedback) {
  story += feedback + " ";
  currentQuestion++;
  updateProgress();

  if (currentQuestion >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let finalMessage = `A jornada de ${playerName} terminou!\n\n${story}\n\n`;

  if (story.includes("sucesso")) {
    finalMessage += `${playerName} se consagrou campeão, encantando a todos no rodeio!`;
  } else if (story.includes("aprendi")) {
    finalMessage += `${playerName} segue firme, cada erro foi uma lição para evoluir.`;
  } else if (story.includes("frustrante")) {
    finalMessage += `${playerName} enfrentou dificuldades, mas sua garra o fará vencer no futuro.`;
  } else {
    finalMessage += `${playerName} viveu uma grande aventura, e o amor pelo laço é o que mais importa!`;
  }

  finalTextEl.textContent = finalMessage;

  // animação no resultado
  finalTextEl.classList.remove("result-animate");
  void finalTextEl.offsetWidth;
  finalTextEl.classList.add("result-animate");
}

function restartGame() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  playerInput.value = "";
  progressBar.style.width = "0%";
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
