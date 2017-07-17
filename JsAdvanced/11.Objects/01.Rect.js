class Rectangle {
    constructor(width, height, color){
        this.width = width ||1;
        this.height = height||1;
        this.color = color;
    }

    calcArea(){
        return this.width * this.height;
    }
}

let r = new Rectangle(20, 30, 'red');
console.log(r.w);
console.log(r.h);
console.log(r.c);
console.log(r.calcArea());