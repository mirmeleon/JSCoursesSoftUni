function compose (arr){
    "use strict";
   let[img, alt] = arr;
   console.log(`<img src="${img}" alt="${alt}">`);
}

compose(['smiley.gif', 'Smiley Face']);