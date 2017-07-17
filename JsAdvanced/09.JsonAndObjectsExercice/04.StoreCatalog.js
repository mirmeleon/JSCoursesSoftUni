function store(arr){
    "use strict";
    let prodMap = new Map();
    for(let i = 0; i < arr.length; i++){
        let splitted = arr[i].split(/\s:\s/g);
        let product = splitted[0];
        let price = Number(splitted[1]);
        let startLetter =  product[0];
        //console.log(product);
        //console.log(price);
       // console.log(product[0]);
        if(!prodMap.has(startLetter)){
           prodMap.set(startLetter, new Map());
           prodMap.get(startLetter).set(product, price);
            // console.log(prodMap);
        } else {
            //ako go niama produkta/klucha mu setvame value price
            if(!prodMap.get(startLetter).has(product)){
                prodMap.get(startLetter).set(product, price);
            }
            //eventualno ako v uslovieto ima da se updatne valueto

        }
    }

   // console.log(prodMap);


    //sortirane
    let prodMapArr = [...prodMap.entries()].sort(mySort);

    function mySort(a,b){

          return a[0].localeCompare(b[0]);

    }

    //printirane i sortirane na vutreshnia map
    for(let [letter, products] of prodMapArr){
        console.log(letter);
        let sortedProducts = [...products.entries()].sort(mySort);
        //i tuk veche minavame po sortiranite produkti
        for(let [product, price] of sortedProducts){
            console.log(`  ${product}: ${price}`);
        }
    }
}

store([
'Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10'
]);
