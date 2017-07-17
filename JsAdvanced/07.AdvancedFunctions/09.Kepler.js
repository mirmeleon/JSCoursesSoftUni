function solve(mean, ecc){
    "use strict";

    console.log(Number(approx(mean, ecc, 0).toFixed(9)));

    function approx(E0, ecc, series){
        if(Math.abs(mean - (E0-ecc*Math.sin(E0)))<1e-9 || series > 200) return E0;
        else return approx(E0 - (E0-ecc*Math.sin(E0) - mean) / (1-ecc*Math.cos(E0)), ecc, ++series);
    }
}