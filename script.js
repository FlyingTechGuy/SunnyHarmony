import { All_song } from './songsList.js';

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
let forward_five_btn = document.querySelector('#forwardFiveBtn');
let backward_five = document.querySelector('#fiveSecBackward');
let backward_five_btn = document.querySelector('#backwardFiveBtn');
let cur_song_num = document.querySelector('#songNumCur');
let tot_song_num = document.querySelector('#songNumTot');
let m = document.querySelector('#m');
let s = document.querySelector('#s');
let totalTime = document.querySelector('#totalTime');
let pl_box = document.querySelector('#plSongsBox');
// let styleDir = document.querySelector('[data="dir"]');

let timer;
let autoplay = 1;
let toggleShuffle = 0;
let toggleKaraoke = 0;

let pl = 0;
let index_no = 0;
let shuffledIndex = 0;
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

// All songs list
// * Moved to an external file *

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
    autoplay_toggle();
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
    forwardFive();
  }
});

window.addEventListener("keydown" , (event) => {
  if (event.key === 'j'){
    event.preventDefault();
    backwardFive();
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
  if (event.shiftKey && event.key === 'P'){
    event.preventDefault();
    document.getElementById("plCont").classList.toggle("show");
    document.getElementById("plBox").classList.toggle("show");
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
    if (toggleShuffle == 1) {
      if(shuffledIndex < All_song[pl].length - 1) {
        shuffledIndex += 1;
      }
      else {
        shuffledIndex = 0;
      }
      index_no = plindexes[shuffledIndex];
    }
    else {
      if (index_no < All_song[pl].length - 1) {
        index_no += 1;
      }
      else {
        index_no = 0;
      }
    }
    // toggleKaraoke = 0;
    // kar.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    load_track(index_no);
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
    if (toggleShuffle == 1) {
      if(shuffledIndex > 0) {
        shuffledIndex -= 1;
      }
      else {
        shuffledIndex = All_song[pl].length - 1;
      }
      index_no = plindexes[shuffledIndex];
    }
    else {
      if (index_no > 0) {
        index_no -= 1;
      }
        else {
        index_no = All_song[pl].length - 1;
      }
    }
    // toggleKaraoke = 0;
    // document.getElementById('karaokeOnOff').innerHTML = '<i class="fa-solid fa-microphone"></i>';
    load_track(index_no);
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

function nextTitleShow() {
    let i;
    if (index_no < All_song[pl].length - 1) {
      i = index_no + 1;
    }
    else {
      i = 0;
    }
    next.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function previousTitleShow() {
    let i;
    if (index_no > 0) {
		  i = index_no - 1;
	  }
    else {
		  i = All_song[pl].length - 1;
	  }
    previous.title = All_song[pl][i].name + " - " + All_song[pl][i].singer;
}

function playPauseTitle() {
    if (Playing_song) {
        play.title = "Pause";
    }
    else {
        play.title = "Play";
    }
}

function load_track(index_no) {
    clearInterval(timer);
	  reset_slider();
	  track.src = All_song[pl][index_no].path;
	  title.innerHTML = All_song[pl][index_no].name;
	  track_image.src = All_song[pl][index_no].img;
	  track_image_under.src = All_song[pl][index_no].img;
    artist.innerHTML = All_song[pl][index_no].singer;
    // totalTime.innerHTML = All_song[pl][index_no].songtime;
    track.load();
    let time = Math.floor(track.currentTime);
    let minutes = Math.floor(time/60);
    let secends = time%60;
    secends = String(secends).padStart(2, '0');
    m.innerHTML = minutes;
    s.innerHTML = secends;
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

// change slider position 
// function change_duration() {
// 	slider_position = track.duration * (slider.value / 100);
// 	track.currentTime = slider_position;
//   let time = Math.floor(track.currentTime);
//   let minutes = Math.floor(time/60);
//   let secends = time%60;
//   secends = secends < 10 ? '0' + secends : secends;
//   m.innerHTML = minutes;
//   s.innerHTML = secends;
// }

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

let plindexes = Array.from({ length: All_song[pl].length }, (_, i) => i);
function shufflePl() {
  plindexes = Array.from({ length: All_song[pl].length }, (_, i) => i);
  for (let i = plindexes.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [plindexes[i], plindexes[j]] = [plindexes[j], plindexes[i]];
  }
  console.log(plindexes);
}

function shuffle_toggle() {
    if (toggleShuffle == 1) {
        toggleShuffle = 0;
        shuffle.classList.remove("active");
        document.getElementById("plBtnBox").style.opacity = 1;
        document.getElementById("plBtnBox").addEventListener("click", addShowPlBox);
        shuffledIndex = 0;
      } else {
        toggleShuffle = 1;
        shuffle.classList.add("active");
        document.getElementById("plBtnBox").style.opacity = 0.5;
        document.getElementById("plBtnBox").removeEventListener("click", addShowPlBox);
        shufflePl();
        index_no = plindexes[shuffledIndex];
        load_track(index_no);
        playsong();
        updatePl();
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
  if (All_song[pl][index_no].lyrics != "") {
    window.open(All_song[pl][index_no].lyrics, "_blank");
  }
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

karaoke.addEventListener("click", karaoke_toggle);
shuffle.addEventListener("click", shuffle_toggle);
previous.addEventListener("click", previous_song);
previous.addEventListener("mouseover", previousTitleShow);
play.addEventListener("click", justplay);
previous.addEventListener("mouseover", playPauseTitle);
next.addEventListener("click", next_song);
previous.addEventListener("mouseover", nextTitleShow);
auto_play.addEventListener("click", autoplay_toggle);
// slider.addEventListener("change", change_duration);
forward_five_btn.addEventListener("click", forwardFive);
backward_five_btn.addEventListener("click", backwardFive);

let slider_position;
document.addEventListener("DOMContentLoaded", function() {
    switch (localStorage.getItem("~curGenre")) {
      case "0":
        genre.innerHTML = "Reggaeton";
        pl = 0;
        setPl();
        load_track(index_no);
        break;
      case "1":
        genre.innerHTML = "Chill Vibes";
        pl = 1;
        setPl();
        load_track(index_no);
        break;
      default:
        console.log("Error loadding genre");
        break;
    }
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

    let plSongsOverlay = document.querySelectorAll(".plSongOverlay");
    plSongsOverlay.forEach(plSongsButton => {
      plSongsButton.addEventListener('click', (event) => {
          selectSong(Number(event.target.dataset.id));
          console.log(event.target.dataset.id);
      });
    });
});

let position = 0;
function range_slider() {
    // update slider position
	  if(!isNaN(track.duration)) {
	    position = track.currentTime * (100 / track.duration);
	    slider.value =  position;
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
          if (toggleShuffle == 1) {
            if(shuffledIndex < All_song[pl].length - 1) {
                shuffledIndex += 1;
            }
            else {
                shuffledIndex = 0;
            }
            index_no = plindexes[shuffledIndex];
          }
          else {
            if(index_no < All_song[pl].length - 1) {
                index_no += 1;
            }
            else {
                index_no = 0;
            }
          }
          load_track(index_no);
          playsong();
          updatePl();
        }
        else {
            pausesong();
        }
	  }
}

function addShowPlBox() {
  document.getElementById("plCont").classList.add("show");
  document.getElementById("plBox").classList.add("show");
  let activatedSong = document.querySelector(".activated");
  if (activatedSong) {
    setTimeout(() => {
      activatedSong.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }, 500);
  }
}

document.getElementById("plBtnBox").addEventListener("click", addShowPlBox);

document.getElementById("plXBtn").addEventListener("click", () => {
  document.getElementById("plCont").classList.remove("show");
  document.getElementById("plBox").classList.remove("show");
});

function updatePl() {
  let plSongStripes = document.querySelectorAll(".plSong");
  let plSongImgAnims = document.querySelectorAll(".plSongImgAnim");
  for (let i = 0; i < All_song[pl].length; i++) {
    plSongStripes[i].classList.remove("activated");
    plSongImgAnims[i].classList.remove("active");
    if (i == index_no) {
      plSongStripes[i].classList.add("activated");
      plSongImgAnims[i].classList.add("active");
    }
  }
  let activatedSong = document.querySelector(".activated");
  if (activatedSong) {
    setTimeout(() => {
      activatedSong.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }, 500);
  }
}

function setPl() {
  let newSong = "";
  pl_box.innerHTML = "";
  for (let i = 0; i < All_song[pl].length; i++) {
    newSong = `
    <div class="plSong">
        <div class="plSongOverlay" data-id="${i}"></div>
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

// function setupMarquee() {
//     const plcontainers = document.querySelectorAll('.plSongInfo');
//     plcontainers.forEach(plcontainer => {
//         const text1 = plcontainer.querySelector('.plSongName');
//         const text2 = plcontainer.querySelector('.plSongArtists');
//         const plcontainerWidth = plcontainer.clientWidth;
//         const pltext1Width = text1.scrollWidth;
//         const pltext2Width = text2.scrollWidth;
//         if (pltext1Width > plcontainerWidth) {
//             const pldistanceToMove = pltext1Width - plcontainerWidth;
//             function runAnimation1() {
//                 setTimeout(() => {
//                     text1.style.transform = `translateX(${pldistanceToMove+10}px)`;
//                 }, 1500);
//                 setTimeout(() => {
//                     text1.style.transform = 'translateX(0px)';
//                 }, 6000); 
//             }
//             runAnimation1();
//             setInterval(runAnimation1, 9500);
//         }
//         if (pltext2Width > plcontainerWidth) {
//             const pldistanceToMove = pltext2Width - plcontainerWidth;
//             function runAnimation2() {
//                 setTimeout(() => {
//                     text2.style.transform = `translateX(${pldistanceToMove+10}px)`;
//                 }, 1500);
//                 setTimeout(() => {
//                     text2.style.transform = 'translateX(0px)';
//                 }, 6000); 
//             }
//             runAnimation2();
//             setInterval(runAnimation2, 9500);
//         }
//     });
// }
// window.addEventListener('load', setupMarquee);

// function setupStrictConstantSpeed() {
//   const plcontainers = document.querySelectorAll('.plSongInfo');
//   const SPEED_PX_PER_SEC = 15; 
//   const START_HOLD_SEC = 1.5; // כמה זמן להמתין בהתחלה לפני שזזים
//   const END_HOLD_SEC = 1.5;   // כמה זמן להמתין בסוף לפני שחוזרים
//   plcontainers.forEach((plcontainer, index) => {
//     const pltext1 = plcontainer.querySelector('.plSongName');
//     const pltext2 = plcontainer.querySelector('.plSongArtists');
//     const plcontainerWidth = plcontainer.clientWidth;
//     const pltext1Width = pltext1.scrollWidth;
//     const pltext2Width = pltext2.scrollWidth;
//     if (pltext1Width > plcontainerWidth) {
//       const pltext1distance = pltext1Width - plcontainerWidth; // המרחק שצריך לעבור בפיקסלים
//       // חישוב הזמן נטו שלוקח לטקסט לנוע צד אחד (הלוך) לפי המהירות שהגדרנו
//       const pltext1moveTimeSec = pltext1distance / SPEED_PX_PER_SEC;
//       // סך כל הזמן של מחזור אנימציה שלם (הלוך + חזור + שתי עצירות בקצוות)
//       const pltext1totalDurationSec = (pltext1moveTimeSec * 2) + START_HOLD_SEC + END_HOLD_SEC;
//       // תרגום זמני העצירות והתנועה לאחוזים מדויקים מתוך ה-100% של האנימציה
//       const pltext1p1 = (START_HOLD_SEC / pltext1totalDurationSec) * 100;
//       const pltext1p2 = ((START_HOLD_SEC + pltext1moveTimeSec) / pltext1totalDurationSec) * 100;
//       const pltext1p3 = ((START_HOLD_SEC + pltext1moveTimeSec + END_HOLD_SEC) / pltext1totalDurationSec) * 100;
//       // יצירת שם ייחודי לאנימציה
//       const pltext1animationName = `strict-bounce-${index}`;
//       // הזרקת ה-CSS הדינמי עם האחוזים המחושבים ספציפית לפי אורך הטקסט הזה
//       const pltext1style = document.createElement('style');
//       pltext1style.innerHTML = `
//           @keyframes ${pltext1animationName} {
//               0%, ${pltext1p1}% { transform: translateX(0); } /* עצירה בהתחלה */
//               ${pltext1p2}%, ${pltext1p3}% { transform: translateX(${pltext1distance}px); } /* תנועה ועצירה בסוף */
//               100% { transform: translateX(0); } /* חזרה להתחלה */
//           }
//       `;
//       document.head.appendChild(pltext1style);
//       pltext1.style.animation = `${pltext1animationName} ${pltext1totalDurationSec}s linear infinite`;
//     }
//     if (pltext2Width > plcontainerWidth) {
//       const pltext2distance = pltext2Width - plcontainerWidth; // המרחק שצריך לעבור בפיקסלים
//       // חישוב הזמן נטו שלוקח לטקסט לנוע צד אחד (הלוך) לפי המהירות שהגדרנו
//       const pltext2moveTimeSec = pltext2distance / SPEED_PX_PER_SEC;
//       // סך כל הזמן של מחזור אנימציה שלם (הלוך + חזור + שתי עצירות בקצוות)
//       const pltext2totalDurationSec = (pltext2moveTimeSec * 2) + START_HOLD_SEC + END_HOLD_SEC;
//       // תרגום זמני העצירות והתנועה לאחוזים מדויקים מתוך ה-100% של האנימציה
//       const pltext2p1 = (START_HOLD_SEC / pltext2totalDurationSec) * 100;
//       const pltext2p2 = ((START_HOLD_SEC + pltext2moveTimeSec) / pltext2totalDurationSec) * 100;
//       const pltext2p3 = ((START_HOLD_SEC + pltext2moveTimeSec + END_HOLD_SEC) / pltext2totalDurationSec) * 100;
//       // יצירת שם ייחודי לאנימציה
//       const pltext2animationName = `strict-bounce-${index}`;
//       // הזרקת ה-CSS הדינמי עם האחוזים המחושבים ספציפית לפי אורך הטקסט הזה
//       const pltext2style = document.createElement('style');
//       pltext2style.innerHTML = `
//           @keyframes ${pltext2animationName} {
//               0%, ${pltext2p1}% { transform: translateX(0); } /* עצירה בהתחלה */
//               ${pltext2p2}%, ${pltext2p3}% { transform: translateX(${pltext2distance}px); } /* תנועה ועצירה בסוף */
//               100% { transform: translateX(0); } /* חזרה להתחלה */
//           }
//       `;
//       document.head.appendChild(pltext2style);
//       pltext2.style.animation = `${pltext2animationName} ${pltext2totalDurationSec}s linear infinite`;
//     }
//   });
// }
// window.addEventListener('load', setupStrictConstantSpeed);

function initPerfectMarquee(plelement) {
  const plcontainers = document.querySelectorAll('.plSongInfo');
  const SPEED_PIXELS_PER_SECOND = 15; 
  const HOLD_DELAY = 1500;
  plcontainers.forEach(container => {
      const text = container.querySelector(`.${plelement}`); // '.plSongArtists'
      const containerWidth = container.clientWidth;
      const textWidth = text.scrollWidth;
      if (textWidth > containerWidth) {
          const distance = textWidth - containerWidth;
          const duration = (distance / SPEED_PIXELS_PER_SECOND) * 1000;
          function startAnimationLoop() {
              setTimeout(() => {
                  const animation = text.animate(
                      [
                          { transform: 'translateX(0px)' },
                          { transform: `translateX(${distance}px)` }
                      ], 
                      {
                          duration: duration,
                          easing: 'linear',
                          fill: 'forwards'
                      }
                  );
                  animation.onfinish = () => {
                      setTimeout(() => {
                          const returnAnimation = text.animate(
                              [
                                  { transform: `translateX(${distance}px)` },
                                  { transform: 'translateX(0px)' }
                              ], 
                              {
                                  duration: duration,
                                  easing: 'linear',
                                  fill: 'forwards'
                              }
                          );
                          returnAnimation.onfinish = startAnimationLoop;
                      }, HOLD_DELAY);
                  };
              }, HOLD_DELAY);
          }
          startAnimationLoop();
      }
  });
}
window.addEventListener('load', () => {
  initPerfectMarquee("plSongName");
  initPerfectMarquee("plSongArtists");
});