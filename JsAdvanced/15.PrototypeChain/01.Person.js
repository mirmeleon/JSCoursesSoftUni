function personAndTeacher (){
    class Person{
        constructor (name, email){
            this.name = name;
            this.email = email;
        }

        toString(){
            let className = this.constructor.name;
            return `${className}(name:${this.name}, email:${this.email})`;
        }
    }

    class Teacher extends Person{
        constructor(teacherName, teacherEmail, subject){
            super(teacherName, teacherEmail);
            this.subject = subject;
        }
    }

    return {
        Person,
        Teacher
    }
}

