let myModule = (() => {
    let Suits = {
        SPADES:'♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS:'♣'
    };


class Card {
    constructor(face, suit){
        this.suit = suit;
        this.face = face;
    }

    get face() {
      return this._face;
    }

    set face(value) {
        if(!Card.validFaces.includes(value)){
            throw new Error('Invalid face');
        }
        this._face = value;
    }
   get suit(){
        return this._suit;
   }
   set suit(value){
       if(!Object.keys(Suits).map(k=>Suits[k]).includes(value)){
           throw new Error('invalid suit')
       }
        this._suit = value;
   }
    toString(){
        return this.face + this.suit;
    }

    static get validFaces(){
        return Card._validFaces;
    }
}
//zakachame gi izvun definiciata na klasa
    Card._validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

return {Suits, Card};
})();

let c1 = new myModule.Card('Q', myModule.Suits.SPADES);
console.log('' + c1);