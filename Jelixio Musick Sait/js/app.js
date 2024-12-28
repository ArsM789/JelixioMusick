const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.section__musick-player-progress-bar');
const currentTimeEl = document.getElementById('corrent-time');
const durationEl = document.getElementById('duration');
const trackCover = document.getElementById('track-cover'); // или правильный селектор для вашего изображения
const trackTitle = document.getElementById('track-title'); // или правильный селектор для заголовка трека
const trackAuthor = document.getElementById('track-author')
const btnMusickList = document.getElementById('musick-list')
const btnTelegramChanell = document.getElementById('telegram-list')
const musickPage = document.getElementById('musick-page')
const aboutPage = document.getElementById('about-page')
const btnAboutList = document.getElementById('about-list')


btnAboutList.addEventListener('click', () => {
    musickPage.style.display = 'none'
    aboutPage.style.display = 'flex'
})

btnMusickList.addEventListener('click', (event) => {
    event.preventDefault()
    musickPage.style.display = 'flex'
    aboutPage.style.display = 'none'
})


btnTelegramChanell.addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = ('https://t.me/JelixioStore')
})


let currentTrack = 0;
let isPlaying = false;
let isTransitioning = false;
 
const tracks = [
    {
        name: 'хватит',
        cover: 'img/cover-tracks/хватит 2.png',
        src: 'assets/ХВАТИТ.mp3',
        author: 'Jelixio'
    },
    {
        name: 'Не слушай их',
        cover: 'img/cover-tracks/One-Way-2.jpg',
        src: 'assets/Не слушай их.mp3',
        author: 'Jelixio'
    },
    {
        name: "Who I'm?",
        cover: 'img/cover-tracks/Arseniy 1.jpg',
        src:"assets/Who I'm.mp3",
        author: 'Jelixio'
    },
    {
        name: 'You eyse',
        cover: 'img/cover-tracks/you eyse.jpg',
        src: 'assets/Your eyes.mp3',
        author: 'Jelixio, MZLE, 7teen'
    },
    {
        name: 'Night',
        cover: 'img/cover-tracks/night.jpg',
        src: 'assets/night.mp3',
        author: 'Jelixio, MZLE, 7teen'

    }
]

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    
    if (trackCover) {
        // Устанавливаем обложку
        trackCover.src = track.cover;

        // Устанавливаем изображение для track-cover-ba
    }
    
    if (trackTitle) {
        trackTitle.textContent = track.name;
    }

    if (trackAuthor) {
        trackAuthor.textContent = track.author;
    }
    audio.src = track.src;
}

async function playTrack() {
    if (isTransitioning) return;
    
    try {
        isTransitioning = true;
        await audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = `<i class="bx bx-pause"></i>`;
    } catch (error) {
        console.log("Ошибка воспроизведения:", error);
        isPlaying = false;
        playPauseBtn.innerHTML = `<i class="bx bx-play"></i>`;
    } finally {
        isTransitioning = false;
    }
}

function pauseTrack() {
    if (isTransitioning) return;
    
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="bx bx-play"></i>`;
}

async function togglePlayPause() {
    if (isTransitioning) return;
    
    if (!isPlaying) {
        await playTrack();
    } else {
        pauseTrack();
    }
}

async function prevTrack() {
    if (isTransitioning) return;
    
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        await playTrack();
    }
}

async function nextTrack() {
    if (isTransitioning) return;
    
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) {
        await playTrack();
    }
}



function updateProgress() {
    if(audio.duration > 0) {
        const progressPercent = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressPercent}%`
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

function setProgress(event){
    const width = this.clientWidth;
    const clickX = event.offsetX
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
 }

 function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function setDuration() {
    durationEl.textContent = formatTime(audio.duration)
}



loadTrack(currentTrack);
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('loadedmetadata', setDuration)
progressContainer.addEventListener('click', setProgress);