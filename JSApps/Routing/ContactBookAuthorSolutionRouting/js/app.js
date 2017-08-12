const handlers = {};

$(() => {


    //alert('it works')
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs'); // okazvame da polzva handlebars

        this.get('index.html', function () {
           // console.log('display index');//taka gi proveriva rabotiat li

            if (auth.isAuthed()) this.loggedIn = true;
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'

            }).then(function () {
                this.partial('./templates/welcome.hbs');

            });

        });
        //pri prazen string dmeek kat ne se napishe index
       // this.get('', displayWelcome);

        this.get('#/register', function () {
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/register.hbs');
            });
        });

        this.get('#/contacts', handlers.contactsController); //toja js fail e prikachen kum promenliva

        this.get('#/profile', function () {
            console.log('Edit profile form');
            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/profile.hbs');
            });
        });
        //tva az go dobavih
        this.get('#/login',function(){
           //show login

        });

        this.get('#/logout', function () {
            console.log('Logout');
            auth.logout()
                .then(() => {
                    localStorage.clear();
                    this.redirect('#');
                });
        });

        this.post('#/login', function (context) {//vajno e da se poava tuk promenliva inache ne rabpti reditrect
            console.log('loging..');
           // console.log(this.params.username); //proverka dali si poluchavame danni; v params se paziat
            //console.log(this.params.password);

            let username = context.params.username;
            let password = context.params.password;
            auth.login(username, password)
                .then(function (data) {
                    auth.saveSession(data);
                   context.trigger('user-login');// tva ne znam kvo e
                    context.redirect('#/contacts');
                });
        });

        this.post('#/register', function () {

            // Handle register
        });

        this.post('#/profile', function () {
            // Handle edit profile
        });

        //dobaveno ot videoto
        function displayWelcome(){

            //zarejdane na partiali iska obekt s partiali
           this.loadPartials({
               header: './templates/common/header.hbs',
               footer: './templates/common/footer.hbs'
           }).then(function(){

               this.partial('./templates/welcome.hbs');
           })
        }



    }).run();

    // TODO
    // * user search
    // * messages
});