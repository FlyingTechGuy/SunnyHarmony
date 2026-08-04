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
let karaoke = document.querySelector('#kBtnBox');
let forward_five = document.querySelector('#fiveSecForward');
let backward_five = document.querySelector('#fiveSecBackward');
let cur_song_num = document.querySelector('#songNumCur');
let tot_song_num = document.querySelector('#songNumTot');
let m = document.querySelector('#m');
let s = document.querySelector('#s');
let total_time = document.querySelector('#totalTime');
// let styleDir = document.querySelector('[data="dir"]');


let timer;
let autoplay = 0;
let toggleKaraoke = 0;

let pl = 0;
let index_no = 0;
let Playing_song = false;

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
    secends = secends < 10 ? '0' + secends : secends;
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
     path: "music/Reggaeton/Anuel AA & Haze AMANECE.mp3",
     img: "cover/Reggaeton/Anuel AA & Haze AMANECE.jpg",
     singer: "Anuel AA & Haze",
     songtime: "3:11",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/anuelaa/amanece.html"
   },
   {
     name: "Canción Bonita",
     path: "music/Reggaeton/Carlos Vives, Ricky Martin - Canción Bonita.mp3",
     img: "cover/Reggaeton/Carlos Vives, Ricky Martin - Canción Bonita.jpg",
     singer: "Carlos Vives, Ricky Martin",
     songtime: "2:59",
     karaoke: "",
     lyrics: "https://genius.com/Carlos-vives-and-ricky-martin-cancion-bonita-lyrics"
   },
   {
     name: "X ESO BB!",
     path: "music/Reggaeton/JERE KLEIN & NICKI NICOLE - X ESO BB! ENFASIS.mp3",
     img: "cover/Reggaeton/JERE KLEIN & NICKI NICOLE - X ESO BB! ENFASIS.jpg",
     singer: "JERE KLEIN & NICKI NICOLE",
     songtime: "3:20",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/jereklein/xesobb.html"
   },
   {
     name: "Mírame Ahora",
     path: "music/Reggaeton/Mírame Ahora (Salud Mi Reina) - MTZ Manuel Turizo.mp3",
     img: "cover/Reggaeton/Mírame Ahora (Salud Mi Reina) - MTZ Manuel Turizo.jpg",
     singer: "MTZ Manuel Turizo",
     songtime: "2:34",
     karaoke: "",
     lyrics: "https://genius.com/Manuel-turizo-mirame-ahora-salud-mi-reina-lyrics"
   },
   {
     name: "Soso Remix",
     path: "music/Reggaeton/Omah Lay X Ozuna - Soso Remix AFRO.mp3",
     img: "cover/Reggaeton/ozunaAfro.jpg",
     singer: "Omah Lay X Ozuna",
     songtime: "3:05",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/omahlay/sosoremix.html"
   },
   {
     name: "Curarme El Alma",
     path: "music/Reggaeton/Ozuna - Curarme El Alma Afro.mp3",
     img: "cover/Reggaeton/ozunaAfro.jpg",
     singer: "Ozuna",
     songtime: "2:00",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/curarmeelalma.html"
   },
   {
     name: "Isla Desierta",
     path: "music/Reggaeton/Ozuna - Isla Desierta Afro.mp3",
     img: "cover/Reggaeton/ozunaAfro.jpg",
     singer: "Ozuna",
     songtime: "2:56",
     karaoke: "",
     lyrics: "https://www.azlyrics.com/lyrics/ozuna/isladesierta.html"
   },
   {
     name: "Una Perla En San Juan",
     path: "music/Reggaeton/Ozuna - Una Perla En San Juan Afro.mp3",
     img: "cover/Reggaeton/ozunaAfro.jpg",
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
    secends = secends < 10 ? '0' + secends : secends;
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
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

// pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

// forward 5s
function forward_five_sec() {
    track.currentTime += 5;
    position = track.currentTime * (100 / track.duration);
	slider.value =  position;
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
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
    secends = secends < 10 ? '0' + secends : secends;
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
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
    playsong();
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
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
    playsong();
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
    totalTime.innerHTML = All_song[pl][index_no].songtime;
    track.load();
	timer = setInterval(range_slider ,1000);
	tot_song_num.innerHTML = All_song[pl].length;
	cur_song_num.innerHTML = index_no + 1;
    document.title = All_song[pl][index_no].name + " - " + All_song[pl][index_no].singer;
}

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

function karaoke_toggle() {
  // turn off
  if (toggleKaraoke == 1) {
    toggleKaraoke = 0;
    karaoke.classList.remove("active");
	reset_slider();
    track.src = All_song[pl][index_no].path;
    track.load();
    pausesong();
    // document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone sicon"></i>';
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = secends < 10 ? '0' + secends : secends;
    m.innerHTML = minutes;
    s.innerHTML = secends;
  }
  // turn on
  else {
    if (All_song[pl][index_no].karaoke != "") {
        toggleKaraoke = 1;
        karaoke.classList.add("active");
        reset_slider();
        track.src = All_song[pl][index_no].karaoke;
        track.load();
        pausesong();
        // document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone-slash sicon"></i>';
        let time = Math.floor(track.currentTime);
        let minutes = Math.floor(time/60);
        let secends = time%60;
        secends = secends < 10 ? '0' + secends : secends;
        m.innerHTML = minutes;
        s.innerHTML = secends;
    }
  }
}

document.getElementById("backBtnBox").addEventListener("click", function() {
    window.location.replace("index.html");
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
        secends = secends < 10 ? '0' + secends : secends;
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
      secends = secends < 10 ? '0' + secends : secends;
      m.innerHTML = minutes;
      s.innerHTML = secends;
    }
       
    // function will run when the song is over
    if(track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(autoplay == 1){
            if(index_no < All_song[pl].length - 1) {
                index_no += 1;
	            load_track(index_no);
	            playsong();
            }
            else {
                index_no = 0;
                load_track(index_no);
	            playsong();
            }
        }
	}
}