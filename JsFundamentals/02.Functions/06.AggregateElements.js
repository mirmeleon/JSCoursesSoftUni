function aggregateEls(arr){
    "use strict";


  function agg(els, initVal, func){
      let val = initVal;
      for(let i =0; i < els.length; i++){
          val = func(val, els[i]);

      }

      console.log(val);
  }
    agg(arr, 0, (a,b) => a + b);
    agg(arr, 0, (a,b) => a + 1/b);
    agg(arr, '', (a,b) => a + b);
}

aggregateEls([10, 20, 30]);