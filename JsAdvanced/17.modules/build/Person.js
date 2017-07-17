// class Person{
//     constructor(name){
//         this.name = name;
//     }
//
//     toString(){
//         return `I'm ${this.name}`;
//     }
// }
//
// module.exports = Person;
let Entity = require('./entity');
let Dog = require('./dog');

class Person extends Entity {
    constructor(name, phrase, dog) {
        super(name);
        this.phrase = phrase;
        this.dog = dog;
    }

    saySomething() {
        return `${this.name} says: ${this.phrase}${this.dog.name} barks!`;
    }
}

module.exports = Person;
//# sourceMappingURL=Person.js.map