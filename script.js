const play=document.querySelector('.play');
const previous=document.querySelector('.prev'),
next=document.querySelector('.next'),
//
trackImage=document.querySelector(".track-image"),
title=document.querySelector('.title'),
artist=document.querySelector('.artist'),
// 
trackCurrentTime=document.querySelector('.current-time'),
trackDuration=document.querySelector('.duration-time'),
slider=document.querySelector('.duration-slider'),
// 
currentVolume=document.querySelector('#volume'),
volumeIcon=document.querySelector('#volume-icon'),
showVolume=document.querySelector('.show-volume'),
// 
autoPlayBtn=document.querySelector('.play-all'),
// 
hamBurger = document.querySelector('.fa-bars'),
closeIcon=document.querySelector('.fa-times'),
// 
musicPlaylist=document.querySelector('.music-playlist'),
pDiv=document.querySelector('.playlist-div'),
playList=document.querySelector('.playlist');

let timer;
let autoplay = 0;
let indexTrack = 0;
let songIsPlaying = false;
let track=document.createElement('audio');

// All Event Listeners
play.addEventListener('click',justPlay);
next.addEventListener('click',nextSong);
previous.addEventListener('click',prevSong);
autoPlayBtn.addEventListener('click',autoPlayToggle)
volumeIcon.addEventListener('click',muteSound);
currentVolume.addEventListener('change',changeVolume);
slider.addEventListener('change',changeDuration);
track.addEventListener('timeupdate',songTimeUpdate);
hamBurger.addEventListener('click',showPlayList);
closeIcon.addEventListener('click',hidePlayList);



// Load tracks
function loadTrack(indexTrack){
        clearInterval(timer);
        resetSlider();

    track.src = trackList[indexTrack].path;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    artist.src = trackList[indexTrack].singer;
    track.load();

    timer=setInterval(updateSlider,1000);
}

loadTrack(indexTrack);

// Play song or Pause song
function justPlay(){
    if(songIsPlaying==false){
        playSong();
    }
    else{
        pauseSong();
    }
}

// Play Song

function playSong(){
    track.play();
    songIsPlaying=true;
    play.innerHTML='<i class="fa-solid fa-pause"></i>';
}
// Pause song
function pauseSong(){
    track.pause();
    songIsPlaying=false;
    play.innerHTML='<i class="fa-solid fa-play"></i>';
}

// Next Song
function nextSong(){
    if(indexTrack < trackList.length-1){
        indexTrack++;
        loadTrack(indexTrack);
        playSong();
    }
    else{
        indexTrack=0;
        loadTrack(indexTrack);
        playSong();
    }

}
// Previous song
function prevSong(){
    if(indexTrack > 0){
        indexTrack--;
        loadTrack(indexTrack);
        playSong();
    }
    else{
        indexTrack=trackList.length-1;
        loadTrack(indexTrack);
        playSong();
    }
}
// Mute Sound

function muteSound(){
    if(track.volume != 0){
        track.volume=0;
        showVolume.innerHTML=0;
        currentVolume.value=0;
        document.querySelector('.volume > i').className= "fa-solid fa-volume-mute";
    }
    else{
        track.volume=32/100;
        showVolume.innerHTML=32;
        currentVolume.value=32;
        document.querySelector('.volume > i').className= "fa-solid fa-volume-up";
    }
}
// Change Volume
function changeVolume(){
    showVolume.innerHTML=currentVolume.value;
    // showVolume.value=currentVolume.value;
    track.volume=currentVolume.value/100;
    if(track.volume===0){
        document.querySelector('.volume > i').className= "fa-solid fa-volume-mute";
    }
    else{
        document.querySelector('.volume > i').className= "fa-solid fa-volume-up";
    }
}
// Change Duration
function changeDuration(){
    let sliderPosition=track.duration * (slider.value / 100);
    track.currentTime= sliderPosition;

}

// Auto Play
function autoPlayToggle(){
    if(autoplay==0){
        autoplay=1;
        autoPlayBtn.style.background="#db6400"
    }
    else{
        autoplay=0;
        autoPlayBtn.style.background="#ccc"
    }
}

// Update Current song time

function songTimeUpdate(){
    if(track.duration){
        let curmins=Math.floor(track.currentTime / 60);
        let cursecs=Math.floor(track.currentTime - curmins * 60);
    
        let durmins=Math.floor(track.duration / 60);
        let dursecs=Math.floor(track.duration - durmins * 60);
    
        if(dursecs < 10){
            dursecs="0"+dursecs;
        }
        if(durmins < 10){
            durmins="0"+durmins;
        }
        if( curmins < 10){
            curmins="0"+ curmins;
        }
        if(cursecs < 10){
           cursecs = "0"+ cursecs;
        }
        trackCurrentTime.innerHTML=curmins + ":" + cursecs;
        trackDuration.innerHTML= durmins+":"+ dursecs;
    }
    else{
        trackCurrentTime.innerHTML="00"+":"+"00";
        trackDuration.innerHTML= "00" + ":" + "00";
    }
}

// Reset Slider

function resetSlider(){
    slider.value=0;
}
// Update Slider

function updateSlider(){
    let position=0;

    if(!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    if(track.ended){
        pauseSong();
        if(autoplay == 1 && indexTrack < trackList.length -1){
            indexTrack++;
            loadTrack(indexTrack);
            playSong();
        }
        else if(autoplay == 1 && indexTrack == trackList.length-1){
            indexTrack=0;
            loadTrack(indexTrack);
            playSong();
        }
    }
}

// Show PlayList

function showPlayList(){
    musicPlaylist.style.transform="translateX(0)"
}
// Hide PlayList
function hidePlayList(){
    musicPlaylist.style.transform="translateX(-100%)"
}

// Display track in playlist

let counter = 1;
function displayTracks(){
    for(let i=0;i<trackList.length;i++){
        // console.log(trackList[i].name);
        let div=document.createElement('div');
        div.classList.add('playlist');
        div.innerHTML=`
            <span class="song-index">${counter++}</span>
            <p class="single-song">${trackList[i].name}</p>
        `;
        pDiv.appendChild(div);
    }
    playFromPlaylist();
}
displayTracks();

// Play Song from the Playlist

function playFromPlaylist(){
    pDiv.addEventListener('click',(el) => {
        if(el.target.classList.contains('single-song')){
            const indexNum = trackList.findIndex((item,index)=>{
                if(item.name === el.target.innerHTML){
                    return true;
                }
            });
            loadTrack(indexNum);
            playSong();
            hidePlayList();
        }
    });

}









      





