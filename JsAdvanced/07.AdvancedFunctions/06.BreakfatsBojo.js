let solution = function(){
   let robot = {
       carbohydrate: 0,
       flavour: 0,
       fat: 0,
       protein: 0
   };

   let products = {
       apple: {
           carbohydrate:1,
           flavour: 2
       },
       coke: {
           carbohydrate: 10,
           flavour:20
       },
       burger: {
           carbohydrate: 5,
           fat:7,
           flavour: 3
       },
       omelet: {
           protein: 5,
           fat:1,
           flavour: 1
       },
       cheverme: {
           protein: 10,
           carbohydrate:10,
           fat:10,
           flavour: 10
       }
   };
   return function(inpString){
       "use strict";
       let inputData = inpString.split(' ');
       let command = inputData[0];

       if(command === 'restock'){
           let microElement = inputData[1];
           let qty = Number(inputData[2]);

           robot[microElement] += qty;
           return 'Success';
       } else if(command === 'report'){
           return `protein=${robot.protein} carbohydrate=${robot.carbohydrate} fat=${robot.fat} flavour=${robot.flavour}`;
       } else if(command === 'prepare'){
           let selectedProduct = inputData[1];
           let selectedProductQty = Number(inputData[2]);
           let currProductStats = products[selectedProduct];

           let canProductBeCooked =true;


           for(var microEl in currProductStats){
               if(currProductStats.hasOwnProperty(microEl)){
                   let microElQty = currProductStats[microEl];
                   if(robot[microEl] < microElQty * selectedProductQty){
                       canProductBeCooked = false;
                       return `Error: not enough ${microEl} in stock`;
                       break;
                   }
               }
           }

           if(canProductBeCooked){
               for(var microEl in currProductStats){
                   if(currProductStats.hasOwnProperty(microEl)){
                       let microElQty = currProductStats[microEl];
                      robot[microEl] -= microElQty * selectedProductQty;
                   }
               }
               return 'Success';
           }
       }
   }


};
//za da go izvikam
solution = solution();
solution('restock carbohydrate 10');
solution('restock flavour 10');
solution('prepare apple 1');
solution('restock fat 10');
solution('prepare burger 1');
solution('report');
