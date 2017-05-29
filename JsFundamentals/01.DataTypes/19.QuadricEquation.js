function quadric(a,b,c){
    "use strict";
   // let[a,b,c] = arr;
   // let[a,b,c] = arr.map(Number);
    let dis = Math.pow(b,2) - (4*a*c);
    if(dis > 0){
        let x1 = (-b + Math.sqrt(dis))/(2*a);
        let x2 = (-b - Math.sqrt(dis))/(2*a);
        console.log(Math.min(x1,x2));
        console.log(Math.max(x1,x2));
    } else if (dis === 0){
        let x = -b /(2*a);
        console.log(x);
    } else {
        console.log("No");
    }
}

quadric(6,11,-35);