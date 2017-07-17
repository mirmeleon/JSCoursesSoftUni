function obj(name, age, weight, height){
    "use strict";
    let bmiIndex = Number((weight / Math.pow(height/100, 2)).toFixed(2));


    let findStatus = function (){

        if(18.5 > bmiIndex){
            return 'underweight';
        }

        if(bmiIndex < 25){
            return 'normal';
        }

        if( bmiIndex < 30){
            return 'overweight';
        }

        if(bmiIndex >= 30){
            return 'obese';
        }

    };

    let per = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height
        },
        BMI: Number(bmiIndex.toFixed()),
        status: findStatus()

    }; //end persin

    if(per.status === 'obese'){
        per['recommendation'] = 'admission required';
    }

  return per;

}

console.log(obj('Honey Boo Boo', 9, 57, 137));