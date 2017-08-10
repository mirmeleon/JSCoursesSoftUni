$(() => {
    renderCatTemplate();

    function renderCatTemplate() {

        $('.btn').click(loadCats);

        function loadCats(){
          //  console.log('loaded');
            $('#allCats').empty();
            let sourceOfHtml = $('#cat-template').html();
           let template = Handlebars.compile(sourceOfHtml);
          let container = $('#allCats');

           let cats = window.cats;
           for(let cat of cats){

             $(`#${cat.id}`).css('display', 'inline-block');

              let kitty = template({
                   code:cat.statusCode,
                   statusMsg: cat.statusMessage,
                   id: cat.id
               });
              container.append(kitty);
            }

        }
    }


});
