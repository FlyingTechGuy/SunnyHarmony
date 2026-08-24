let previous = document.querySelector('#prevBtnBox');
let play = document.querySelector('#playBtnBox');
let next = document.querySelector('#nextBtnBox');
let title = document.querySelector('#songName');
let artist = document.querySelector('#artistName');
let genre = document.querySelector('#genreTxt');
let slider = document.querySelector('#duration_slider');
let track_image = document.querySelector('#imgCover');
let track_image_under = document.querySelector('#imgBlur');
let auto_play = document.querySelector('#apBtnBox');
let shuffle = document.querySelector('#shBtnBox');
let karaoke = document.querySelector('#kBtnBox');
let forward_five = document.querySelector('#fiveSecForward');
let backward_five = document.querySelector('#fiveSecBackward');
let cur_song_num = document.querySelector('#songNumCur');
let tot_song_num = document.querySelector('#songNumTot');
let m = document.querySelector('#m');
let s = document.querySelector('#s');
let total_time = document.querySelector('#totalTime');
let pl_box = document.querySelector('#plSongsBox');
// let styleDir = document.querySelector('[data="dir"]');

let timer;
let autoplay = 1;
let toggleShuffle = 0;
let toggleKaraoke = 0;

let pl = 0;
let index_no = 0;
let Playing_song = false;

setTimeout(function() {
    document.querySelector("body").classList.add("show");
}, 500);

function resetAll() {
    toggleKaraoke = 0;
    pausesong();
    reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0'); // secends < 10 ? '0' + secends : secends
    m.innerHTML = minutes;
    s.innerHTML = secends;
}

let track = document.createElement('audio');

track.addEventListener('play', () => {
    
    // 3. בדיקה אם הדפדפן (כמו ספארי באייפון) תומך בתכונה
    if ('mediaSession' in navigator) {
        // 4. שליחת המידע לדיינמיק איילנד של האייפון
        navigator.mediaSession.metadata = new MediaMetadata({
            title: All_song[pl][index_no].name,
            artist: All_song[pl][index_no].singer,
            album: 'Reggaton',
            artwork: [
                { src: All_song[pl][index_no].img, sizes: '512x512', type: 'image/jpeg' }
            ]
        });
        // 5. חיבור כפתורי השליטה של הדיינמיק איילנד לנגן באתר
        navigator.mediaSession.setActionHandler('play', () => { playsong(); });
        navigator.mediaSession.setActionHandler('pause', () => { pausesong(); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { next_song(); });
        navigator.mediaSession.setActionHandler('previoustrack', () => { previous_song(); });
    }
});

//All songs list
let All_song = [
  // Reggaton
   [{
     name: "AMANECE",
     path: "music/Reggaeton/AnuelAA&HazeAMANECE.m4a",
     img: "cover/Reggaeton/AnuelAA&HazeAMANECE.avif",
     singer: "Anuel AA & Haze",
     songtime: "3:11",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/anuelaa/amanece.html"
   },
   {
     name: "Canción Bonita",
     path: "music/Reggaeton/CarlosVivesRickyMartinCanciónBonita.m4a",
     img: "cover/Reggaeton/CarlosVivesRickyMartinCanciónBonita.avif",
     singer: "Carlos Vives, Ricky Martin",
     songtime: "2:59",
     karaoke: "",
     lyrics: "https://genius.com/Carlos-vives-and-ricky-martin-cancion-bonita-lyrics"
   },
   {
     name: "X ESO BB!",
     path: "music/Reggaeton/JereKlein&NickiNicoleXEsoBB!Enfasis.m4a",
     img: "cover/Reggaeton/JereKlein&NickiNicoleXEsoBB!Enfasis.avif",
     singer: "JERE KLEIN & NICKI NICOLE",
     songtime: "3:20",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/jereklein/xesobb.html"
   },
   {
     name: "Mírame Ahora",
     path: "music/Reggaeton/MírameAhora(SaludMiReina)MTZManuelTurizo.m4a",
     img: "cover/Reggaeton/MírameAhora(SaludMiReina)MTZManuelTurizo.avif",
     singer: "MTZ Manuel Turizo",
     songtime: "2:34",
     karaoke: "",
     lyrics: "https://genius.com/Manuel-turizo-mirame-ahora-salud-mi-reina-lyrics"
   },
   {
     name: "Soso Remix",
     path: "music/Reggaeton/OmahLayXOzunaSosoRemixAFRO.m4a",
     img: "cover/Reggaeton/ozunaAfro.avif",
     singer: "Omah Lay X Ozuna",
     songtime: "3:05",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/omahlay/sosoremix.html"
   },
   {
     name: "Curarme El Alma",
     path: "music/Reggaeton/OzunaCurarmeElAlmaAfro.m4a",
     img: "cover/Reggaeton/ozunaAfro.avif",
     singer: "Ozuna",
     songtime: "2:00",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/curarmeelalma.html"
   },
   {
     name: "Isla Desierta",
     path: "music/Reggaeton/OzunaIslaDesiertaAfro.m4a",
     img: "cover/Reggaeton/ozunaAfro.avif",
     singer: "Ozuna",
     songtime: "2:56",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/isladesierta.html"
   },
   {
     name: "Una Perla En San Juan",
     path: "music/Reggaeton/OzunaUnaPerlaEnSanJuanAfro.m4a",
     img: "cover/Reggaeton/ozunaAfro.avif",
     singer: "Ozuna",
     songtime: "3:38",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/unaperlaensanjuan.html"
   }],

   // Chill Vibes
   [{
    name: "Dynamite",
    path: "songs/Dynamite.mp3",
    img: "img/Dynamite.jpeg",
    bgimg: "img/DynamiteBg.jpeg",
    singer: "Taio Cruz",
    songtime: "4:16",
    karaoke: "songs/DynamiteK.mp3",
    lyrics: "https://www.azlyrics.com/lyrics/taiocruz/dynamite.html"
   },
   {
     name: "Soweto",
     path: "songs/Soweto.mp3",
     img: "img/Soweto.jpeg",
     bgimg: "img/Sowetobg.webp",
     singer: "Victony, Tempoe",
     songtime: "?:??",
     karaoke: "songs/SowetoK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/victony/soweto.html"
   },
   {
     name: "Mood",
     path: "songs/Mood.mp3",
     img: "img/Mood.jpeg",
     bgimg: "img/Moodbg.jpeg",
     singer: "24kGoldn",
     songtime: "?:??",
     karaoke: "songs/MoodK.mp3",
     lyrics: "https://www.azlyrics.com/lyrics/24kgoldn/mood.html"
   }/*,
   {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

   // Electronic/Dance
   [{
    name: "Alone",
    path: "songs/Alone.mp3",
    img: "img/Alone.jpeg",
    bgimg: "img/AloneBg.jpeg",
    singer: "Marshmello",
    songtime: "?:??"
  },
  {
    name: "Levels",
    path: "songs/Levels.mp3",
    img: "img/Levels.jpeg",
    bgimg: "img/Levelsbg.webp",
    singer: "Avichi",
    songtime: "?:??"
  },
  {
    name: "Peru",
    path: "songs/Peru.mp3",
    img: "img/Peru.jpeg",
    bgimg: "img/Perubg.jpeg",
    singer: "Fireboy DML, Ed Sheeran",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

  // Pop
  [{
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.webp",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],

  // Afrobeats
  [{
    name: "Commando",
    path: "songs/Commando.mp3",
    img: "img/Commando.jpeg",
    bgimg: "img/CommandoBg.jpeg",
    singer: "Mavokali",
    songtime: "?:??"
  },
  {
    name: "Calm Down",
    path: "songs/CalmDown.mp3",
    img: "img/CalmDown.jpeg",
    bgimg: "img/CalmDownBg.jpeg",
    singer: "Rema",
    songtime: "?:??"
  },
  {
    name: "KU LO SA",
    path: "songs/KULOSA.mp3",
    img: "img/KULOSA.jpeg",
    bgimg: "img/KULOSABg.jpeg",
    singer: "Oxlade, Camila Cabello",
    songtime: "?:??"
  },
  {
    name: "Am I Wrong",
    path: "songs/AmIWrong.mp3",
    img: "img/AmIWrong.jpeg",
    bgimg: "img/AmIWrongBg.jpeg",
    singer: "Nico, Vinz",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/],
  
  // Hip-Hop/Rap
  [{
    name: "Up Down",
    path: "songs/UpDown.mp3",
    img: "img/UpDown.jpeg",
    bgimg: "img/UpDownBg.jpeg",
    singer: "T-Pain",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.webp",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }/*,
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  },
  {
    name: "???",
    path: "songs/.mp3",
    img: "img/.jpeg",
    bgimg: "img/Bg.jpeg",
    singer: "???",
    songtime: "?:??"
  }*/]
];

// All functions

window.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'k'){
    event.preventDefault();
    justplay();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'a'){
    event.preventDefault();
    autoplay_switch();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 's'){
    event.preventDefault();
    shuffle_toggle();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'm'){
    event.preventDefault();
    karaoke_toggle();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'c'){
    event.preventDefault();
    window.open(All_song[pl][index_no].lyrics, "_blank");
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'l'){
    event.preventDefault();
    forward_five_sec();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'j'){
    event.preventDefault();
    backward_five_sec();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'n'){
    event.preventDefault();
    next_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'p'){
    event.preventDefault();
    previous_song();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'r'){
    event.preventDefault();
    reset_slider();
    track.currentTime = 0;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
});

// reset song slider
function reset_slider() {
 	slider.value = 0;
}

// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();
	} else {
		pausesong();
	}
}

// play song
function playsong() {
    track.play();
    Playing_song = true;
    document.getElementById("faPlay").classList.add("fahide");
    document.getElementById("faPause").classList.remove("fahide");
}

// pause song
function pausesong() {
	track.pause();
	Playing_song = false;
    document.getElementById("faPlay").classList.remove("fahide");
    document.getElementById("faPause").classList.add("fahide");
}

// forward 5s
function forward_five_sec() {
    track.currentTime += 5;
    position = track.currentTime * (100 / track.duration);
	slider.value =  position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
}

// backward 5s
function backward_five_sec() {
    track.currentTime -= 5;
    position = track.currentTime * (100 / track.duration);
	slider.value =  position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
}

// next song
function next_song() {
	if (index_no < All_song[pl].length - 1) {
		index_no += 1;
		load_track(index_no);
	}
    else {
		index_no = 0;
		load_track(index_no);
	}
    // toggleKaraoke = 0;
    // kar.innerHTML = '<i class="fa-solid fa-microphone"></i>';
	reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
    playsong();
    updatePl();
}

// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
	}
    else {
		index_no = All_song[pl].length - 1;
		load_track(index_no);
	}
    // toggleKaraoke = 0;
    // document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
	reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
    playsong();
    updatePl();
}

function nextTitleShow(x) {
    let i;
    if (index_no < All_song[pl].length - 1) {
      i = index_no + 1;
    }
    else {
      i = 0;
    }
    x.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function previousTitleShow(x) {
    let i;
    if (index_no > 0) {
		i = index_no - 1;
	}
    else {
		i = All_song[pl].length - 1;
	}
    x.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function playPauseTitle(x) {
    if (Playing_song) {
        x.title = "Pause";
    }
    else {
        x.title = "Play";
    }
}

function load_track(index_no){
    clearInterval(timer);
	  reset_slider();
	  track.src = All_song[pl][index_no].path;
	  title.innerHTML = All_song[pl][index_no].name;
	  track_image.src = All_song[pl][index_no].img;
	  track_image_under.src = All_song[pl][index_no].img;
    artist.innerHTML = All_song[pl][index_no].singer;
    // totalTime.innerHTML = All_song[pl][index_no].songtime;
    track.load();
	  timer = setInterval(range_slider ,1000);
	  tot_song_num.innerHTML = All_song[pl].length;
	  cur_song_num.innerHTML = index_no + 1;
    document.title = All_song[pl][index_no].name + " - " + All_song[pl][index_no].singer;
}

track.addEventListener('loadedmetadata', () => {
  let trackTotTime = Math.floor(track.duration);
  let trackTotMin = Math.floor(trackTotTime/60);
  let trackTotSec = trackTotTime%60;
  trackTotSec = String(trackTotSec).padStart(2, '0');
  totalTime.innerHTML = `${trackTotMin}:${trackTotSec}`;
});

load_track(index_no);

// change slider position 
function change_duration(){
	// slider_position = track.duration * (slider.value / 100);
	// track.currentTime = slider_position;
    // let time = Math.floor(track.currentTime);
    // let minutes = Math.floor(time/60);
    // let secends = time%60;
    // secends = secends < 10 ? '0' + secends : secends;
    // m.innerHTML = minutes;
    // s.innerHTML = secends;
}

// autoplay function
function autoplay_toggle() {
	if (autoplay == 1) {
        autoplay = 0;
        auto_play.classList.remove("active");
    } else {
        autoplay = 1;
        auto_play.classList.add("active");
	}
}

function shuffle_toggle() {
    if (toggleShuffle == 1) {
        toggleShuffle = 0;
        shuffle.classList.remove("active");
    } else {
        toggleShuffle = 1;
        shuffle.classList.add("active");
	}
}

function karaoke_toggle() {
  // turn off
  if (toggleKaraoke == 1) {
    toggleKaraoke = 0;
    karaoke.classList.remove("active");
    karaoke.innerHTML = '<i class="fa-solid fa-microphone"></i>';
	  reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    pausesong();
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
  // turn on
  else {
    if (All_song[pl][index_no].karaoke != "") {
        toggleKaraoke = 1;
        karaoke.classList.add("active");
        karaoke.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        reset_slider();
        track.src = All_song[pl][index_no].karaoke;
        track.load();
        pausesong();
        let time = Math.floor(track.currentTime);
        let minutes = Math.floor(time/60);
        let secends = time%60;
        secends = String(secends).padStart(2, '0');
        m.innerHTML = minutes;
        s.innerHTML = secends;
    }
  }
}

document.getElementById("backBtnBox").addEventListener("click", function() {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function(){
      window.location.replace("index.html");
  }, 250);
});

document.getElementById("ccBox").addEventListener("click", function() {
    window.open(All_song[pl][index_no].lyrics, "_blank");
});

let forwardPause = false;
function forwardFive() {
    if (forwardPause == false) {
        forward_five_sec();
        forward_five.classList.add("forwardFiveBtnAnim");
        forwardPause = true;
        setTimeout(function() {
            forward_five.classList.remove("forwardFiveBtnAnim");
            forwardPause = false;
        }, 500);
    }
}

let backwardPause = false;
function backwardFive() {
    if (backwardPause == false) {
        backward_five_sec();
        backward_five.classList.add("backwardFiveBtnAnim");
        backwardPause = true;
        setTimeout(function() {
            backward_five.classList.remove("backwardFiveBtnAnim");
            backwardPause = false;
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const duration_slider = document.getElementById("duration_slider");
    duration_slider.addEventListener("input", function() {
        slider_position = track.duration * (slider.value / 100);
    	  track.currentTime = slider_position;
        let time = Math.floor(track.currentTime);
        let minutes = Math.floor(time/60);
        let secends = time%60;
        secends = String(secends).padStart(2, '0');
        m.innerHTML = minutes;
        s.innerHTML = secends;
    });
});

function range_slider(){
	  let position = 0;
        
    // update slider position
	  if(!isNaN(track.duration)){
	    position = track.currentTime * (100 / track.duration);
	    slider.value =  position;
	  }

    if(!isNaN(track.duration)){
      let time = Math.floor(track.currentTime);
      let minutes = Math.floor(time/60);
      let secends = time%60;
      secends = String(secends).padStart(2, '0');
      m.innerHTML = minutes;
      s.innerHTML = secends;
    }
       
    // function will run when the song is over
    if(track.ended) {
        // play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(autoplay == 1) {
            if(index_no < All_song[pl].length - 1) {
                index_no += 1;
                updatePl();
	              load_track(index_no);
	              playsong();
            }
            else {
                index_no = 0;
                updatePl();
                load_track(index_no);
	              playsong();
            }
        }
        else {
            pausesong();
        }
	  }
}

document.getElementById("plBtnBox").addEventListener("click", () => {
  document.getElementById("plCont").classList.add("show");
  document.getElementById("plBox").classList.add("show");
});

document.getElementById("plXBtn").addEventListener("click", () => {
  document.getElementById("plCont").classList.remove("show");
  document.getElementById("plBox").classList.remove("show");
});

function updatePl() {
  let plSongStripes = document.querySelectorAll(".plSong");
  let plSongImgAnims = document.querySelectorAll(".plSongImgAnim");
  for (let i = 0; i < All_song[pl].length; i++) {
    plSongStripes[i].classList.remove("active");
    plSongImgAnims[i].classList.remove("active");
    if (i == index_no) {
      plSongStripes[i].classList.add("active");
      plSongImgAnims[i].classList.add("active");
    }
  }
}

function setPl() {
  let newSong = "";
  pl_box.innerHTML = "";
  for (let i = 0; i < All_song[pl].length; i++) {
    newSong = `
    <div class="plSong" onclick="selectSong(${i})">
        <p class="plSongNum">${i+1}</p>
        <div class="plSongRight">
            <div class="plSongInfo">
                <p class="plSongName">${All_song[pl][i].name}</p>
                <p class="plSongArtists">${All_song[pl][i].singer}</p>
            </div>
            <div class="plSongImgBox">
                <img src="${All_song[pl][i].img}" alt="Song Cover Image" class="plSongImg">
                <div class="plSongImgAnim">
                    <div class="plSongImgAnimLine plSongImgAnimLine1"></div>
                    <div class="plSongImgAnimLine plSongImgAnimLine2"></div>
                    <div class="plSongImgAnimLine plSongImgAnimLine3"></div>
                </div>
            </div>
        </div>
    </div>
    `;
    pl_box.innerHTML+=newSong;
  }
  updatePl();
}
setPl();

function selectSong(songInd) {
  load_track(songInd);
  document.getElementById("plCont").classList.remove("show");
  document.getElementById("plBox").classList.remove("show");
  index_no = songInd;
  reset_slider();
  track.src = All_song[pl][index_no].path;
  track.load();
  let time = Math.floor(track.currentTime);
  let minutes = Math.floor(time/60);
  let secends = time%60;
  secends = String(secends).padStart(2, '0');
  m.innerHTML = minutes;
  s.innerHTML = secends;
  playsong();
  updatePl();
}