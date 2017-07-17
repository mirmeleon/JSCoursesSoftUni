let solve = (function(){
  let sum = 0;


  return function add(number){ //priema go vuv func det ni e vurnata
      "use strict";
   sum += number;
   add.toString = function(){
       return sum
   };
     return add; //ne ia invokvame s (), a samo ia vrushtame
  }

})();

console.log(solve(1)(6)(-3).toString());