$(() => {
   // alert('in');
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //HOME
       this.get('index.html', displayHome);
       this.get('#/home', displayHome);

        function displayHome(ctx){
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.hasNoTeam = sessionStorage.getItem('teamId') !== undefined ||
                sessionStorage.getItem('teamId') !== null;
            ctx.teamId = sessionStorage.getItem('teamId');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer:'./templates/common/footer.hbs'
            }).then(function () { //zarejdame naj-glavnia template nakraia
                this.partial( './templates/home/home.hbs')
            });
        }

       //ABOUT
       this.get('#/about', function(ctx) {
           ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
           ctx.username = sessionStorage.getItem('username');

           ctx.loadPartials({
               header: './templates/common/header.hbs',
               footer: './templates/common/footer.hbs'
           }).then(function () {
              this.partial('./templates/about/about.hbs')

           })
       });

       //LOGIN
      this.get('#/login', function(ctx) {

          ctx.loadPartials({
             header: './templates/common/header.hbs',
             footer:'./templates/common/footer.hbs',
             loginForm: './templates/login/loginForm.hbs'
         }).then(function(){
             this.partial('./templates/login/loginPage.hbs')

         })

      });

      this.post('#/login', function(ctx) {
         let username = ctx.params.username; //params dannite idvat ot formata
         let password = ctx.params.password;

          auth.login(username, password)
             .then(function(userInfo){
               auth.saveSession(userInfo);
               auth.showInfo('Logged in');
               displayHome(ctx);
             }).catch(auth.handleError);


         });

      //REGISTER
      this.get('#/register', function(ctx){
          ctx.loggedIn = sessionStorage.getItem('authtoken')!== null;
          ctx.username = sessionStorage.getItem('username');

          this.loadPartials({
              header: './templates/common/header.hbs',
              footer:'./templates/common/footer.hbs',
              registerForm: './templates/register/registerForm.hbs'
          }).then(function (){

              this.partial('./templates/register/registerPage.hbs');
          });

      });

      this.post('#/register', function(ctx){
          let username = ctx.params.username;
          let password = ctx.params.password;
          let repeatedPass = ctx.params.repeatPassword;

          if(password !==repeatedPass){
              auth.handleError('Pass dont match!');
          } else {
              auth.register(username, password, repeatedPass)
                  .then(function(userInfo){
                      auth.saveSession(userInfo);
                      auth.showInfo('Registered!');
                      displayHome(ctx);
                  }).catch(auth.handleError);
          }

      });

      //LOGOUT
        this.get('#/logout', function(ctx){

           auth.logout().then(function(){
               sessionStorage.clear();
               auth.showInfo('Logged out!');
               displayHome(ctx);

           }).catch(auth.handleError);



        });

      //CATALOG
        this.get('#/catalog', displayCatalog);



        function displayCatalog(ctx){
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.teamId = sessionStorage.getItem('teamId');


            //loadvam teamovete
            teamsService.loadTeams()
                .then(function (teams){
                    ctx.hasNoTeam =  sessionStorage.getItem('teamId') === null ||
                        sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = teams;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer:'./templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }) .then(function(){
                        this.partial('./templates/catalog/teamCatalog.hbs');

                    });

                });
        }

        //CREATE TEAM
        this.get('#/create', function(ctx){
            ctx.loggedIn = sessionStorage.getItem('authtoken')!== null;
            ctx.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer:'./templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function(){

                this.partial('./templates/create/createPage.hbs');
            })

        });

        this.post('#/create', function(ctx){

           let teamName = ctx.params.name;
           let comment = ctx.params.comment;


            teamsService.createTeam(teamName, comment)
                .then(function(teamInfo){
                    console.log(teamInfo);

                    teamsService.joinTeam(teamInfo._id)
                        .then(function (userInfo){
                            auth.saveSession(userInfo);
                            auth.showInfo(`team ${teamName} created`);
                            displayCatalog(ctx);
                        }).catch(auth.handleError);


                }).catch(auth.handleError)

        });

        //TEAM DETAILS PAGE
        this.get('#/catalog/:id', function(ctx){
            //console.log(ctx.params);
            let teamId = ctx.params.id.substr(1);//za da otreje :

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo){
                  ctx.loggedIn = sessionStorage.getItem('authtoken')!== null;
                  ctx.username = sessionStorage.getItem('username');
                 ctx.teamId = teamId;
                 ctx.name = teamInfo.name;
                 ctx.comment = teamInfo.comment;
                 ctx.isOnTeam = teamInfo._id === sessionStorage.getItem('teamId');
                 ctx.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId');

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer:'./templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                        // teamMember: './templates/catalog/teamMember.hbs'
                    }) .then(function(){

                        this.partial('./templates/catalog/details.hbs');

                    });
                }).catch(auth.handleError);

        });

        //JOIN TEAM BY ID
        this.get('#/join/:id', function(ctx){
            let teamId = ctx.params.id.substr(1);


            teamsService.joinTeam(teamId)
                .then(function(userInfo){
                   auth.saveSession(userInfo);
                   auth.showInfo('joined team');
                   displayCatalog(ctx);

                }).catch(auth.handleError);

        });

        //LEAVE TEAM
        this.get('#/leave', function(ctx){
           teamsService.leaveTeam()
               .then(function(userInfo){
                  auth.saveSession(userInfo);
                  auth.showInfo('Left team');
                  displayCatalog(ctx);
               }).catch(auth.handleError);

        });

       //EDIT TEAM PAGE
        this.get('#/edit/:id', function(ctx){
            let teamId = ctx.params.id.substr(1);
            teamsService.loadTeamDetails(teamId)
                .then(function(teamInfo){
                    //mapvame
                   ctx.teamId = teamId;
                   ctx.name = teamInfo.name;
                   ctx.comment = teamInfo.comment;
                   ctx.loadPartials({
                       header: './templates/common/header.hbs',
                       footer:'./templates/common/footer.hbs',
                       editForm: './templates/edit/editForm.hbs'
                   }).then(function(){
                       this.partial('./templates/edit/editPage.hbs');

                   })

                }).catch(auth.handleError);

        });

        this.post('#/edit/:id', function (ctx){
            let teamName = ctx.params.name;
            let teamComment = ctx.params.comment;
            let teamId = ctx.params.id.substr(1);

            teamsService.edit(teamId, teamName, teamComment)
            .then(function(){
               auth.showInfo(`Team ${teamName} updated!`);
               displayCatalog(ctx)
            }).catch(auth.handleError);
        })


    });

    app.run();
});