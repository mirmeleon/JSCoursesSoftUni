function solve(){

    class Melon{
        constructor(weight, melonSort){
            if(new.target === Melon){
                throw new TypeError("Abstract class cannot be instantiated directly");
            }
            this.weight = Number(weight);
            this.melonSort = melonSort;
            this.element = "";
            this._elementIndex = this.weight*melonSort.length;
        }
        get elementIndex(){
            return this._elementIndex;
        }

        toString(){
            let res = `Element: ${this.element}\n`;
            res += `Sort: ${this.melonSort}\n`;
            res +=`Element Index: ${this._elementIndex}`;
            return res;
        }
    }

    class Watermelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = "Water";
        }

        toString(){
            return super.toString();//`Element: ${this.constructor.name}`;
        }
    }

    class Firemelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = "Fire";
        }

        toString(){
            return super.toString();//`Element: ${this.constructor.name}`;
        }
    }

    class Earthmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = "Earth";
        }

        toString(){
            return super.toString();//`Element: ${this.constructor.name}`;
        }
    }

    class Airmelon extends Melon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = "Air";
        }

        toString(){
            return super.toString();//`Element: ${this.constructor.name}`;
        }
    }

    class Melolemonmelon extends Airmelon{
        constructor(weight, melonSort){
            super(weight, melonSort);
            this.element = "Water";
            this.elements = ['Fire', 'Earth', 'Air', 'Water'];
            this.ind = 0;
        }

        morph(){
            this.element = this.elements[this.ind++ %4];

        }

        toString(){
            return super.toString();
        }
    }

    return {
        Melon,
        Firemelon,
        Watermelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}





let st = new Melolemonmelon(14, 'Str');
st.morph();
console.log(st.toString());
