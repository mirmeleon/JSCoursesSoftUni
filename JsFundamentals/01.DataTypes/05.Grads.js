function convert(grads){
    "use strict";
    let degree = grads * 0.9 % 360;

    if(0 >= degree)
    {
        let calc;

            //console.log('pod 0');
            calc =  degree + 360;
            console.log(calc);

    } else {
        console.log(degree);
    }
}

convert(400);