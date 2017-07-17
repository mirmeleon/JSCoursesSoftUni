function sort(arr, order){
    "use strict";
    let sorted = arr.sort(function(a,b){return a-b});

    if(order === 'asc'){
       return sorted;
    } else{
       return sorted.reverse();
    }

}

console.log(sort([14, 7, 17, 6, 8], 'des'));
