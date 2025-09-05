//* Variables

let userPrompt = "";
let botTriviaQuestion = "";
let botTriviaAnswer = "";

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
  });
}

//* On Event Functions
//! No way to call for the both question and answer yet

onEvent("buttonQuestion", "click", function () {
  console.log("Question Clicked");

  //setText("triviaQuestion", "Working Faster...");
  questionText = document.getElementById("triviaQuestion");
  questionText.textContent = "Working Faster...";

  userPrompt = getValue("triviaTopic");
  console.log(userPrompt);

  //sendToModel();
});

onEvent("buttonAnswer", "click", function () {
  console.log("Answer Clicked");

  //setText("triviaAnswer", "Get Ready...");
  answerText = document.getElementById("triviaAnswer");
  answerText.textContent = "Get Ready...";

  sendToModel();
});
