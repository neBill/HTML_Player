const songs = {
  0 : 'Иные времена.mp3',
  1 : 'Частушки - пофигушки.mp3',    
  2 : 'Рассказ брачного агента, бывшего евнуха.mp3',
  3 : 'Свободная частица.mp3',
  4 : 'Любовное чтиво.mp3',
  5 : 'Астрологическая песня.mp3',
  6 : 'Деревенька.mp3',
  7 : 'Случай в Кремле.mp3',
  8 : 'Суррогаты.mp3',
  9 : 'Включайте поворотники.mp3',
  10 : 'Разговор с поэтом.mp3',
  11 : 'Марш гедонистов.mp3',
  12 : 'Разговор с критиком.mp3',
  13 : 'Инь и Ян.mp3',
  14 : 'Былина о попсе.mp3',
  15 : 'Кто стучится в дверь ко мне.mp3',
  16 : 'Товарищи учёные - 30 лет спустя.mp3',
  17 : 'Хоронила мафия....mp3',
  18 : 'Аутотренинг.mp3',
  19 : 'Цыганская песня.mp3',
  20 : 'О судьбе интеллигенции.mp3',
  21 : 'Сказки нашего времени.mp3',
  22 : 'Волшебство виски.mp3'
} 

let curr_track = document.createElement('audio');
let isPlaying = false;
let play_pause_btn = document.querySelector("#playpause_button");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");



function getSource(id){  

  return `music/${songs[id]}`

}

  function setColors() {

    for (const key in songs){      

      document.getElementById(key).style.color = 'var(--button-color)'

    }

  }   

  window.addEventListener("DOMContentLoaded", ()=>{

    createButtons(Object.keys(songs).length)   

  })


document.addEventListener('click', function(event){

  const className = event.target.className

  if(className == 'song_button'){

    setColors()

    const songId = event.target.id

    //let filePath  = getSource(songId)

    //document.getElementById('mp3_source').src = filePath 

    //autoplay="autoplay"

    //curr_track.autoplay = true

    loadTrack(songId)

   // curr_track.src = filePath

    //play_pause_btn.innerText = 'Pause';
    playTrack()

    document.getElementById(songId).style.color = 'var(--button-pressed-color)'
    
  }

})

function createButtons(count){
  for(let i = 0; i < count; i++){
    let btn = document.createElement('button')
    
    
    btn.innerText=songs[i].replace('.mp3', '')
    btn.className = 'song_button'
    btn.id = i
    document.querySelector('#buttons_container').appendChild(btn)
  }
}

function playpauseTrack() {

  if (!isPlaying) playTrack();
  else pauseTrack();

}

function playTrack() {
  // Play the loaded track
  curr_track.play();
  isPlaying = true;
 
  // Replace icon with the pause icon
  play_pause_btn.innerText = 'II';
}
 
function pauseTrack() {
  // Pause the loaded track
  curr_track.pause();
  isPlaying = false;
 
  // Replace icon with the play icon
  play_pause_btn.innerText = '>';
}

function nextTrack() {
  
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
 
  
  loadTrack(track_index);
  playTrack();
}
 
function prevTrack() {
  
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;   
 
  loadTrack(track_index);
  playTrack();
}

function loadTrack(track_index){

  let filePath  = getSource(track_index)  
  
  curr_track.src = filePath


}





  
  
  