function solve(col){
    return {
        list:[],
        size: 0,
        add: function(n){
            this.list.push(n);
            this.sort();
            this.size++;
        },
        remove:function(ind){
             if(ind >= 0 && ind < this.list.length){
                 this.list.splice(ind,1);
                 this.size--;
            }

        },
        get: function (ind){
            if (ind >= 0 && ind < this.list.length) {
                return this.list[ind];
            }
        },
        sort: function (){
            "use strict";
            this.list.sort((a,b) =>a-b);
        }

    };

}

let l = solve([1,3,4]);

console.log();
