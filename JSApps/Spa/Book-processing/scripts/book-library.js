function startApp(){

    setGreeting();
   

    const baseUrl = 'https://baas.kinvey.com/';
    const appKey = 'kid_HJYR1_JD-';
    const appSecret = '5523f8dcf8a147c49b7f41b47b3c0a5a';

     $('#linkHome').click(() => showView('home'));
     $('#linkLogin').click(() => showView('login'));
     $('#linkRegister').click(() => showView('register'));
    $('#linkListBooks').click(() => showView('listBooks'));
    $('#linkCreateBook').click(() => showView('createBook'));
    $('#linkLogout').click(logout);



    //submitvane na logvaneto
    $('#viewLogin').find('form').submit(login);
    $('#viewRegister').find('form').submit(register);

    //notifikaciite
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').hide(),
    });

    //kriene notifikaciite kato kliknem po tiah
    $('#infoBox').click((event) => $(event.target).hide());
    $('#errorBox').click((event) => $(event.target).hide());

    //show info notifikacia
    function showInfo(message){
      //  console.log('showing info');
       $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(() => $('#infoBox').fadeOut(), 3000);
    }

    //errors
    function showError(message){
       // console.log('showing error');
        $('#errorBox').text(message);
        $('#errorBox').show();


    }

    function handleError(reason){
        //console.log(reason);
       showError(reason.responseJSON.description);

    }

     function showView(name){
         $('section').hide();

         switch(name){
             case 'home': $('#viewHome').show(); break;
             case 'login': $('#viewLogin').show(); break;
             case 'register': $('#viewRegister').show(); break;
             case 'listBooks': $('#viewBooks').show(); break;
             case 'createBook': $('#viewCreateBook').show(); break;
             case 'logout': $('#viewLogout').show(); break;
         }

     }



    function setStorage(data){

            localStorage.setItem('authtoken', data._kmd.authtoken);
            localStorage.setItem('username', data.username);
            setGreeting();
        //posle prenasochvame potrebitelia
            showView('listBooks');

    }


    function login(event){
      //  console.log('opit logvane');
        //kazvame da ne submitva chrez prezarejdane na str, koeto si mu e defaultnoto povedenie
        event.preventDefault();
        let username = $('#inputUsername').val();
        let password = $('#inputPassword').val();

        let req = {

            url: baseUrl + 'user/'  + appKey + '/login',
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
                showInfo('Login successfull');
                setStorage(data)
            },
            error:  handleError
        };

        $.ajax(req);


    } //end login

    // register
    function register(event){
        //console.log('opit regvane');
        event.preventDefault();
        let username = $('#inputNewUsername').val();
        let password = $('#inputNewPassword').val();
        let repeatPassword = $('#inputNewPassRepeat').val();

          if(password !== repeatPassword){
              showError("Passwords dont match!");
              return; //return e za da spre izpulnenieto na scripta
          }

        let req = {

            url: baseUrl + 'user/'  + appKey,
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
            showInfo('Registration successfull'); //za da vikne i taia func napravi success da vika anonimna func
            setStorage(data)
        },
            error:  handleError
        };

        $.ajax(req);
    } //end register

    function setGreeting(){
        console.log('seting greeting');
        let username = localStorage.getItem('username');
        if(username !== null){
            $('#loggedInUser').text(`Welcome, ${username}!`);
        } else {
            $('#loggedInUser').text('');
        }

    }

    function logout(){
      // console.log('attempt logout');

        let req = {

            url: baseUrl + 'user/'  + appKey + '/_logout',
            method: 'POST',
            headers: {
                'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authtoken'),
             },
            success: logoutSuccess,
            error: handleError
        };

        $.ajax(req);

        function logoutSuccess(data){
             localStorage.clear();
           setGreeting();
             showView('home');

          }
    }

}
