function startApp() {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_HJ-leh-vb";
    const kinveyAppSecret = "7fed1499535f4bb6a8fef157ff031112";
    const kinveyAppAuthHeaders = {
        "Authorization": "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)
    };
    const adsDiv = $('#ads');


    $('#linkHome').click(showHomeView);
    $('#linkLogin').click(showLoginView);
    $('#linkRegister').click(showRegisterView);
    $('#linkListAds').click(listAds);
    $('#linkCreateAd').click(showCreateAdView);
    $('#linkLogout').click(logoutUser);

    $('#buttonLoginUser').click(loginUser);
    $('#buttonRegisterUser').click(registerUser);
    $('#buttonCreateAd').click(createAd);
    $('#buttonEditAd').click(editAd);

    $('#infoBox').click((event) => $(event.target).hide());
    $('#errorBox').click((event) => $(event.target).hide());
    $('#loadingBox').click((event) => $(event.target).hide());

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show();
        },
        ajaxStop: function () {
            $('#loadingBox').hide();
        }
    });


    showHideMenuLinks();
    showView('viewHome');

    function showHideMenuLinks() {
        $('#linkHome').show();

        if (localStorage.getItem('authToken')) {
            $('#linkLogin').hide();
            $('#linkRegister').hide();
            $('#linkListAds').show();
            $('#linkCreateAd').show();
            $('#linkLogout').show();
            $('#loggedInUser').text(`Hi, ${localStorage.getItem('username')}`).show();

        } else {
            $('#linkLogin').show();
            $('#linkRegister').show();
            $('#linkListAds').hide();
            $('#linkCreateAd').hide();
            $('#linkLogout').hide();
        }
    }

    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function showCreateAdView() {
        $('#formCreateAd').trigger('reset');
        showView('viewCreateAd');
    }

    function registerUser() {
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('User registration successful.');
        }
    }

    function handleAjaxError(response) {

        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0) {
            errorMsg = "Cannot connect due to network error.";
        }
        if (response.responseJSON && response.responseJSON.description) {
            errorMsg = response.responseJSON.description;
        }

        showError(errorMsg);
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        localStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        localStorage.setItem('userId', userId);
        let username = userInfo.username;
        localStorage.setItem('username', username);
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 2000);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();

    }

    function logoutUser() {
        localStorage.clear();
        $('#loggedInUser').text('');
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.')
    }

    function loginUser() {
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('Login successful.');
        }
    }

    function listAds() {
        adsDiv.empty();
        showView('viewAds');

        $.ajax({
            method: "GET",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads",
            headers: getKinveyUserAuthHeaders(),
            success: loadAdsSuccess,
            error: handleAjaxError
        });

        function loadAdsSuccess(data) {
            showInfo('Ads loaded.');

            if (data.length === 0) {
                adsDiv.append('<p>No ads in the database.</p>');
                return;
            }

            //DISPLAYNG DATA FROM DB
            for (let ad of data) {
                let html = $('<div>');
                html.addClass('ad-box');
                let title = $(`<div class="ad-title">${ad.title}</div>`);


                if (ad._acl.creator === localStorage.getItem('userId')) {
                    let deleteBtn = $('<button>&#10006;</button>').click(() => deleteAd(ad));
                    deleteBtn.addClass('ad-control');
                    deleteBtn.appendTo(title);

                    let editBtn = $('<button>&#9998;</button>').click(() => loadAdForEdit(ad));
                    editBtn.addClass('ad-control');
                    editBtn.appendTo(title);

                }

                html.append(title);
                html.append(`<div><img src="${ad.imageUrl}"></div>`);
                html.append(`<div>Price: ${Number(ad.price).toFixed(2)} | By ${ad.publisher}</div>`);
                html.append(`<div><i>${ad.description}</i></div>`);
                html.append($('<button>Details</button>').click(() => displayAdDetails(ad)));
                adsDiv.append(html);

            }
        }
    }

        function getKinveyUserAuthHeaders() {
            return {
                "Authorization": "Kinvey " + localStorage.getItem('authToken')
            };
        }

        function createAd() {
            const kinveyUserUrl = `${kinveyBaseUrl}user/${kinveyAppKey}/${localStorage.getItem('userId')}`;

            $.ajax({
                method: "GET",
                url: kinveyUserUrl,
                headers: getKinveyUserAuthHeaders(),
                success: afterPublisherRequest,
                error: handleAjaxError
            });

            function afterPublisherRequest() { //publisher
                let adData = {
                    title: $('#formCreateAd input[name=title]').val(),
                    description: $('#formCreateAd textarea[name=description]').val(),
                    publisher: localStorage.getItem('username'),  //publisher.name
                    date: (new Date()).toString('yyyy-MM-dd'),
                    price: $('#formCreateAd input[name=price]').val(),
                    imageUrl: $('#formCreateAd input[name=image]').val()
                };

                if (adData.title.length === 0) {
                    showError('title cant be empty!');
                    return;
                }

                if (adData.price.length === 0) {
                    showError("price can't be empty");
                    return;
                }

                $.ajax({
                    method: "POST",
                    url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads",
                    headers: getKinveyUserAuthHeaders(),
                    data: adData,
                    success: createAdSuccess,
                    error: handleAjaxError
                });

                function createAdSuccess() {
                    listAds();
                    showInfo('Ad created.');
                }
            }
        }

        function loadAdForEdit(ad) {

            $.ajax({
                method: "GET",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads/" + ad._id,
                headers: getKinveyUserAuthHeaders(),
                success: loadAdForEditSuccess,
                error: handleAjaxError
            });

            function loadAdForEditSuccess(ad) {
                $('#formEditAd input[name=id]').val(ad._id);
                $('#formEditAd input[name=publisher]').val(ad.publisher);
                $('#formEditAd input[name=title]').val(ad.title);
                $('#formEditAd textarea[name=description]').val(ad.description);
                $('#formEditAd input[name=datePublished]').val(ad.date);
                $('#formEditAd input[name=price]').val(ad.price);
                $('#formEditAd input[name=image]').val(ad.imageUrl);

                showView('viewEditAd');
            }
        }

        function editAd() {
            let adData = {
                title: $('#formEditAd input[name=title]').val(),
                description: $('#formEditAd textarea[name=description]').val(),
                publisher: $('#formEditAd input[name=publisher]').val(),
                date: $('#formEditAd input[name=datePublished]').val(),
                price: Number(Number($('#formEditAd input[name=price]').val()).toFixed(2)),
                imageUrl: $('#formEditAd input[name=image]').val()
            };

            $.ajax({
                method: "PUT",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads/" + $('#formEditAd input[name=id]').val(),
                headers: {
                    'Authorization': 'Kinvey' + ' ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(adData),
                success: editAdSuccess,
                error: handleAjaxError
            });

            function editAdSuccess() {
                listAds();
                showInfo('Ad edited.');
            }
        }

        function displayAdDetails(ad) {
            let html = $('#viewAdDetails');
            html.empty();


            let div = $('<div>').addClass('ad-details');
            div.append(
                $('<img>').attr('src', ad.imageUrl),
                $('<br>'),
                $('<label>').text('Title:'),
                $('<h1>').text(ad.title),
                $('<label>').text('Description:'),
                $('<p>').text(ad.description),
                $('<label>').text('Publisher:'),
                $('<div>').text(ad.publisher),
                $('<label>').text('Date:'),
                $('<div>').text(ad.date)
            );

            html.append(div);

            showView('viewAdDetails');
        }

        function deleteAd(ad) {
          $.ajax({
                method: "DELETE",
                url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads/" + ad._id,
                headers: getKinveyUserAuthHeaders(),
                success: deleteAdSuccess,
                error: handleAjaxError
            });

            function deleteAdSuccess() {
                showInfo('Ad deleted.');
                listAds();
            }
        }

}