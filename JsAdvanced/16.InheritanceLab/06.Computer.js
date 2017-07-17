function solve(){

    class Keyboard {
        constructor(manufacturer, responseTime){

            this.manufacturer = manufacturer;
            this.responseTime = Number(responseTime);
        }
    }

    class Monitor{
        constructor(manufacturer,width, height){
            this.manufacturer = manufacturer;
            this.width = Number(width);
            this.height = Number(height);

        }
    }

    class Battery{
        constructor(manufacturer, expectedLife){
            this.manufacturer = manufacturer;
            this.expectedLife = Number(expectedLife);
        }
    }

    class Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace){
            if(new.target === Computer){
                throw new Error;
            }
            this.manufacturer = manufacturer;
            this.processorSpeed = Number(processorSpeed);
            this.ram = Number(ram);
            this.hardDiskSpace = Number(hardDiskSpace);
        }
    }

    class Laptop extends Computer{
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = Number(weight);
            this.color = color;
            this.battery = battery;

        }

        get battery(){
            return this._battery;
        }

        set battery(battery){
            if(battery instanceof Battery){
                this._battery = battery ;
            } else {
                throw new TypeError;

            }

        }
    }

    class Desktop extends Computer{

        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor){
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(keyboard) {
            if(keyboard instanceof Keyboard){

                this._keyboard = keyboard;
            } else {
                throw new TypeError;
            }

        }

        get monitor() {
            return this._monitor;
        }

        set monitor(monitor) {
            if (monitor instanceof Monitor){
                this._monitor = monitor;
            } else {

                throw new TypeError;
            }


        }
    }

    return {
        Keyboard,
        Monitor,
        Battery,
        Computer,
        Laptop,
        Desktop

    }
}

