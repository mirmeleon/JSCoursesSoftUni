function startApp() {
    showView('home');
    const adsDiv = $('#ads');
    const templates = {};

    loadTemplates();

    async function loadTemplates() {
        const [adsCatalogTemplate, adBoxTemplate]
            = await Promise.all([
                $.get('./templates/ads-catalog.html'),
                $.get('./templates/ad-box-partial.html')
        ]);

       templates['catalog'] = Handlebars.compile(adsCatalogTemplate);

        Handlebars.registerPartial('adBox', adBoxTemplate);
    }

    // Attach click events
    (() => {
        $('header').find('a[data-target]').click(navigateTo);
        $('#buttonLoginUser').click(login);
        $('#buttonRegisterUser').click(register);
        $('#linkLogout').click(logout);
        $('#buttonCreateAd').click(createAd);
        $('.notification').click(function () {
            $(this).hide();
        });
    })();

    let requester = (() => {
        const appKey = 'kid_HJ-leh-vb';
        const appSecret = '7fed1499535f4bb6a8fef157ff031112';
        const baseUrl = 'https://baas.kinvey.com/';

        // Creates the authentication header
        function makeAuth(type) {
            return type === 'basic'
                ?  'Basic ' + btoa(appKey + ':' + appSecret)
                :  'Kinvey ' + localStorage.getItem('authtoken');
        }

        // Creates request object to kinvey
        function makeRequest(method, module, endpoint, auth) {
            return req = {
                method,
                url: baseUrl + module + '/' + appKey + '/' + endpoint,
                headers: {
                    'Authorization': makeAuth(auth)
                }
            };
        }

        // Function to return GET promise
        function get (module, endpoint, auth) {
            return $.ajax(makeRequest('GET', module, endpoint, auth));
        }

        // Function to return POST promise
        function post (module, endpoint, auth, data) {
            let req = makeRequest('POST', module, endpoint, auth);
            req.data = data;
            return $.ajax(req);
        }

        // Function to return PUT promise
        function update (module, endpoint, auth, data) {
            let req = makeRequest('PUT', module, endpoint, auth);
            req.data = data;
            return $.ajax(req);
        }

        // Function to return DELETE promise
        function remove (module, endpoint, auth) {
            return $.ajax(makeRequest('DELETE', module, endpoint, auth));
        }

        return {
            get,
            post,
            update,
            remove
        }
    })();

    //tva predotvratiava pro refresh da triabva pak da se logvash
    if(localStorage.getItem('authtoken') !== null){
        userLoggedIn();
    } else {
        userLoggedOut();
    }

    // Handle notifications
    $(document).on({
        ajaxStart: () => $("#loadingBox").show(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.text(message);
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 3000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.show();
    }

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('main > section').hide();
        $('#' + viewName).show();

        if(viewName === 'viewAds'){
            loadAds();
        }
    }

    // Shows only the correct links for a logged in user
    function userLoggedIn() {
        let span = $('#loggedInUser');
        span.text(`Welcome ${localStorage.getItem('username')}!`);
        span.show();
        $('#linkHome').show();
        $('#linkLogin').hide();
        $('#linkRegister').hide();
        $('#linkListAds').show();
        $('#linkCreateAd').show();
        $('#linkLogout').show();
    }

    // Shows only the correct links for an anonymous user
    function userLoggedOut() {
        let span = $('#loggedInUser');
        span.text("");
        span.hide();
        $('#linkHome').show();
        $('#linkLogin').show();
        $('#linkRegister').show();
        $('#linkListAds').hide();
        $('#linkCreateAd').hide();
        $('#linkLogout').hide();
    }

    function navigateTo() {
        $('section').hide();
        let target = $(this).attr('data-target');
        showView(target);
    }

    // Saves username/id/authtoken to local storage
    function saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
        userLoggedIn();
    }

    // Logs in the user
    async function login() {
        let form = $('#formLogin');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', 'login', 'basic', { username, password });
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully logged in!');
        } catch (e) {
            handleError(e);
        }
    }

    // Register a user
    async function register() {
        let form = $('#formRegister');
        let username = form.find('input[name="username"]').val();
        let password = form.find('input[name="passwd"]').val();

        try {
            let response = await requester.post('user', '', 'basic', { username, password});
            saveSession(response);
            showView('viewAds');
            showInfo('Successfully registered!');
        } catch (e) {
            handleError(e);
        }
    }

    // Logout a user
    async function logout() {
        try {
            await requester.post('user', '_logout', 'kinvey', { authtoken: localStorage.getItem('authtoken')});
            localStorage.clear(); // Clears all session storage on logout
            userLoggedOut();
            showView('viewHome');
            showInfo('Logout successful!')
        } catch (e) {
            handleError(e);
        }
    }

    // Load all ads
    async function loadAds() {
        let content = $('#content');
        content.empty();
        let ads = await requester.get('appdata', 'ads');
        ads.forEach(a => {
            if(a._acl.creator === localStorage.getItem('id')){
                a.isAuthor = true   //setva tazi stoynost zaradi template-a
            }
        });

        let context = {  //pravi ads na obekt
            ads
        };

        let html = templates['catalog'](context);   //podava contexta na kataloga
        content.html(html);

        let editButtons = $(content).find('.ad-box').find('.edit');
        let deleteButtons = $(content).find('.ad-box').find('.delete');
        editButtons.click(openEditAdd);
        deleteButtons.click(deleteAd);
    }

    // Create an add
    async function createAd() {
        let form = $('#formCreateAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="imageUrl"]').val();
        let publisher = localStorage.getItem('username');
        let date = (new Date()).toString('yyyy-MM-dd');

        // Validations
        if(title.length === 0){
            showError('Title cannot be empty');
            return;
        }

        if(price.length === 0){
            showError('Price cannot be empty');
            return;
        }

        let newAd = {
            title, description, price, imageUrl, publisher, date
        };

        try {
            await requester.post('appdata', 'ads', '', newAd);
            showView('viewAds');
            showInfo('Ad successfully created!');
            // clear all input values
            form.find('input[name="title"]').val('');
            form.find('textarea[name="description"]').val('');
            form.find('input[name="price"]').val('');
            form.find('input[name="imageUrl"]').val('');
        } catch (err) {
            handleError(err);
        }
    }

    // Delete an add
    async function deleteAd() {
        let id = $(this).parent().attr('data-id');
        try {
            await requester.remove('appdata', `ads/${id}`, 'kinvey');
            showView('viewAds');
            showInfo('Ad successfully removed!');
        } catch (err) {
            handleError(err);
        }
    }

    // Edit an add
    async function editAd(id, publisher, date) {
        let form = $('#formEditAd');
        let title = form.find('input[name="title"]').val();
        let description = form.find('textarea[name="description"]').val();
        let price = form.find('input[name="price"]').val();
        let imageUrl = form.find('input[name="imageUrl"]').val();

        let editedAd = {
            title, description, price, imageUrl, publisher, date
        };

        try {
            await requester.update('appdata', `ads/${id}`, 'kinvey', editedAd);
            showInfo('Ad successfully edited!');
            showView('viewAds');
        } catch (err) {
            handleError(err);
        }
    }

    // Open edit add view
    async function openEditAdd() {
        let id = $(this).parent().attr('data-id');
        let ad = await requester.get('appdata', `ads/${id}`, 'kinvey');
        let form = $('#formEditAd');
        form.find('input[name="title"]').val(ad.title);
        form.find('textarea[name="description"]').val(ad.description);
        form.find('input[name="price"]').val(ad.price);
        form.find('input[name="imageUrl"]').val(ad.imageUrl);
        let date = ad.date;
        let publisher = ad.publisher;

        $('#buttonEditAd').click(() => editAd(ad._id, publisher, date));
        showView('viewEditAd');
    }
}