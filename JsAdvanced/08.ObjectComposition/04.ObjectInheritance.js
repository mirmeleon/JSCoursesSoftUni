function pr(arr){
 let inheritor = (function () {
        let objects = new Map();

        function create(name, param, parent){
            if(param) inherit(name, parent);
            else objects.set(name, {});
        }

        function inherit(name, parent ){

            objects.set(name, Object.create(objects.get(parent)));

        }

        function set(objName, propName, value ){

            objects.get(objName)[propName] = value;
        }

        function print(name){

            let current = objects.get(name);
            let props=[];
            for(let prop in current){
                props.push(`${prop}:${current[prop]}`);
            }
            console.log(props.join(', '));
        }

        return {
            create, print, inherit, set
        }
    })();

    for(let cmd of arr){
        let [command, name, param, value] = cmd.split(' ');
        inheritor[command](name, param, value)
    }

}


