function pali(w){
    "use strict";
   for(let i = 0; i < (w.length-1)/2; i++){

       if(w[i] != w[(w.length-1-i)]){
           return false;

       }
       return true;
   }

}

console.log(pali("haha"));
console.log(pali("racecar"));
console.log(pali("unitinu"));
