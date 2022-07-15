/**
 * 
 * @param {string} string 
 */
const palindromes = function (string) {
    const arr = [...string].map((char) => char.toLowerCase()).filter((char) => !char.match(/[^a-z]/g));
    console.log(...arr);
    for( let i = 0; i < arr.length / 2; i++) {
        if( arr[i] != arr[arr.length - i - 1]) {
            return false;
        }
    }
    return true;
};

// Do not edit below this line
module.exports = palindromes;
