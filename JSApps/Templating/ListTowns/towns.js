function atachEvents(){

    $('#btnLoadTowns').click(loadTowns);

          let sourceOfHtml = $('#towns-template').html();
          let template = Handlebars.compile(sourceOfHtml);

          function loadTowns(){
              $('#root').empty();
              let container = $('#root');
              let ul = $('<ul>');
              container.append(ul);


              let towns = $('#towns').val().split(/\s*,/g);

              for(let town of towns){

                  let li = template({name: town});
                  ul.append(li);

              }

          }


}