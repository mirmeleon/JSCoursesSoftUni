let auth = (() => {
    function isAuthed() {
        return localStorage.getItem('authtoken') !== null;
    }

    function saveSession(data) {
      //  console.log(data);
        localStorage.setItem('username', data.username);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
    }

   function login(username, password) {
       // try {
        return remote.post('user', 'login', {username, password}, 'basic');
         //  saveSession(data);
           // return true;
        // } catch (err){
        //   //todo  handleError(err);
        //     return err;
        // }

    }

    function register(username, password) {
        return remote.post('user', '', {username, password}, 'basic');
        // try {
        //     let data = await remote.post('user', '', {username, password}, 'basic');
        //     saveSession(data);
        //     return true;
        // } catch(err) {
        //     //todo  handleError(err);
        //     return err;
        // }

    }

     function logout() {
        return remote.post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
        // try {
        //     let data = await remote.post('user', '_logout', {authtoken: localStorage.getItem('authtoken')});
        //     localStorage.clear();
        //     return true;
        // } catch (err){
        //     //todo  handleError(err);
        //     return err;
        // }

    }
 //zarad tozi return veche moje da se napishe auth.saveSession
    return {
        saveSession, login, register, logout, isAuthed
    }
})();