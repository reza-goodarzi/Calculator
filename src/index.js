const inputs = document.querySelector(".inputs");
const textInput = document.querySelector(".input");

const state = {
  userNumbers: [],
  numbers: [],
  userOprators: [],
  isShowResult: false
};

// Reset State
const reset = () => {
  state.numbers = [];
  state.userNumbers = [];
  state.userOprators = [];
  state.isShowResult = false;
  textInput.value = "";
};

// Show user Input
const showUserInput = (input) => {
  textInput.value += input;
};

// Cheack last character user entered is Number or Not
const lastCharacterIsNumber = () => {
  let isNumber = textInput.value.trim();
  isNumber = isNumber[isNumber.length - 1];
  isNumber = Number(isNumber);

  return !isNaN(isNumber);
};

// Get single Numbers
const setNumbers = () => {
  const numbers = state.userNumbers.join("");
  state.userNumbers = [];
  state.numbers = [...state.numbers, +numbers];
};

// Handle Buttons
const handleNumbers = (number) => {
  showUserInput(number);

  state.userNumbers = [...state.userNumbers, number];
};

const handleOprator = (oprator) => {
  if (textInput.value === "" || !textInput.value || !lastCharacterIsNumber())
    return;

  showUserInput(` ${oprator} `);

  state.userOprators = [...state.userOprators, oprator];

  setNumbers();
};

const handlePoint = (point) => {
  const hasPoint = state.userNumbers.includes(".");

  if (!lastCharacterIsNumber() || hasPoint) return;

  showUserInput(point);
  state.userNumbers = [...state.userNumbers, point];
};

const handleResult = () => {
  if (textInput.value === "" || !textInput.value || !lastCharacterIsNumber())
    return;

  setNumbers();

  let result = state.numbers[0];
  state.userOprators.forEach((oprator, index) => {
    if (oprator === "*") result *= state.numbers[index + 1];
    if (oprator === "/") result /= state.numbers[index + 1];
    if (oprator === "+") result += state.numbers[index + 1];
    if (oprator === "-") result -= state.numbers[index + 1];
  });
  console.log(state);
  state.isShowResult = true;
  // textInput.value = result.toString();
  textInput.value =
    result % 1 === 0 ? result.toString() : result.toFixed(2).toString();
};

// Handle User clicks
inputs.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target.closest(".btn");

  if (!target) return;

  if (state.isShowResult) reset();

  const isNumber = target.classList.contains("number");
  const isOprator = target.classList.contains("oprator");
  const isClearButton = target.classList.contains("clear");
  const isPoint = target.classList.contains("point");
  const isResult = target.classList.contains("result");

  if (isNumber) handleNumbers(target.textContent);
  if (isOprator) handleOprator(target.textContent);
  if (isPoint) handlePoint(target.textContent);
  if (isClearButton) reset();
  if (isResult) handleResult();
});
