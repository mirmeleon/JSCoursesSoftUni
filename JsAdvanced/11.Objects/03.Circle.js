class Circle {
    constructor(radius){
        this.radius = radius;
    }

    get diameter(){
       return 2*this.radius;
    }
    set diameter(diameter){
        this.radius = diameter/2;
    }

    get area(){
        return Math.PI * this.radius * this.radius;
    }
}

let c1 = new Circle(2);
console.log(c1.radius); //2
console.log(c1.diameter);//4
console.log(c1.area);//12.566