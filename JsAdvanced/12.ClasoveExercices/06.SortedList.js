class SortedList{
    constructor(){
        this.nums = [];
        this.size = 0;
    }

     get(index){

         if(index < 0 && index > this.nums.length){
             throw new RangeError('Invalid index');
         }
        return this.nums[index];
     }

     remove(index){
         if(index < 0 && index > this.nums.length){
             throw new RangeError('Invalid index');
         }
         this.size--;
        this.nums.splice(index,1);
         this.nums= this.nums.sort((a,b) => a-b);
     }

     add(element){
         this.nums.push(element);
         this.size ++;
         this.nums= this.nums.sort((a,b) => a-b);
     }

}

//
// function sortedList(){
//     let list = (function () {
//         let nums = [];
//         return {
//             size : 0,
//             get : function(index) {
//                 if (index < nums.length && index >= 0)
//                     return nums[index]
//             },
//             add: function(element) {
//                 nums.push(element);
//                 this.size++;
//                 nums = nums.sort((a, b) => a - b)
//             },
//             remove: function(index) {
//                 if (index < nums.length && index >= 0){
//                     nums.splice(index, 1);
//                     nums = nums.sort((a, b) => a - b);
//                     this.size--;
//                 }
//             }
//         }
//     })();
//     return list;
// }