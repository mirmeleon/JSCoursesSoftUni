let fatherC = {
    br:'bmc',
    toString: function(){
        "use strict";
        return `branda e ${this.br}`;
    }
};

console.log('' + fatherC);
let child = Object.create(fatherC);
child.br = 'porshe';

console.log(child.toString());

console.log(Object.getPrototypeOf(fatherC));
console.log(Object.getPrototypeOf(child));