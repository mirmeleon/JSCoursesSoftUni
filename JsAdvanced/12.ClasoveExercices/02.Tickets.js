function getTickers(arrDescription, criteria){

    class Ticket {
        constructor(destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let tickets = [];

    for(let i = 0; i < arrDescription.length; i++){
        let tokens = arrDescription[i].split('|');
        let ticket = new Ticket(tokens[0], tokens[1], tokens[2]);
        tickets.push(ticket);
    }


    if(criteria === 'destination'){
        return tickets.sort((t1,t2) => t1.destination.localeCompare(t2.destination));
    } else if(criteria === 'price'){
        return tickets.sort((t1,t2) => t1.price - t2.price);
    } else {
        return tickets.sort((t1,t2) => t1.status.localeCompare(t2.status));
    }

}

console.log(getTickers([
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
        'destination'
));