function attachEvents(){
   $('#refresh').click(attachRefresh);
    $('#submit').click(attachSend);

    function attachSend(){
        let obj = {
            "author": $('#author').val(),
            "content": $('#content').val(),
            "timestamp": Date.now()

        };

       let reqMethod = {
           url: `https://messanger-c124d.firebaseio.com/.json`,
           method: 'POST',
           data: JSON.stringify(obj),
           success: attachRefresh,

       };
    $.ajax(reqMethod);

   }

    function attachRefresh(){

        $.get('https://messanger-c124d.firebaseio.com/.json')
            .then(loadData);
    }


    function loadData(messages){ //dismsgs

        let output =  $('#messages');
        output.empty();
        let msgsStr = '';
        for(let key in messages){
            msgsStr += `${messages[key]['author']}: ${messages[key]["content"]}\n`;
        }
      output.text(msgsStr);

    }


}
