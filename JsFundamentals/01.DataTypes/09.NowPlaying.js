function playing(arr){
    "use strict";
    let[track, artist, duration] = arr;
  console.log(`Now Playing: ${artist} - ${track} [${duration}]`);
}

playing(['Number One', 'Nelly', '4:09']);