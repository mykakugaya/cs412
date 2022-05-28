/**
 * File: PS1.P3.js
 * Author: Myka Kugaya
 * Date: 6/2/22
 *
 * Problem 3:
 * Write a function that accepts two input parameters: a string, and a decorator function. The
 * function should execute the passed decorator function on the passed string and return the
 * result.
 * Next, write two expressions that call this function. For the first, pass the string
 * ‘supercalifragilisticexpialidocious’ and a lambda (unnamed) function that returns an array
 * containing fragments of the input string broken on the character ‘c’. For the input string
 * ‘supercalifragilisticexpialidocious’, you should get
 * [‘super’, ‘califragilisti’, ‘cexpialido’, ‘cious’]
 * This is actually a little tougher than it sounds…a hint would be to take a look at how bit/
 * character stuffing is done in networking.
 * For the second expression, pass the string ‘supercalifragilisticexpialidocious’ and a lambda
 * function that replaces all of the ‘a’ characters with ‘A’ characters. Return an object that
 * contains the original string, the modified string, the total number of As in the modified string,
 * and the overall length of the modified string:
 * {
 * 	 	 originalString: xxx,
 * 	 	 modifiedString: xxx,
 * 	 	 numberReplaced: xxx,
 * 	 	 length:		 	 xxx,
 * }
 * Print the data from the returned object on the console (console.table would be good for this).
 */

const inputStr = 'supercalifragilisticexpialidocious';

// execute the passed decorator function on the passed string and return the result
const strDecFunc = (str, decor) => decor(str);

// first expression
// returns an array containing fragments of the input string broken on the character ‘c’
const expr1 = strDecFunc(inputStr, str => {
    // maintain delimiter
    return inputStr.split(/(?=c)/g)
})

console.log(expr1);

// second expression
// modify input string by replacing 'a' with 'A'
// return object with original str, modified str, number of 'a's replaced, and str length
const expr2 = strDecFunc(inputStr, str => {
    return {
        originalString: inputStr,
        modifiedString: inputStr.replace(/a/g, 'A'),
        numberReplaced: inputStr.replace(/a/g, 'A').split('A').length - 1,
        length: inputStr.length,
    }
})

console.table(expr2);