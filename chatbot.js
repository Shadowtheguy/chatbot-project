//Put the prompts in session storage so that you can call them in functions later.

//* Variables

let userPrompt = "";
let botTriviaQuestion = localStorage.getItem("currentQuestion");
let canAnswer = false;

//* Functions
function sendToModel() {
  async function query(data) {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  query({
    messages: [
      {
        role: "user",
        content:
          "Give me one Trivia question, without the answer, about" + userPrompt,
      },
    ],
    model: "openai/gpt-oss-120b:fireworks-ai",
  }).then((response) => {
    botReply = response.choices[0].message.content;
    console.log("Bot reply:", botReply);
    questionText.textContent = botReply;
    sessionStorage.setItem("currentQuestion", botReply);
  });
}

function sendQuestionToModel() {
  async function query(data) {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  query({
    messages: [
      {
        role: "user",
        content:
          botTriviaQuestion + "Please keep the answer as short as possible.",
      },
    ],
    model: "openai/gpt-oss-120b:fireworks-ai",
  }).then((response) => {
    botReply = response.choices[0].message.content;
    console.log("Bot reply:", botReply);
    answerText.textContent = botReply;
  });
}

//* On Event Functions

onEvent("buttonQuestion", "click", function () {
  console.log("Question Clicked");

  userPrompt = getValue("triviaTopic");
  console.log(userPrompt);

  if (userPrompt === "") {
    userPrompt === "a random topic";
    //setText("triviaQuestion", "Randomizing Trivia...");
    questionText = document.getElementById("triviaQuestion");
    questionText.textContent = "Randomizing Trivia...";
  } else {
    //setText("triviaQuestion", "Great Topic! Generating...");
    questionText = document.getElementById("triviaQuestion");
    questionText.textContent = "Great Topic! Generating...";
  }
  //sendToModel();
  canAnswer = true;
});

onEvent("buttonAnswer", "click", function () {
  console.log("Answer Clicked");

  if (canAnswer === false) {
    answerText = document.getElementById("triviaAnswer");
    answerText.textContent = "FOOL, YOU HATH NO TRIVIA!!!!";
  } else {
    //setText("triviaAnswer", "Get Ready...");
    answerText = document.getElementById("triviaAnswer");
    answerText.textContent = "Get Ready...";

    //sendQuestionToModel();
  }
});
