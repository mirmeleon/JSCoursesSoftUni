function calculator(a,b, op) {

let calc = function(a,b, operation){ return operation(a,b);}

let add = function(a,b){return a+b};
let substract = function(a,b){return a-b};
let multiply = function(a,b){return a*b};
let divide = function(a,b){return a/b};

switch(op){
    case '+':
        return calc(a,b, add);
        break;
    case '-':
        return calc(a,b, substract);
        break;
    case '*':
        return calc(a,b, multiply);
        break;
    case '/':
        return calc(a,b,divide);
        break;
}
}

console.log(calculator(8, 4, '-'));

