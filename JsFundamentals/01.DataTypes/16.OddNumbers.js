function odd(n){
    "use strict";
    let max = n % 2 == 0 ? n - 1 : n;
    for(let i = 1; i <= max; i+=2){
        console.log(i);
    }
}

odd(5);
odd(4);
odd(7);