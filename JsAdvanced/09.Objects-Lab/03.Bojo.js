function ass(carParts){
   let mod ={};
   let engine;

    if(carParts.power <=90){
       engine = {
           power:90,
           volume: 1800

       }
    } else if(carParts.power <=120){
        engine = {
            power:120,
            volume: 2400
        }
    } else if(carParts.power <=200){
        engine = {
            power:200,
            volume: 3500
        }
    }

    mod.model = carParts.model;
    mod.engine = engine;
    mod.carriage = {
        type: carParts.carriage,
        color: carParts.color
    };

    let wheel = carParts.wheelsize;
    if(carParts['wheelsize']%2 === 0){
        wheel = carParts.wheelsize-1;

    }
    mod.wheels = [wheel,wheel,wheel,wheel];
   return mod;
}


console.log(ass({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17

}));