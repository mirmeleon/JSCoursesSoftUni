let solution = function(){

    let objProducts = {
        carbohydrate: 0,
        flavour: 0,
        fat: 0,
        protein: 0
    };

    return function(input){
        let splitted = input.split(' ');
        let command = splitted[0];
        let ingredient = splitted[1];
        let qty = Number(splitted[2]);

        //console.log(objProducts);
        switch (command) {
            case 'restock':
                objProducts[ingredient] += qty;
                return objProducts;
                break;
            case 'prepare':  //tuka vrushta success ili error

                return CheckIngredients(ingredient, qty, objProducts);
                break;
            case 'report':
                return '';
                break;
        }


        function CheckIngredients(product, qty, objProducts) {

            if (product === 'apple') {
                let carbNeeded = 1 * qty;
                let flavNeeded = 2 * qty;
                if (objProducts.carbohydrate < carbNeeded) {
                   // return 'Error: not enough carbohydrate in stock';
                    console.log('Error: not enough carbohydrate in stock');
                } else if (objProducts.flavour < flavNeeded) {
                    //return 'Error: not enough flavour in stock';
                    console.log('Error: not enough flavour in stock');
                } else {
                    objProducts.flavour -= flavNeeded;
                    objProducts.carbohydrate -= carbNeeded;
                   // return 'Success';
                    console.log('Success');
                }
            }

            if (product === 'coke') {
                let carbNeeded = 10 * qty;
                let flavNeeded = 20 * qty;

                if (objProducts.carbohydrate < carbNeeded) {
                  //  return 'Error: not enough carbohydrate in stock';
                    console.log('Error: not enough carbohydrate in stock');
                } else if (objProducts.flavour < flavNeeded) {
                   // return 'Error: not enough flavour in stock';
                    console.log('Error: not enough flavour in stock');

                } else {
                    objProducts.flavour -= flavNeeded;
                    objProducts.carbohydrate -= carbNeeded;
                    //return 'Success';
                    console.log('Success');
                }
            }

            if (product === 'burger') {
                let carbNeeded = 5 * qty;
                let flavNeeded = 3 * qty;
                let fatNeeded = 7 * qty;

                if (objProducts.carbohydrate < carbNeeded) {
                    //return 'Error: not enough carbohydrate in stock';
                    console.log('Error: not enough carbohydrate in stock');

                } else if (objProducts.flavour < flavNeeded) {
                   // return 'Error: not enough flavour in stock';
                    console.log('Error: not enough flavour in stock');
                } else if (objProducts.fat < fatNeeded) {
                   // return 'Error: not enough fat in stock';
                    console.log('Error: not enough fat in stock');
                } else {

                    objProducts.flavour -= flavNeeded;
                    objProducts.fat -= fatNeeded;
                    objProducts.carbohydrate -= carbNeeded;
                   // return 'Success';
                    console.log('Success');
                }

            }
            if (product === 'omelet') {
                let proteinNeeded = 5 * qty;
                let flavNeeded = 1 * qty;
                let fatNeeded = 1 * qty;

                if (objProducts.protein < proteinNeeded) {
                   // return 'Error: not enough protein in stock';
                    console.log('Error: not enough protein in stock');
                } else if (objProducts.flavour < flavNeeded) {
                   // return 'Error: not enough flavour in stock';
                    console.log('Error: not enough flavour in stock');
                } else if (objProducts.fat < fatNeeded) {
                   // return 'Error: not enough fat in stock';
                    console.log('Error: not enough fat in stock');
                } else {
                    objProducts.protein -= proteinNeeded;
                    objProducts.flavour -= flavNeeded;
                    objProducts.fat -= fatNeeded;

                  //  return 'Success';
                    console.log('Success');
                }
            }
            if (product === 'cheverme') {
                let proteinNeeded = 10 * qty;
                let carbNeeded = 10 * qty;
                let flavNeeded = 10 * qty;
                let fatNeeded = 10 * qty;

                if (objProducts.protein < proteinNeeded) {
                   // return 'Error: not enough protein in stock';
                    console.log('Error: not enough protein in stock');
                } else if (objProducts.flavour < flavNeeded) {
                   // return 'Error: not enough flavour in stock';
                    console.log('Error: not enough flavour in stock');
                } else if (objProducts.fat < fatNeeded) {
                   // return 'Error: not enough fat in stock';
                    console.log('Error: not enough fat in stock');
                }
                else if (objProducts.carbohydrate < carbNeeded) {
                  //  return 'Error: not enough carbohydrate in stock';
                    console.log('Error: not enough carbohydrate in stock');
                } else {
                    //namaliavam stoynostta
                    objProducts.protein -= proteinNeeded;
                    objProducts.flavour -= flavNeeded;
                    objProducts.fat -= fatNeeded;
                    objProducts.carbohydrate -= carbNeeded;
                  //  return 'Success';
                    console.log('Success');
                }
            }
       }

    }

};
solution = solution();
solution('restock carbohydrate 10');
solution('restock flavour 10');
solution('prepare apple 1');
solution('restock fat 10');
solution('prepare burger 1');
solution('report');

//solution('restock carbohydrate 10');