function solve(){

    class Person {
        constructor(name, email){
            this.name = name;
            this.email = email;
        }

        toString(){
            return `Person (name: ${this.name}, email: ${this.email})`;
        }
    }

    class Teacher extends Person {
        constructor(name, email, subj){
            super(name, email);
            this.subj = subj;
        }
        toString(){
            return `${this.constructor.name} (name: ${this.name}, email: ${this.email}, subject: ${this.subj})`;
        }
    }

    class Student extends Person{
        constructor(name, email, course){
            super(name, email);
            this.course = course;
        }

        toString(){
            return `Student (name: ${this.name}, email: ${this.email}, course: ${this.course})`;
        }
    }
    return {
        Person, Teacher, Student
    }
}



let per = new Person('deni', 'd@abv.bg');
let t = new Teacher("Gosho",'gosh@gosh.com',"Graphics");
console.log(''+ t);
//console.log(per.__proto__);
//console.log(Object.getPrototypeOf(per));