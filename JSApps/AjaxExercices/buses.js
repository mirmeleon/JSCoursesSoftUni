function getInfo() {
    let stopId = $('#stopId').val();
    let servBaseUri = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
   //1 nachin
    $.get(servBaseUri)
        .then(displayBusStopInfo)
        .catch(displayError);


    function displayBusStopInfo(busStopInfo){
     // console.log(busStopInfo) //izpisva na consolata kakvo ni sudurja responsa ot servera
         $('#stopName').text(busStopInfo.name);

        let list = $('#buses');
            list.empty(); //izchistvame si lista pri vsiako vikane, za da ne se natrupva rezultata

        for(let busNumb in busStopInfo.buses){
            let busMins = busStopInfo.buses[busNumb];
            let li = $('<li>').text(`Bus ${busNumb} arrives in ${busMins} minutes`);

            list.append(li);
        }

    }

    function displayError(err){
     //console.dir(err); //zimame info za greshkata
        $('#stopName').text("Error");
    }
}
