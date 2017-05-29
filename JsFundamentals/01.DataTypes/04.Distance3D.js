function distance(arr){
    "use strict";
    let firstX = Number(arr[0]);
    let firstY = Number(arr[1]);
    let firstZ = Number(arr[2]);

    let secondX = Number(arr[3]);
    let secondY = Number(arr[4]);
    let secondZ = Number(arr[5]);

    let horOff =  secondX - firstX;
    let verOff = secondY - firstY;
    let zOff =  secondZ - firstZ;
    let dis = Math.sqrt(Math.pow(horOff,2) + Math.pow(verOff,2) + Math.pow(zOff,2));
    console.log(dis);
}

distance([3.5, 0, 1, 0, 2, -1]);