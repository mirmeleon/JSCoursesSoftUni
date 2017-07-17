function isOddOrEven(input){

    if(typeof(input) !== 'string'){
        return undefined;
    }
    if(input.length % 2 === 0){
        return 'even'
    } else if(input.length % 2 !== 0){
        return 'odd';
    }

}
console.log(isOddOrEven(NaN));

module.exports = {isOddOrEven};