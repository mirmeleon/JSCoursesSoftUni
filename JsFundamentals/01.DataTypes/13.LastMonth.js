function lastMonth(numArr){
    "use strict";
    let[day, month, year] = numArr;
    let dat = new Date(year, month-1, 0);
    console.log(`${dat.getDate()}`);
}

lastMonth([17, 3, 2002]);