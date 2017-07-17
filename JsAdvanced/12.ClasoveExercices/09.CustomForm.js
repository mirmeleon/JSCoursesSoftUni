(function(){
    class Textbox {
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
            //ot tuk promeniame vkaranata v input poleto stoynost
            //when vvalue changes so do the elements
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

            this.elements.on('input', (event) => {
                //kastvame go kum $ shtoto ne sme sigurni dali shte e jquery element;
                let text = $(event.target).val(); //event.target ni zima napisanoto value
                this._value = text;
                for(let el of this._elements){
                    $(el).val(text);
                }
            });
        }
    }

    class Form{
        constructor(){
            this._element = $('<div>').addClass('form'); //div with class form
           //zimame gi ot arguments shtoto mogat da ni se podadat bezbroy mnogo textboxsove ot ctora
            this.textboxes = arguments;
        }

        get textboxes(){
            return this._textboxes;

        }

        set textboxes(args){
            for(let argument of args){
                if(!argument instanceof Textbox){
                    throw new Error('The give parameter is not a textbox!');
                }
            }

            this._textboxes = args;
            for(let textbox of this._textboxes){
                for(let el of textbox._elements){
                    this._element.append($(el));
                }
            }
        }

        submit(){
            let allValid = true;
            for(let textbox of this._textboxes){
                if(textbox.isValid()){
                    for(let el of textbox._elements){
                        $(el).css('border', '2px solid green');
                    }
                } else {
                    for(let el of textbox._elements){
                        $(el).css('border', '2px solid red');
                    }
                    allValid = false;
                }

                return allValid;
            }
        }

        attach(selector){
            $(selector).append(this._element);
        }


    }

    return {
        Textbox: Textbox,
        Form: Form
    }

})();