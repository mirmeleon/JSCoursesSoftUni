function distance(arr){
    "use strict";
    let speedA = (Number(arr[0])*1000)/3600;
    let speedB = (Number(arr[1])*1000)/3600;
    let time = Number(arr[2]);

    let disA = speedA * time;
    let disB = speedB * time;

     let result = Math.abs(disA - disB);
    console.log(result);

}

distance([5, -5, 40]);