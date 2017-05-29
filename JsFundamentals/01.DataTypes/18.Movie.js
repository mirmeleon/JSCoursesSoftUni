function movie(arr){
    "use strict";
    let title = arr[0].toLowerCase();
    let day = arr[1].toLowerCase();
    let price = 0;
    if(title === "the godfather"){

        switch(day.toLowerCase()){
            case 'monday':
                console.log(price += 12);
                break;
            case 'tuesday':
                console.log(price += 10);
                break;
            case 'wednesday':
                console.log(price += 15);
                break;
            case 'thursday':
                console.log(price += 12.50);
                break;
            case 'friday':
                console.log(price += 15);
                break;
            case 'saturday':
                console.log(price += 25);
                break;
            case 'sunday':
                console.log(price += 30);
                break;
            default:
                price = 0;
                console.log("error");
                break;
        }

    } else if(title === "schindler's list"){
        switch(day.toLowerCase()){
            case 'monday':
                console.log(price += 8.50);
                break;
            case 'tuesday':
                console.log(price += 8.50);
                break;
            case 'wednesday':
                console.log(price += 8.50);
                break;
            case 'thursday':
                console.log(price += 8.50);
                break;
            case 'friday':
                console.log(price += 8.50);
                break;
            case 'saturday':
                console.log(price += 15);
                break;
            case 'sunday':
                console.log(price += 15);
                break;
            default:
                price = 0;
                console.log("error");
                break;
        }

    } else if(title === "casablanca"){
        switch(day.toLowerCase()){
            case 'monday':
                console.log(price += 8);
                break;
            case 'tuesday':
                console.log(price += 8);
                break;
            case 'wednesday':
                console.log(price += 8);
                break;
            case 'thursday':
                console.log(price += 8);
                break;
            case 'friday':
                console.log(price += 8);
                break;
            case 'saturday':
                console.log(price += 10);
                break;
            case 'sunday':
                console.log(price += 10);
                break;
            default:
                price = 0;
                console.log("error");
                break;
        }

    } else if(title === "the wizard of oz"){

        switch(day.toLowerCase()){
            case 'monday':
                console.log(price += 10);
                break;
            case 'tuesday':
                console.log(price += 10);
                break;
            case 'wednesday':
                console.log(price += 10);
                break;
            case 'thursday':
                console.log(price += 10);
                break;
            case 'friday':
                console.log(price += 10);
                break;
            case 'saturday':
                console.log(price += 15);
                break;
            case 'sunday':
                console.log(price += 15);
                break;
            default:
                price = 0;
                console.log("error");
                break;
        }

    } else {
        console.log("error");
    }
}

movie(["The Godfather", "Friday"]);