class Rat{
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }
    unite(otherRat){

        if(otherRat instanceof Rat)
        this.unitedRats.push(otherRat);

    }

    getRats(){
        return this.unitedRats;
    }

    toString(){
        console.log(`${this.name}`);
        console.log(this.unitedRats.map(r => `##${r.name}`).join('\n'));
    }
}

let rar = new Rat('Pesho');
rar.unite(new Rat('Mareto'));
console.log(''+rar);
console.log(rar.getRats());