/**
 * File: PS1.PS1.js
 * Author: Myka Kugaya
 * Date: 6/2/22
 *
 * Problem 1:
 * Write a function that takes a string as its input and returns a new string that contains all of the
 * letters in the original string, but in reverse alphabetical order. Ignore punctuation and numbers.
 * Duplicates are fine, so 'exioi' -> 'xoiie'. Test your function using the string
 * ‘supercalifragilisticexpialidocious’.
 */

const revSortStr = str => {
    return str.split('').sort().reverse().join();
}

console.log(revSortStr('supercalifragilisticexpialidocious'));