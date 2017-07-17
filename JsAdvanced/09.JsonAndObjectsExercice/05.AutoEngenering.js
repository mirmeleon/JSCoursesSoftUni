function auto(arr){
    "use strict";
    let mappedCars = new Map();

  for(let val of arr){
      let splitted = val.split(/\s\|\s/g);
      let car = splitted[0];
      let model = splitted[1];
      let qty = Number(splitted[2]);

     // console.log(splitted);

      if(!mappedCars.has(car)){
          mappedCars.set(car, new Map());
          mappedCars.get(car).set(model, qty);
         // console.log(mappedCars);
      } else {
          //ako imame kolata ama niamame modela
          if(!mappedCars.get(car).has(model)){
              mappedCars.get(car).set(model, qty);
          } else { //updatvame qtyto
              let oldQty = mappedCars.get(car).get(model);
              mappedCars.get(car).set(model, qty + oldQty);
          }
      }
    }

     for(let [car, model] of mappedCars){
      console.log(car);
         for(let [mod, pc] of model){
             console.log(`###${mod} -> ${pc}`)
         }
     }
}

auto([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'

]);