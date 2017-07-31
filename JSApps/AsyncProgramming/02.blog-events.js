function attachEvents() {
 const baseUrl = 'https://baas.kinvey.com/appdata/kid_By7g0H2U-/';


   $('#btnLoadPosts').click(loadPosts);
   $('#btnViewPost').click(viewPosts);

    function loadPosts(){


     let req = {
      method:'GET',
      url:baseUrl + 'posts',
      headers: {'Authorization':'Basic'+ ' ' + btoa('peter:p')},
         success: makeSelect,
         error: displayError
     };

     $.ajax(req);


     function makeSelect(data){
        let selectionList = $('#posts');
        for(let post of data){
            let option = $('<option>').attr('value', post._id)
                .text(post.title);
            selectionList.append(option);

        }

     }

    }

    function displayError(er){
        `Error: `;

    }


    function viewPosts(){


        let selectedEl = $('#posts option:selected').val();
      let reqPosts = {
       method: 'GET',
       url: baseUrl + 'posts/' +`${selectedEl}`,
       headers: {'Authorization': 'Basic ' + btoa('peter:p')},
          success: displayPost,
          error: displayError
      };

      $.ajax(reqPosts);

      let reqComments = {
          method:'GET',
          url:baseUrl + `comments/?query={"postId":"${selectedEl}"}`,
          headers: {'Authorization': 'Basic ' + btoa('peter:p')},
          success: loadComments,
          error: displayError
      };
           $.ajax(reqComments);

           function displayPost(data){
               $('#post-body').empty();


          $('#post-title').text(data.title);
           let li = $('<li>${data.text}</li>').text(`${data.body}`);
               let ul = $('#post-body');
           ul.append(li);


           }

           function loadComments(data){
               $('#post-comments').empty();
            let comUl = $('#post-comments');
            for(let com of data){
              let li = $('<li>').text(com.text);
              comUl.append(li);
            }
           }
    }
}
