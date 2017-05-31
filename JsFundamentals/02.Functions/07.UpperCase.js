function upper(input){
    "use strict";
    let inputUp = input.toUpperCase();
    let extracted = extractWords();
    extracted = extracted.filter(w=> w != '');
    return extracted.join(', ');

    function extractWords(){return inputUp.split(/\W+/);}
}

console.log(upper('Hi, how are you?'));