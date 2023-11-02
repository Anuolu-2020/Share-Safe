//Type of redact option picked
let preset = document.getElementById("preset");

let userPresetWord = document.getElementById("userRedactWord");

let isPreset = false;
let isUserPreset = false;

preset.addEventListener("click", () => {
  isPreset = true;
  isUserPreset = false;

  let redactPreset = document.getElementById("redactWord");

  let userPreset = document.getElementById("userPreset");

  redactPreset.style.display = "block";
  userPreset.style.display = "none";
  userPresetWord.style.display = "block";
  preset.style.display = "none";
});

userPresetWord.addEventListener("click", () => {
  isPreset = false;
  isUserPreset = true;

  let redactPreset = document.getElementById("redactWord");

  userPreset.style.display = "block";
  redactPreset.style.display = "none";
  preset.style.display = "block";
  userPresetWord.style.display = "none";
});

////////////////////////////////////////

//Reference to user content
let userContent = document.getElementById("userWords");

//Reference to words to be redacted fro user content
let userRedactWords = document.getElementById("wordsToRedact");

//Reference to predefined presect sign
let predefinedPreset = document.getElementById("redactWord");

//Reference to user presect sign
let userPreset = document.getElementById("userPreset");

//predefined redact sign
let redactSign = predefinedPreset.value;

//user redact sign
let presetRedactSign = userPreset.value;

//Reference to store new words
let userWordsNew;

let operationTitle = document.getElementById("operationTitle");

let redactPreset = document.getElementById("redactWord");

function scrambledSign() {
  if (isPreset) {
    return redactPreset.value;
  } else if (isUserPreset) {
    return userPreset.value;
  } else {
    return redactPreset.value;
  }
}

//Start Operation Time

function redact() {
  const startTime = performance.now();

  //User Content
  let userWords = userContent.value;
  // "EMMNAUEL NAME IS GOOD"

  // console.log(userWords);
  userWords.trim().replace(/\s+/g, " ");

  let userRedact = userRedactWords.value;

  let scannedCharac = document.getElementById("characters");

  let numOfCharac = userWords.trim().split(" ").join("");
  scannedCharac.textContent = `Scanned ${numOfCharac.length} Characters`;
  // console.log(numOfCharac.length);

  let userRedactSplit = userRedact.trim().split(" ");

  let regexMatch = userRedactSplit.join("|");

  let pattern = `\\b(${regexMatch})\\b`;

  console.log(pattern);

  let regex = new RegExp(pattern, "g");

  let result = userWords.match(regex);

  let numOfScannedWord = userWords.trim().split(" ");
  let scannedWords = document.getElementById("words");

  scannedWords.textContent = `Scanned ${numOfScannedWord.length} Words`;

  if (result && userContent.value) {
    let resultStat = document.getElementById("resultStats");
    resultStat.style.display = "flex";

    // console.log("word found", result);
    let scrambledWords = document.getElementById("scramWords");

    scrambledWords.textContent = `Scrambled ${result.length} words`;
    userWordsNew = userWords.replace(regex, scrambledSign());

    userContent.value = userWordsNew;

    //Change operation title
    operationTitle.textContent = "SCRAMBLED SUCCESSFULLY";

    noWord.style.display = "none";
  } else {
    let noWord = document.getElementById("noWord");
    noWord.style.display = "block";

    let copy = document.getElementById("copy");
    copy.style.display = "none";

    let resultStat = document.getElementById("resultStats");
    resultStat.style.display = "none";

    console.log("No Words Found");
  }

  const endTime = performance.now();

  const timeTaken = (endTime - startTime) / 1000;

  let operationTime = document.getElementById("time");
  operationTime.textContent = `Time taken: ${timeTaken} seconds`;
}

document.getElementById("redactButton").addEventListener("click", () => {
  if (userContent.value === " ") {
    let title = document.getElementById("operationTitle");
    title.textContent = "Please Paste A Word";

    let copy = document.getElementById("copy");
    copy.style.display = "none";

    let copied = document.getElementById("copied");
    copied.style.display = "none";

    console.log("NOW WORDS");
  } else {
    let copy = document.getElementById("copy");

    copy.style.display = "block";

    redact();
    document.getElementById("redactButton").style.display = "none";
    document.getElementById("resetButton").style.display = "flex";
  }
});

//Reset Button
document.getElementById("resetButton").addEventListener("click", () => {
  let copy = document.getElementById("copy");
  copy.style.display = "none";

  let copied = document.getElementById("copied");
  copied.style.display = "none";

  userContent.value = " ";
  userRedactWords.value = " ";

  let resultStat = document.getElementById("resultStats");
  resultStat.style.display = "none";

  operationTitle.textContent = "PASTE YOUR WORDS";

  isPreset = false;
  isUserPreset = false;

  let redactPreset = document.getElementById("redactWord");

  let userPreset = document.getElementById("userPreset");

  redactPreset.style.display = "none";
  userPreset.style.display = "none";

  preset.style.display = "block";
  userPresetWord.style.display = "block";

  document.getElementById("redactButton").style.display = "flex";
  document.getElementById("resetButton").style.display = "none";
});
