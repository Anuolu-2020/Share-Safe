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

//Start Operation Time
const startTime = performance.now();

function redact() {
  //User Content
  let userWords = userContent.value;
  // "EMMNAUEL NAME IS GOOD"

  // console.log(userWords);
  userWords.trim().replace(/\s+/g, " ");

  // let userWordSplit = userWords.split(/\s+/);

  let userRedact = userRedactWords.value;

  // ("NAME GOOD");

  let userRedactSplit = userRedact.trim().split(" ");

  let regexMatch = userRedactSplit.join("|");

  let pattern = `\\b(${regexMatch})\\b`;

  console.log(pattern);

  let regex = new RegExp(pattern, "g");

  let result = userWords.match(regex);

  if (result) {
    console.log("word found", result);

    console.log(`Scrambled ${result.length} words`);
    userWordsNew = userWords.replace(regex, "???");

    //Display New Words
    console.log(userWordsNew);

    //Split the contents to be redacted
    let userWordsSplit = userWords.split(/\s+/);

    //Get number of words scanned
    console.log(`Scanned ${userWordsSplit.length} Words`);
  } else {
    console.log("No Words Found");
  }
}

const endTime = performance.now();

const timeTaken = endTime - startTime;

document.getElementById("redactButton").addEventListener("click", () => {
  redact();
  console.log(`Time taken: ${timeTaken / 1000} seconds`);
});
