/**
 * File: PS1.P2.js
 * Author: Myka Kugaya
 * Date: 6/2/22
 *
 * Problem 2:
 * Write a function that takes as its input the following formatted strings:
 * ‘4+2’
 * ‘5*7’
 * ‘6-1’
 * ‘9/2’
 * ‘2^8’ (where ^ is exponentiation)
 * This function should
 *      Determine the operator (+, *, -, ^, or /) embedded in the string
 *      Return a function to implement the input operator that returns the result
 * For example, if the input string is ‘8%3’, return (left, right) => left % right
 * Execute the returned function to evaluate and print each expression.
 */

// input string expressions
const expr1 = '4+2';
const expr2 = '5*7';
const expr3 = '6-1';
const expr4 = '9/2';
const expr5 = '2^8';

// evaluate - returns the executable function according to the input operator
const evaluate = expr => {
    if (expr.includes('+')) {           // add
        return (left, right) => left + right;
    } else if (expr.includes('*')) {    // multiply
        return (left, right) => left * right;
    } else if (expr.includes('-')) {    // subtract
        return (left, right) => left - right;
    } else if (expr.includes('/')) {    // division
        return (left, right) => left / right;
    } else if (expr.includes('^')) {    // exponentiation
        return (left, right) => left ** right;
    } else {                                        // invalid operator
        console.log('Invalid expression.')
    }
}

// calculate - parses the expression using destructuring to assign values to left and right
const calculate = (expr, callback) => {
    let splitExpr = expr.split('');
    let [left, operator, right] = [splitExpr[0], splitExpr[1], splitExpr[2]];
    return callback(parseInt(left), parseInt(right));
}

// operate - calls calculate with the expression and callback function
const operate = expr => calculate(expr, evaluate(expr));

console.log(`${expr1} = ${operate(expr1)}`);
console.log(`${expr2} = ${operate(expr2)}`);
console.log(`${expr3} = ${operate(expr3)}`);
console.log(`${expr4} = ${operate(expr4)}`);
console.log(`${expr5} = ${operate(expr5)}`);