let myArr = [1,2,3];
(function solve(){
    Array.prototype.last = function (){
        return this[this.length-1];
    };

    Array.prototype.skip = function(n){
        "use strict";
        let res = [];
        for(let i = n; i < this.length; i++){
            res.push(this[i]);
        }
        return res;
    };

    Array.prototype.take = function(n){
        let result = [];
        for(let i = 0; i < n; i++){
            result.push(this[i]);
        }
        return result;
    };

    Array.prototype.sum = function(){
        "use strict";
        let sum = 0;
        for(let i = 0; i < this.length; i ++){
            sum += this[i];
        }
        return sum;
    };

    Array.prototype.average = function(){


        let sum = this.sum();

        let avg = Math.trunc(sum/this.length);
        return avg;
    };

})();

console.log(myArr.average());