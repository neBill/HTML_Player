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
// let isStoped = true;
let play_pause_btn = document.querySelector("#playpause_button");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let track_index = 0;
let updateTimer;

let seek_slider = document.querySelector(".seek_slider");
// let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current_time");
let total_duration = document.querySelector(".total_duration");


function getTrackPath(index){  

  return `music/${songs[index]}`

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

    const trackIndex = event.target.id   
   // alert(track_index)

    loadTrack(trackIndex)

    playTrack()

   //document.getElementById(trackIndex).style.color = 'var(--button-pressed-color)'

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
  
if(curr_track.src.length === 0){

  loadTrack(5);
  
}
  
  //alert(s.length)
  
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

  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  let filePath  = getTrackPath(track_index) 
  document.getElementById(track_index).style.color = 'var(--button-pressed-color)'

  //alert(filePath)
   updateTimer = setInterval(seekUpdate, 1000);

  curr_track.src = filePath
  curr_track.load();
  //alert(curr_track.duration)

  updateTimer = setInterval(seekUpdate, 1000);


}

curr_track.onloadedmetadata = (event) => {

  //alert(curr_track.duration)
  let durationMinutes = Math.floor(curr_track.duration / 60);
  let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
  total_duration.textContent = durationMinutes + ":" + durationSeconds;
  //alert(durationMinutes + " : " + durationSeconds)
  playTrack()
 
}

// function loadTrack(track_index) {
//   // Clear the previous seek timer
//   clearInterval(updateTimer);
//   resetValues();

//   // Load a new track
//   curr_track.src = track_list[track_index].path;
//   curr_track.load();

  

//   // Set an interval of 1000 milliseconds
//   // for updating the seek slider
//   updateTimer = setInterval(seekUpdate, 1000);

//   // Move to the next track if the current finishes playing
//   // using the 'ended' event
//   curr_track.addEventListener("ended", nextTrack);

 
// }

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function seekUpdate() {
let seekPosition = 0;

// Check if the current track duration is a legible number
if (!isNaN(curr_track.duration)) {
  seekPosition = curr_track.currentTime * (100 / curr_track.duration);
  seek_slider.value = seekPosition;

  // Calculate the time left and the total duration
  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(curr_track.duration / 60);
  let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

  // Add a zero to the single digit time values
  if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
  if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
  if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
  if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

  // Display the updated duration
  curr_time.textContent = currentMinutes + ":" + currentSeconds;
  total_duration.textContent = durationMinutes + ":" + durationSeconds;
}


}




