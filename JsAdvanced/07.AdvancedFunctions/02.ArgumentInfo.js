function solve(input){
    "use strict";
   // console.log(arguments);
    let summary = {};
    for(let i = 0; i < arguments.length; i++){
        let obj = arguments[i];
        let type = typeof(obj);
        console.log(type + ': ' + obj);

        if(!summary[type]){
            summary[type] = 1;
        } else {
            summary[type] ++;
        }
    }
   //pravim obekta na array
    let sortedTypes = [];
    for(let currType in summary){  //string: 1
        sortedTypes.push([currType, summary[currType]]);
    }

    sortedTypes.sort(function (a,b) {return b[1] - a[1]});
   //console.log(sortedTypes);
   for(let tip of sortedTypes){
       console.log(tip[0] + ' = ' + tip[1]);
   }
}

solve('cat', 42, function () { console.log('Hello world!'); });
//solve('cat', 42, 33, 'cat', 'cat');