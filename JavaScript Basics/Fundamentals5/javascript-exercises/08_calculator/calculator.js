const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const sum = (arr) => {
  return arr.reduce((count, num) => {
    return (count += num);
  }, 0);
};

const multiply = (arr) => {
  return arr.reduce((count, num) => {
    if (!count) {
      count = num;
    }
    return (count *= num);
  });
};

const power = (num, pow) => {
  return Math.pow(num, pow);
};

const factorial = (num) => {
  if (num === 0) {
    return 1;
  }
  return num * factorial(num - 1);
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial,
};
