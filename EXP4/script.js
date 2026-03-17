function getNumbers() {
  const firstValue = document.getElementById("num1").value.trim();
  const secondValue = document.getElementById("num2").value.trim();

  if (firstValue === "" || secondValue === "") {
    return { error: "Please enter values in both input fields." };
  }

  const firstNumber = Number(firstValue);
  const secondNumber = Number(secondValue);

  if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
    return { error: "Please enter valid numeric values." };
  }

  return { firstNumber, secondNumber };
}

function setResult(message) {
  document.getElementById("result").textContent = message;
}

function calculate(operation) {
  const values = getNumbers();

  if (values.error) {
    setResult(values.error);
    return;
  }

  const { firstNumber, secondNumber } = values;
  let result;

  if (operation === "add") {
    result = firstNumber + secondNumber;
  } else if (operation === "subtract") {
    result = firstNumber - secondNumber;
  } else if (operation === "multiply") {
    result = firstNumber * secondNumber;
  } else if (operation === "divide") {
    if (secondNumber === 0) {
      setResult("Cannot divide by zero.");
      return;
    }
    result = firstNumber / secondNumber;
  } else {
    setResult("Unknown operation.");
    return;
  }

  setResult(`Result: ${result}`);
}

function clearFields() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  setResult("Enter values and choose an operation.");
}
