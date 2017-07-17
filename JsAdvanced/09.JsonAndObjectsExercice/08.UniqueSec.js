function solve(dataRows) {
    "use strict";
    let uniq = [];
    for(let dataRow of dataRows){
      let numArr = JSON.parse(dataRow)
          .map(Number)
          .sort(sortByDescending);

      let curSum = numArr.reduce((a,b) => a+b);
    //find e vse edno any v c#; tursim masiv s takava suma i ako niama go dobaviame
      if(!uniq.find(arr =>
              arr.reduce((a,b) => a+b) === curSum)){
          uniq.push(numArr);
      }


    }

    function sortByDescending(a, b) {
        return b-a;
    }


    uniq.sort((a,b) => a.length > b.length)
        .forEach(arr => console.log(`[${arr.join(', ')}]`));

   }

   solve(
          [
           '[-3, -2, -1, 0, 1, 2, 3, 4]',
           '[10, 1, -17, 0, 2, 13]',
           '[4, -3, 3, -2, 2, -1, 1, 0]'
          ]
   );
