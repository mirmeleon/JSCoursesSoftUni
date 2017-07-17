function heroes(arr){
    "use strict";
   let herodata = [];


   for(let i = 0; i < arr.length; i++){
       let splitted = arr[i].split(/\s\/\s/g);
       let name = splitted[0];
       let lv = Number(splitted[1]);
       let items = [];
       if(splitted.length > 2){
          items = splitted[2].split(/,\s/g);
      }

       let hero = {
           name: name,
           level: lv,
           items: items
       };
       herodata.push(hero);

   }
    console.log(JSON.stringify(herodata));
}

heroes(
    [
        'Isacc / 25 / Apple, GravityGun',
        'Derek / 12 / BarrelVest, DestructionSword',
        'Hes / 1 / Desolator, Sentinel, Antara'

    ]
);