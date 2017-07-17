

function pAndT (){
    class Person{
        constructor(name, email){
            this.name = name;
            this.email = email;
        }
    }

    class Teacher extends Person{
        constructor(name, email, subj){
            super();
            this.subj = subj;
        }
    }

    return {
        Person,
        Teacher
    }

}

class Person {
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    toString(){
        return `Person (name:${this.name}, email:${this.email})`;
    }
}

class Teacher extends Person {
    constructor(name, email, subj){
        super(name, email);
        this.subj = subj;
    }
    toString(){
        return `${this.constructor.name} (name:${this.name}, email:${this.email}, subject ${this.subj})`;
    }
}

class Student extends Person{
    constructor(name, email, course){
        super(name, email);
        this.course = course;
    }

    toString(){
        return `Student (name:${this.name}, email:${this.email}, course ${this.course})`;
    }
}

let t = new Teacher('mesho','mesho@pesho.com','Meshematika');
console.log('' + t);
console.log();
// class Circle{
//     constructor(r){
//         this.radius = r;
//     }
// }
//
// let ci = new Circle(5);
//
// function asCircle(){
//
//     this.area = function(){ //ey na tva this
//         return this.radius**2 * Math.PI;
//
//     };
//     return this;
// }
//
// asCircle.call(Circle.prototype);