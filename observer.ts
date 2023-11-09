interface observer{
    update(temp: number):void;
}
interface subject{
    suscribe(o: observer): void;
    unsubscribe(o: observer): void;
    notify(): void;
}
class weatherStation implements subject{
    private observers: observer[] = [];
    private temp!: number;

    suscribe(o: observer): void{
        this.observers.push(o);
    }
    unsubscribe(o: observer): void {
        this.observers = this.observers.filter((obj)=> obj !==o);
        
    }
    notify(): void {
        for (const observer of this.observers){
            observer.update(this.temp);
        }
    }
    setTemp(temp: number): void{
        this.temp = temp;
        this.notify();
    }
        
}
class weatherDisplay implements observer{
    private temp!: number;
    private name: string;

    constructor(name: string){
        this.name = name;
    }
    update(temp: number): void {
        this.temp = temp;
        console.log(`${this.name}: ${this.temp} °C`);
    }
}
const subject = new weatherStation();

const observador1 = new weatherDisplay("Display 1")
const observador2 = new weatherDisplay("Display 2")
const observador3 = new weatherDisplay("Display 3")

subject.suscribe(observador1);
subject.suscribe(observador2);
subject.suscribe(observador3);

subject.setTemp(30);

