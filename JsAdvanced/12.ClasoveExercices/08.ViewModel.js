class Textbox{
    constructor(selector, regex){
        this._elements = $(selector);
        this._value = $(this._elements[0]).val(); //hubavo e ot 0 shtoto moje i da niama 2ri el
        this._invalidSymbols = regex;
        this.onInput();
    }

    get value(){
        return this._value;
    }
    set value(value){
        this._value = value;
        //ot tuk promeniame vkaranata v inouta stoynost
        for(let el of this.elements){
            $(el).val(value);
        }
    }
    get elements(){
        //return this._elements.includes(selector);
        return this._elements;
    }

    isValid(){
      return !this._invalidSymbols.test(this.value);
    }

    onInput(){
        //1.25
        //tuka ne mojem da polzvame this shtoto shte vikne tva det idva ot klasa, a nie iskame valueto det idva ot tuy
        // det pishem v input poleto
        //za tuy polzvame arrow function (tia ne pazi context). a ne normalnata function zapochvashta s dumata fnction
        this.elements.on('input', (event) => {
            //kastvame go kum $ shtoto ne sme sigurni dali shte e jquery element;
            let text = $(event.target).val(); //event.target ni zima napisanoto value
            this.value = text;
        });
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input',function(){console.log(textbox.value);});
