class Figure{
    constructor(){
        if(new.target === Figure){
            throw Error;
        }
    }

    toString(){
      let type = this.constructor.name;
      return type;
    }
    get area(){
        return undefined;
    }
}

class Circle extends Figure{
    constructor(radius){
        super();
        this.radius = radius;
    }

    get area(){
        return Math.PI *this.radius * this.radius;
    }

    toString(){
        return super.toString() + `-radius: ${this.radius}`
    }
}

class Ractangle extends Figure{
    constructor(w,h){
        super();
        this.w =w;
        this.h = h;
    }

    get area(){
        return this.w*this.h;
    }

    toString(){
        return super.toString() + `w:${this.w}, h: ${this.h} `
    }
}

