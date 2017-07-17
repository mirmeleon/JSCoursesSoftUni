class Person{
    constructor (name, email){
        this.name = name;
        this.email = email;
    }

    toString(){
       // let base = super.toString().slice(0,-1);
        let className = this.constructor.name;
        return `${className}(name:${this.name}, email:${this.email})`;
    }
}

class Teacher extends Person {
    constructor(name, email, saying, subject){
        super(name, email);
        this.saying = saying;
        this.subject = subject;
    }

    toString() {
        let base = super.toString().slice(0, -1);
        return `${base}, subject:${this.subject})`;
    }
}

class Student extends Person{
    constructor(name, email, saying, course){
        super(name, email, saying);
        this.course = course;
    }
}

let person = new Person('marcheto', 'maria@abv.bg', 'hi');
let teacher = new Teacher('ivan', 'ivan@email.cx', 'c# 4ever!', 'History');
let student = new Student('peho', 'pesho@mail.sf', 'i like it', 'JS');


Person.prototype.species = 'Human';
Person.prototype.toSpeciesString = function(){
    return `I am a ${this.species}.${this.toString()}`;

};

function extendProto(baseClass){
    baseClass.prototype.species = 'Human';
    baseClass.prototype.toSpeciesString = function(){
        return `I am a ${this.species}. ${this.toString()}`

    };
}

