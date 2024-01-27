
function getSource(name){

  const songs = {

    1 : 'Частушки - пофигушки.mp3',    
    2 : 'Рассказ брачного агента, бывшего евнуха.mp3',
    3 : 'Свободная частица.mp3',

    
  } 
  
  return songs[name]
    
}

document.addEventListener('click', function(event){

  const className = event.target.className

  const songName = event.target.name

  if(className == 'song'){

    let filePath  = getSource(songName)

    document.getElementById('mp3_source').src = filePath

    //audio.autoplay = true;

  }

})



  
  
  