function  startApp(){

    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_HJ-leh-vb';
    const appSecret = '7fed1499535f4bb6a8fef157ff031112';


    //displaying elements

    $('#linkHome').show();
    $('#linkLogin').show();
    $('#linkRegister').show();

    //LINKS and BUTTONS

    $('#linkHome').click(() => showView('home'));
    $('#linkLogin').click(() => showView('login'));
    $('#linkRegister').click(() => showView('register'));
    $('#linkListAds').click(() => showView('listAdds'));
    $('#linkCreateAd').click(() => showView('create'));
    $('#linkLogout').click(logout);
    $('#buttonCreateAd').click(createAdd);
    $('#buttonRegisterUser').click(registerUser);
    $('#buttonLoginUser').click(login);


    function showView(name){
         $('section').hide();

          switch(name){
              case 'home': $('#viewHome').show(); break;
              case 'login':
                  $('#viewLogin').show();
                  $('#formLogin').trigger("reset");
                  break;
              case 'register':
                  $('#viewRegister').show();
                  $('#formRegister').trigger("reset");
                  break;
              case 'listAdds':
                  $('#viewAds').show();
                  getAds();
                  break;
              case 'create':
                  $('#viewCreateAd').show();
                  $('#formCreateAd').trigger("reset");
                  break;
              case 'edit': $('#viewEditAd').show(); break;
              case 'details':$('#viewDetailsAd').show(); break;

          }
      }


      //CRUD OPS

    function getAds(){
       // console.log('getting ads');
       const adsUrl = baseUrl + 'appdata/' + appKey + '/ads';

         let req = {
             url: adsUrl ,
             method: 'GET',
             headers: {
                 'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authtoken'),
             },
             success: loadAds,
             error: handleError
         };

         $.ajax(req);

    }

     function loadAds(ads){
       //  console.log('displayng ads');

         if(ads.length === 0){
           $('#titleForm').text('No ads to display!');
       } else {
           let adsTable = $('#ads').find('table');

           adsTable.empty();

           adsTable.append(
               '<th>Title</th>',
               '<th>Publisher</th>',
               '<th>Description</th>',
               '<th>Price</th>',
               '<th>Date Published</th>',
               '<th>Image</th>',
               '<th>Action</th>',

           );

          for(let row of ads){

              let deleteBtn = $('<a href="#">[Delete]</a>').click(() => deleteAd(row._id));
              let  editBtn = $('<a href="#">[Edit]</a>').click(() => openEditAd(row));


               let tr = $('<tr>');
                  tr.append(
                   $('<td>').text(row.title),
                   $('<td>').text(row.publisher),
                   $('<td>').text(row.description),
                   $('<td>').text(Number(row.price).toFixed(2)),
                   $('<td>').text(row.date),
                   $('<td>').text(row.imageUrl),
               );

               if(row._acl.creator === localStorage.getItem('userId')){
                   let td = $(`<td>`);
                   td.append(deleteBtn);
                   td.append(editBtn);

                   tr.append(td);
               }
                adsTable.append(tr);

           }
       }
   }

   function deleteAd(id){

       let req = {
           url: baseUrl + 'appdata/' + appKey + '/ads/' + id,
           method: 'DELETE',
           headers: {
               'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authtoken'),
               'Content-Type':'application/json'
        },
           success:  deletionSuccess,
           error: handleError

       };

       $.ajax(req);
        function deletionSuccess(){
         showView('listAdds');
         showInfo('Ad deleted!');
        }


     }

    function openEditAd(ad){
      //  console.log('edited');
        console.log(ad.publisher);
        console.log(ad.title);
        console.log(ad.price);

        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);

        form.find('textarea[name="description"]').val(ad.description);
        form.find('input[name="price"]').val(Number(ad.price));
        form.find('input[name="img"]').val(ad.imageUrl);


        let date = ad.date;
        let publisher = ad.publisher;
        let adId = ad._id;

        form.find('#buttonEditAd').click(() => editAd(date, publisher, adId));
        showView('edit'); //viewEditAd

    }

    function editAd(date, publisher, adId){

        let form = $('#formEditAd');
       let title = form.find('input[name="title"]').val();
        let description =  form.find('textarea[name="description"]').val();
       let price = form.find('input[name="price"]').val();
        let img = form.find('input[name="img"]').val();

        if($('#adTitle').val() === 0){
            handleError('Title should hava value!');
            return;
        }

        if(Number.isNaN($('#adPrice').val())){
            handleError('Price should havs value!');
            return;
        }


        let editedAdData = {
            publisher: publisher,
            date: date,
            title: title,
            description: description,
            price: price,
            imageUrl: img

        };

        let req = {
            url: baseUrl + 'appdata/' + appKey + '/ads/'+ adId,
            method: 'PUT',
            headers: {
                'Authorization':'Kinvey' + ' ' + localStorage.getItem('authtoken'),
                'Content-Type':'application/json'
            },
            data: JSON.stringify(editedAdData),
            success: editAddSuccess,
            error: handleError
        };

        $.ajax(req);

        function editAddSuccess(){
          //  console.log('created and edited');

            showView('listAdds');
            showInfo('Successfully edited adv!');
        }

    }


     function createAdd(event){

       //needed only if button is submit!
        // event.preventDefault();

         let userId = localStorage.getItem('userId');

         // const kinveyUserUrl = `${baseUrl}user/${appKey}/${userId}`;
         const kinveyUserUrl = `${baseUrl}user/${appKey}/_me`;


         let req = {
             url: kinveyUserUrl,
             method:'GET',
             headers: {
                 'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authtoken'), //localStorage.getItem('authtoken')
                 'Content-Type': 'application/json'
             },
             success: afterPublishingRequest,
             error: handleError
         };
         $.ajax(req);

          function afterPublishingRequest(data){
            //  console.log('entered in afterPublishing func ' + data.username);

              let date = (new Date()).toString('yyyy-MM-dd');

             if($('#adTitle').val() === 0){
                 handleError('Title should hava value!');
                 return;
             }

              if(Number.isNaN($('#adPrice').val())){
                  handleError('Price should havs value!');
                  return;
              }


              let advertData = {
                  publisher: data.username,
                  date: date,
                  title: $('#adTitle').val(),
                  description: $('#adDesc').val(),
                  price: $('#adPrice').val(),
                  imageUrl:$('#adImg').val()

              };

              let req = {
                  url: baseUrl + 'appdata/' + appKey + '/ads',
                  method: 'POST',
                  headers: {
                      'Authorization':'Kinvey' + ' ' + localStorage.getItem('authtoken'),
                      'Content-Type':'application/json'
                  },
                  data: JSON.stringify(advertData),
                  success: createAddSuccess,
                  error: handleError
              };

              $.ajax(req);

              function createAddSuccess(data){
                 // console.log('created');

                 showView('listAdds');
                  showInfo('Successfully created adv!');
              }
          }
     }

    //USER INTERACTIONS



    function registerUser(event){
    // console.log('attempt to reg');
          //event.preventDefault();

          let username = $('#newUsername').val();
          let password = $('#newPassword').val();

      //  console.log(username);
       // console.log(password);

        //niamam nujda ot tazi proverka shtoto sa required, ama da ima
        if(username === null || password === null){
            console.log('error');
            showError("Username/Password can't be empty!");
            return;
        }

        let req = {
              url: baseUrl + 'user/' + appKey,
              method: 'POST',
              headers: {
                'Authorization': 'Basic' + ' ' + btoa(appKey + ':' + appSecret),
                  'Content-Type': 'application/json'
              },
            data: JSON.stringify({
                username: username,
                password: password
            }),
              success: (data) => {
                  showInfo('Registration succesfull!');
                  setStorage(data)

              },
              error: handleError

          };

          $.ajax(req);

    } //end func register

    function login(event){

      // event.preventDefault();

        $('#linkListAds').show();
        $('#linkCreateAd').show();

       let username = $('#usernameLogin').val();
       let pass = $('#passwordLogin').val();


        let req = {
            url: baseUrl + 'user/' + appKey + '/' + 'login',
            method: 'POST',
            headers: {
                'Authorization': 'Basic' + ' ' + btoa(appKey+ ':' + appSecret),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: username,
                password: pass
            }),
            success: (data) => {

                showInfo("Logging successfull!");
                setStorage(data)
            },
            error: handleError

        };

        $.ajax(req);
    } //end login

    function logout(){

        let req = {
          url: baseUrl + 'user/' + appKey + '/_logout',
            method: 'POST',
            headers:{
                'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authtoken'),
            },
            success: logoutSuccess,
            error: handleError
      };

      $.ajax(req);

         function logoutSuccess(data){
             localStorage.clear();


             greetPerson();
             $('#linkRegister').show();
             $('#linkLogin').show();
             $('#linkCreateAd').hide();
             $('#linkListAds').hide();
             showView('home');
             showInfo('Successfully logged out!')
         }
    } //end logout

    function setStorage(data){
       // console.log(data);
       localStorage.setItem('authtoken', data._kmd.authtoken);
       localStorage.setItem('username', data.username);
       localStorage.setItem('userId', data._id);

       greetPerson();
       showView('home');
    }

    function greetPerson(){
       // console.log('setting greeting');
        $('.menu > span').show();

        $('#linkRegister').hide();
        $('#linkLogin').hide();


        let username = localStorage.getItem('username');

        if(username !== null){
            $('#loggedInUser').text('Hello, ' + username);
            $('#linkLogout').show();
        } else{
            $('#loggedInUser').text('');
            $('#linkLogout').hide();
        }


    }

    //NOTIFICATIONS

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').hide()
    });

    //hide when click over
    $('#infoBox').click((event) => $(event.target).hide());
    $('#errorBox').click((event) => $(event.target).hide());
    $('#loadingBox').click((event) => $(event.target).hide());

    function showInfo(msg){
        //console.log('infos!');
        let info = $('#infoBox');
      info.text(msg);
      info.show();

        setTimeout(() => info.fadeOut(), 3000);

    }
    //errors
    function handleError(er){

        showError(er.responseJSON.description);
    }

    function showError(msg){
       $('#errorBox').text(msg);
        $('#errorBox').show();

    }

}