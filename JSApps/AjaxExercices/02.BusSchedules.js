let result = (function solve(){
  let currentId = 'depot';
  let oldName = '';

    function depart(){
        let getRequest = {
            method: 'GET',
            url:`https://judgetests.firebaseio.com/schedule/${currentId}.json `,
            success: departBus,
            error: displayError
        };
      $.ajax(getRequest);
    }

    function arrive(){

        $('#info').find('span').text(`Arriving at ${oldName}`);
        $('#arrive').attr('disabled', true);
        $('#depart').attr('disabled', false);
    }

    function departBus(stopInfo){
      //  console.log(stopInfo);
       $('#info').find('span').text(`Next stop ${stopInfo.name}`);
        currentId = stopInfo.next;
      $('#arrive').attr('disabled', false);
      $('#depart').attr('disabled', true);
      oldName = stopInfo.name;
    }


    function  displayError(er){
        $('#info').find('span').text(`Error`);
        $('#arrive').attr('disabled', true);
        $('#depart').attr('disabled', true);
    }

    return {
        depart,
        arrive
    }

})();
