class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static distance(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
}

let p1 = new Point(1,3);
let p2 = new Point(3,3);
console.log(Point.distance(p1, p2));