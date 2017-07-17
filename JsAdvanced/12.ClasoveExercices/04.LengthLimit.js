class Stringer{
    constructor(innerString, innerlLength){
        this.innerString = innerString;
        this.innerLength = innerlLength;
    }

    increase(val){
        return this.innerLength +=val;
    }

    decrease(val){
        if((this.innerLength-val)<=0){
          return  this.innerLength = 0;
        }
        return this.innerLength -= val;
    }

    toString(){
        if(this.innerString.length > this.innerLength){
           return this.innerString.substr(0,this.innerLength) + '...';
        } else if(this.innerLength === 0){
            return '...';
        }

        return this.innerString;
    }
}

let t = new Stringer('Test',5);
console.log('' + t);
t.decrease(3);
console.log(t.toString());
t.decrease(5);
console.log(t.toString());
t.increase(4);
console.log(t.toString());