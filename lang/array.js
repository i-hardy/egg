const array = (...values) => {
  if (!values.length) {
    throw new SyntaxError("Wrong number of args to array");
  }
  return [...values];
}

const length = (array) => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Non-array arg passed to length");
  }
  return array.length;
}

const element = (array, num) => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Non-array passed as first arg to element");
  }
  if (!Number.isInteger(num)) {
    throw new SyntaxError("Non-integer passed as second arg to element");
  }
  return array[num];
}

const map = (array, fun) => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Non-array arg passed to map");
  }
  return array.map(fun);
}

const filter = (array, fun) => {
  if (!Array.isArray(array)) {
    throw new SyntaxError("Non-array arg passed to filter");
  }
  return array.filter(fun);
}

module.exports = {
  array,
  length,
  element,
  map,
  filter,
}
