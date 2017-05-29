function rounding(arr){
    "use strict";
    let numbForround = Number(arr[0]);
    let precision = Number(arr[1]);


    if(precision > 15)
    {
        precision = 15;
    }
    let denominator = Math.pow(10, precision);
    let result = Math.round(numbForround*denominator)/denominator;
    console.log(result);
}

rounding([3.1415926535897932384626433832795, 2]);
rounding([10.5, 3]);