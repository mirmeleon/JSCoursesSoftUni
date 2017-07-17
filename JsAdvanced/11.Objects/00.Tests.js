
class Circle{
    constructor(radius){
        this.radius = radius; //taka ctora vika niakva funkcia det pravi validacia
    }
    get radius(){
        return this._radius;
    }

    set radius(radius){ //ey tazi func ia vika ctora
        if(radius <= 0){
            throw new RangeError('Radius must be positive');
        }
        this._radius = radius;
    }

   get diameter(){
        return this.radius*2;
    }

  set diameter(diameter){

       return this.radius = diameter /2;
  }
    get area() {
       return this.radius ** 2* Math.PI;
    }
}

let cir = new Circle(5);
console.log(cir.radius);
console.log(cir.diametur);
console.log(cir.area);
cir.diameter = -1;