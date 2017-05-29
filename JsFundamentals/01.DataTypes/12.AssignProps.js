function assign(arr){
    "use strict";
    let [key1, val1, key2, val2, key3, val3] = arr;
    let obj = {};
    obj[key1] = val1;
    obj[key2] = val2;
    obj[key3] = val3;

    console.log(obj);
}
assign(['name', 'Pesho', 'age', '23', 'gender', 'male']);