function parseApply(expr, program) {
  program = program.trimLeft();
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = program.slice(1).trimLeft();
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = arg.rest.trimLeft();
    if (program[0] == ",") {
      program = program.slice(1).trimLeft();
    } else if (program[0] != ")") {      
      throw new SyntaxError(`Expected ',' or ')', received ${program[0]}`);
    }
  }
  return parseApply(expr, program.slice(1));
}

function parseExpression(program) {
  program = program.trimLeft();
  let match;
  let expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function parse(program) {
  const { expr, rest } = parseExpression(program);
  if (rest.trimLeft().length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

module.exports = parse;
