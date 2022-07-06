function add7(number) {
  console.log(number + 7);
}

function multiply(number1, number2) {
  console.log(number1 * number2);
}

function capitalize(string) {
  console.log(
    string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase()
  );
}

function lastLetter(string) {
  console.log(
    string.substring(string.length -1)
  )
}

add7(2);
multiply(1, 9);
capitalize("helOO");
lastLetter("aisduhfas");