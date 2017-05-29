function imperial(input){
    "use strict";
    let inches = Math.floor(input/12);
    let reminder = input % 12;

    console.log(`${inches}'-${reminder}"`);

}
imperial(36);
imperial(55);
imperial(11);