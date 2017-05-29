function interest(arr){
    "use strict";
    let prinSum = Number(arr[0]);
    let iRatePercent = Number(arr[1])/100;
    let nCompInMonths = 12/Number(arr[2]);
    let timespanInYears = Number(arr[3]);

    let calculatedPow = timespanInYears * nCompInMonths;
    let brekets = 1 + (iRatePercent/nCompInMonths);

    let formula = prinSum * (Math.pow(brekets, calculatedPow));

    console.log(Math.round(formula*100)/100);

}

interest([1500, 4.3, 3, 6]);
interest([100000, 5, 12, 25]);