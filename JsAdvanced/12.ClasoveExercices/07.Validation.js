class CheckingAccount{
    constructor(clientId, email, firstName, lastName ){
        this.clientId =  clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;

        this.products = [];
    }

    get clientId(){
      return this._clientId;
    }
    set clientId(clientId){
        let pattern = /\b[0-9]{6}\b/g;

        if(!pattern.test(clientId)){
         throw new TypeError('Client ID must be a 6-digit number');
        }
        this._clientId = clientId;
    }

    get email(){
        return this._email;
    }

    set email(email){
        let pat = /^[a-zA-z]+@[a-zA-Z\\.]+$/gm;
        if(!pat.test(email)){
            throw new TypeError('Invalid e-mail');
        }
        this._email = email;
    }

    get firstName(){
        return this._firstName;
    }
    set firstName(firstName){
        let pat = /^.{3,20}$/g;
        let patInvalidChars =/^[A-Za-z]+$/g;

        if(!pat.test(firstName)){
            throw new TypeError('First name must be between 3 and 20 characters long');
        }

        if(!patInvalidChars.test(firstName)){
            throw new TypeError('First name must contain only Latin characters');
        }

      this._firstName = firstName;
    }

    get lastName(){
        return this._lastName;
    }
    set lastName(lastName){
        let pat = /^.{3,20}$/g;
        let patInvalidChars =/^[A-Za-z]+$/g

           if(!pat.test(lastName)){
            throw new TypeError('Last name must be between 3 and 20 characters long');
        }

        if(!patInvalidChars.test(lastName)){
            throw new TypeError('Last name must contain only Latin characters');
        }

        this._lastName = lastName;
    }
}

//let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');
//let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov');
//let acc = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov');
let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');
