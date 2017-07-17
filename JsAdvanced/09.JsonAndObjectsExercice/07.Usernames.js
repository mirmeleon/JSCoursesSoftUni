function usernamse(arr){
    "use strict";
   let setche = new Set();
   for(let i = 0; i < arr.length; i++){
       setche.add(arr[i]);
   }

   let sorted = [...setche.keys()].sort(myOrder)
       .forEach(a => console.log(a));

   function myOrder(a,b){
      let firstCr = a.length - b.length;

       if(a.length != b.length){
            return firstCr
       } else {
           return a.localeCompare(b);
       }
   }



}

usernamse([
    'Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston'

]);