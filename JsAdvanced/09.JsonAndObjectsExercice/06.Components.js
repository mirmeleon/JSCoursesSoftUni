function comp(arr){
    "use strict";
    let siteMap = new Map();
    for(let val of arr){
        let splitted = val.split(/\s\|\s/g);
        let systemName = splitted[0];
        let compName = splitted[1];
        let subComName = splitted[2];

        if(!siteMap.has(systemName)){
            siteMap.set(systemName, new Map());

        }
            //ako niama compName, ama pravim i masiv, za da narejdame mnogo kluchove
        if(!siteMap.get(systemName).has(compName)){
                siteMap.get(systemName).set(compName, []);
          }
          //vkarvame si valuto v masiva
        siteMap.get(systemName).get(compName).push(subComName);


    }//end for

    //sortirane na 1via map
    let siteMapSorted =  [...siteMap.keys()].sort((a,b) => sortSystems(a,b));

    //otpechatvane
    for(let sys of siteMapSorted){
        console.log(sys);
        //sortirane na 2ria map
        let componentsSorted = [...siteMap.get(sys).keys()].sort((c1,c2) => sortComponents(sys, c1,c2));
        for(let com of componentsSorted){
            console.log(`|||${com}`);
            siteMap.get(sys).get(com).forEach(sc => console.log(`||||||${sc}`));
        }
    }

    function sortSystems(a,b){
        let aSize = siteMap.get(a).size;
        let bSize = siteMap.get(b).size;
        if(aSize !== bSize){
            return bSize - aSize;
        } else {
            return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
        }
    }

    function sortComponents(system, c1, c2){
        return siteMap.get(system).get(c2).length - siteMap.get(system).get(c1).length;
    }
}

comp([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'

]);