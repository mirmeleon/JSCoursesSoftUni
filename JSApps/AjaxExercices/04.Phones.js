function attachEvents(){
    $('#btnLoad').click(callPpl);
    $('#btnCreate').click(createContact);

      function callPpl(){
          $('#phonebook').empty();
          let basicUrl = 'https://phonebook-59954.firebaseio.com/phonebook.json';
          let reqMethod = {
              method: 'GET',
              url: basicUrl,
              success: loadAll,
              catch: displayError
          };
          $.ajax(reqMethod);
      }

      function loadAll(pplInfo){
         // $('#phonebook').empty();
          let ul = $('#phonebook');


          for(let ppl in pplInfo){
              //console.log(ppl);
              let li =  $('<li>');
              li.text(`${pplInfo[ppl]['person']}: ${pplInfo[ppl]['phone']}`);
              ul.append(li);

              //1vi nachin s bind
              // li.append($('<button>Delete</button>')
              //     .click(removePerson.bind(this, ppl)));
              li.append($('<button>Delete</button>')
                  .click(() => removePerson(ppl)));
          }

       }

    function removePerson(ppl){

        let basicUrl = `https://phonebook-59954.firebaseio.com/phonebook/`;

        let reqMethod = {
            method: 'DELETE',
            url: basicUrl + ppl +`.json`,
            catch: displayError
        };

        $.ajax(reqMethod)
            .then(callPpl)
            .catch(displayError);
    }


      function createContact(){
         let person = $('#person').val();
         let phone = $('#phone').val();
          let basicUrl = 'https://phonebook-59954.firebaseio.com/phonebook.json';
          let newPerson = {
              "person": person,
              "phone": phone
          };
         let reqMethod = {
             method: 'POST',
             url: basicUrl,
             data: JSON.stringify(newPerson),
             success: callPpl,
             catch: displayError
         };
         $.ajax(reqMethod);

          $('#person').val('');
          $('#phone').val('');

      }

      function displayError(err){
     $('#phonebook').append($('<li>Error</li>'));

      }
}