
console.log('ok')
import app from './server/app';
console.log('next')
const server = app.listen( process.env['PORT'], () => {
    console.log(`Server listening on port: ${PORT}`)
})


// const audio = new Audio();
// audio.addEventListener('ended', e=>{
//     const[top,...newPlayList] = playList
//     if( top ) {
//         audio.src = top
//         setPlayList(newPlayList)
//         audio.play()
//     }
// })


// playlist = {
//     'song_1' : 'audio/splat.mp3',
//     'song_2' : 'audio/saw.mp3',
//     'song_3' : 'audio/marbles.mp3',
//     'song_4' : 'audio/seagulls.mp3',
//     'song_5' : 'audio/plane.mp3'
// }

// $(".my_audio").trigger('load');

// function play_audio(task) {
//       if(task == 'play'){
//            $(".my_audio").trigger('play');
//       }
//       if(task == 'stop'){
//            $(".my_audio").trigger('pause');
//            $(".my_audio").prop("currentTime",0);
//       }
//  }

//  keys = Object.keys(playlist);
// $('.my_audio').append("<source id='sound_src' src=" + playlist[keys[0]] + " type='audio/mpeg'>");
// // Reset the audio source to the next song in the playlist, when the current song ends:

// count = 0;
// $('.my_audio').on('ended', function() {
//    count++;
//    $("#sound_src").attr("src", playlist[keys[count]])[0];
//    $(".my_audio").trigger('load');
//    play_audio('play');
// });

// useEffect() {
//     player.on('ended', e => {
//         currentSong = ...
//         setPlayList(...)
//     }
//     )
// }
// player.vote()
// player.nextSong()
