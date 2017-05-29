function area(sideA, sideB){
    "use strict";
    let a = sideA * sideB;
    let per = (2*sideA)+ (2*sideB);
    console.log(a.toFixed(2));
    console.log(per.toFixed(2));
}

area(2.5, 3.14)