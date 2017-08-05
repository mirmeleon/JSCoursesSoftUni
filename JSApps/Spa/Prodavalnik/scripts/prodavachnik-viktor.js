function startApp(){

    //vnimanie tuy reshenie ne e  pulno
   const adsDiv =  $('#ads');


    $('#header').find('a').show();

    $('#linkHome').click(() => showView('home'));
    $('#linkLogin').click(() => showView('login'));
    $('#linkRegister').click(() => showView('register'));
    $('#linkListAds').click(() => showView('listAdds'));
    $('#linkCreateAd').click(() => showView('create'));
    $('#linkEditAd').click(() => showView('edit'));  //tva e edit po-kusno da mu vidia idto napravia
    $('#linkLogout').click(logout);


    function showView(name){
        $('section').hide();

        switch(name){
            case 'home': $('#viewHome').show(); break;
            case 'login': $('#viewLogin').show(); break;
            case 'register': $('#viewRegister').show(); break;
            case 'listAdds':
                $('#viewAds').show();
                getAds();
                break;
            case 'create': $('#viewCreateAd').show(); break;
            case 'edit': $('#viewEditAd').show(); break;
            case 'details':$('#viewDetailsAd').show(); break;

        }
    } //taia mu e kat moiata




    //CRUD
   let requester = (() => {

       const baseUrl = 'https://baas.kinvey.com/';
       const appKey = 'kid_HJ-leh-vb';
       const appSecret = '7fed1499535f4bb6a8fef157ff031112';

       function makeAuth(type){
           if(auth === 'basic') return 'Basic ' + btoa(appKey + ':' + appSecret)
           else return 'Kinvey ' + localStorage.getItem(authToken);
       }

       function makeRequest(method, module, url, auth){
           return req = {
               url: baseUrl + module + '/' + appKey + '/' + url,
               method: method,
               headers: {
                   'Authorization': makeAuth(auth)
               }
           }

       }

       function get(module, url, auth){

           return $.ajax(makeRequest('GET', module, url, auth));
       }

       function post(module, url, data, auth){
           let req = makeRequest('POST', module, url, auth);
           req.data = JSON.stringify(data);
           req.headers['Content-Type'] = 'application/json';
           return $.ajax(req);
       }

       function update(module, url, data, auth){
           let req = makeRequest('PUT', module, url, auth);
           req.data = JSON.stringify(data);
           return $.ajax(req);
       }


       function remove(module, url,  auth){
           return $.ajax(makeRequest('DELETE', module, url, auth));

       }

       return {
           //1vite 2 ne gi vruhtame shtoto gi izpolzvame samo vutre v requestera
           get, post, update, remove
       }
   })();

    //USERS
    async function register(){
      let form = $('#formRegister');
      let username = form.find('input[name="username"]').val();
      let password = form.find('input[name="passwd"]').val();

      try{
          let data = await requester.post('user', '', {username, password}, 'basic')
          saveSession(data);
          showView('ads');

      } catch (err){
          handleError(err);
      }

    }

    async function logout(){

        try{
            let data = await requester.post('user', '_logout', {authToken: localStorage.getItem('authToken')});
           localStorage.clear();
           userLoggedOut();
            showView('home');

        } catch (err){
           handleError(err);
        }

    }

    //ADS
    async function loadAds(){
      let data = await requester.get('appdata','ads');

      adsDiv.empty();

      if(data.length === 0){
             adsDiv.append("<p>No ads in db</p>");
             return;
      }

      for(let ad of data){
         let html = $('<div>');
         html.addClass('ad-box');
         let title = $(`<div class="ad-title">${ad.title}</div>`);

         let deleteBtn = $('<button>&#10006;</button>').click(() => deleteAd(ad._id));
        deleteBtn.addClass('ad-control');
        deleteBtn.appendTo(title);

          let editBtn = $('<button>&#9998;</button>').click(() => openEditAd(ad));
          editBtn.addClass('ad-control');
          editBtn.appendTo(title);

         html.append(`<div class="ad-title">${ad.title}</div>`);
          html.append(`<div><img src="${ad.imageUrl}"></div>`);
          html.append(`<div>By ${ad.publisher} Price: ${ad.price.toFixed(2)}<</div>`);

          adsDiv.append(html);
      }
    }

    async function deleteAd(id){

       await requester.remove('appdata', 'posts/' + id);
       showInfo('Ad deleted!');
       showView('ads');
    }

     function openEditAd(ad){


        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);
        form.find('input[name="description"]').val(ad.description);
         form.find('input[name="price"]').val(Number(ad.price));
         form.find('input[name="image"]').val(ad.imageUrl);



         let date = ad.date;
         let publisher = ad.publisher;

         form.find('#buttonEditAd').click(() => editAd(date, publisher));
         showView('edit');
    }

    async function editAd(date, publisher){

    }

}
