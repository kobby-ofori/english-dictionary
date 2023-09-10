var container = document.getElementById("container");
var input = document.getElementById("input");
var searchStatus = document.getElementById("loading");
var outputContainer = document.getElementById("output");
var vocab = document.getElementById("word");
var definitionText = document.getElementById("definition");
var phoneticText = document.getElementById("phonetic");
var partOfSpeech = document.getElementById("part-of-speech");
var wordAudio = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    searchStatus.style.display = "block";
    outputContainer.style.display = "none";
    searchStatus.innerText = `Searching... for "${word}"`

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json()); 

    searchStatus.style.display = "none";
    outputContainer.style.display = "block";
    vocab.innerText = result[0].word;
    definitionText.innerText = result[0].meanings[0].definitions[0].definition;
    phoneticText.innerText = `Phonetic: ${result[0].phonetic}`;
    partOfSpeech.innerHTML = `part of speech: ${result[0].meanings[0].partOfSpeech}`;
    wordAudio.src = result[0].phonetics[0].audio;
  } catch (error) {
    container.innerHTML = "Sorry can't fetch!"
  }
}

input.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});