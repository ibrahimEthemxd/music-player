const image = document.getElementById("cover");
const background = document.getElementById("bg-img");
const title = document.getElementById("music-title");
const artist = document.getElementById("music-artist");
const currentTimeElement = document.getElementById("current-time");
const durationElement = document.getElementById("duration");
const playerProgress = document.getElementById("player-progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Yeni bir Audio nesnesi oluştur.
const music = new Audio();

// Müzik Listesi
const songs = [
    {
        path: "assets/mahzuni.mp3",
        displayName: "Dargın Mahkum",
        cover: "assets/mahzuni.jpg",
        artist: "Aşık Mahzuni Şerif",
    },
    {
        path: "assets/neset.mp3",
        displayName: "Sen Benimsin",
        cover: "assets/neset.jpg",
        artist: "Neşet Ertaş",
    },
    {
        path: "assets/ceza.mp3",
        displayName: "Med Cezir",
        cover: "assets/ceza.jpg",
        artist: "CEZA",
    },
    {
        path: "assets/gokhan.mp3",
        displayName: "Yerine Sevemem",
        cover: "assets/gokhan.jpg",
        artist: "Gökhan Kırdar",
    },
    {
        path: "assets/sebnem.mp3",
        displayName: "Daha İyi Olmaz mıydı",
        cover: "assets/sebnem.jpg",
        artist: "Şebnem Ferah",
    },
    {
        path: "assets/dengbej.mp3",
        displayName: "Dengbej Şakiro",
        cover: "assets/dengbej.jpg",
        artist: "İEÖ",
    },
    {
        path: "assets/halvet.mp3",
        displayName: "HİÇ",
        cover: "assets/halvet.jpg",
        artist: "Halvetimeşk",
    },
    {
        path: "assets/sara.mp3",
        displayName: "Küsüb Getdi",
        cover: "assets/sara.jpg",
        artist: "Sara Qədimova",
    },
    {
        path: "assets/ilahi.mp3",
        displayName: "Kardan Aydınlık",
        cover: "assets/ilahi.jpg",
        artist: "İEÖ",
    },
    {
        path: "assets/kirac.mp3",
        displayName: "Gidiyorum",
        cover: "assets/kirac.jpg",
        artist: "Kıraç",
    },
    {
        path: "assets/kamuran.mp3",
        displayName: "Bir Ateşe Attın",
        cover: "assets/kamuran.jpg",
        artist: "Kamuran Akkor",
    },
    {
        path: "assets/ceren.mp3",
        displayName: "Kirvem",
        cover: "assets/ceren.jpg",
        artist: "Ceren Deniz",
    },
    {
        path: "assets/sadik.mp3",
        displayName: "Demiri Toz Ederler",
        cover: "assets/sadik.jpg",
        artist: "Sadık Gürbüz",
    },
    {
        path: "assets/rencber.mp3",
        displayName: "Geçti Dost Kervanı",
        cover: "assets/rencber.jpg",
        artist: "Nurettin Rençber",
    },
    {
        path: "assets/nurettin.mp3",
        displayName: "Ezo",
        cover: "assets/nurettin.jpg",
        artist: "Nurettin Rençber",
    },
    {
        path: "assets/oguz.mp3",
        displayName: "Ağlatma Gelem",
        cover: "assets/oguz.jpg",
        artist: "Oğuz Aksaç",
    },
    {
        path: "assets/aslan.mp3",
        displayName: "Eski Libas",
        cover: "assets/aslan.jpg",
        artist: "Ahmet Aslan",
    },
    {
        path: "assets/taladro.mp3",
        displayName: "Dem",
        cover: "assets/taladro.jpg",
        artist: "Taladro",
    },
    {
        path: "assets/canfeza.mp3",
        displayName: "Çöl",
        cover: "assets/canfeza.jpg",
        artist: "Canfeza",
    },
    {
        path: "assets/ebru.mp3",
        displayName: "Seni Seviyorum",
        cover: "assets/ebru.jpg",
        artist: "Ebru Gündeş",
    }
];

let musicIndex = 0; // Çalınan müziği takip et
let isPlaying = false; // Müzik çalıyor mu kontrol

// Oynat/Duraklat fonk.
function togglePlay() {
    if (isPlaying) pauseMusic();
    else playMusic();
}

// Müziği başlat
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace("bi-play-fill", "bi-pause-fill");
    playBtn.setAttribute("title", "Duraklat");
    music.play();
}
//Müziği duraklat
function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace("bi-pause-fill", "bi-play-fill");
    playBtn.setAttribute("title", "Oynat");
    music.pause();
}

//Müziği yükle
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

//Müziği değiştir 
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// İlerleme çubuğunu günceller
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationElement.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeElement.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// İlerleme çubuğunu tıklanılan yere ayarla 
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);
loadMusic(songs[musicIndex]);