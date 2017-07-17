// let s =(function () {
//     let word = '';
//    function add(w){return word += w + ' ';}
//    function remove(w){return word;}
//    function print(){return console.log(word);}
//
//    return {add, remove, print};
//
// })();
//
// s.add('deni');
// s.add('e cool');
// s.print();
function solve(arrComm){
    let sol = (function(){
        let list = [];
        function add(st){
            list.push(st);
        }

        function remove(st){
            "use strict";
            list = list.filter(e => e !== st);
        }

        function print(){
            "use strict";
            console.log(list.toString());
        }

        return {add, print, remove}
    })();

    for(let comand of arrComm){
      let tokens = comand.split(' ');
      sol[tokens[0]](tokens[1]);
    }
}

