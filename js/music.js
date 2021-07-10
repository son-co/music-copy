const $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),

    nameSong = $('header h2'),
    singer = $('header h3'),
    cdThumb = $('.cd-thumb'),
    audio = $('#audio'),
    cd = $('.cd'),
    playBtn = $('.btn-toggle-play'),
    player = $('.player'),
    progress = $('#progress'),
    prevBtn = $('.btn-prev'),
    nextBtn = $('.btn-next'),
    playlist = $('.playlist'),
    repeatBtn = $('.btn-repeat'),
    randomBtn = $('.btn-random'),
    timeProgress = $('.viewTime-progress'),
    timeDuration = $('.viewTime-duration'),

    canvasElm = $('#canvas'),
    volume = $('.volume'),
    volumeUp = $('.volume-up'),
    volumeDown = $('.volume-down'),
    volumeViewPercent = $('.volume-percent'),

    PLAYER_STORAGE_KEY = 'MY_PLAYER';

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    currentVolume: 100,
    maxVolume: 100,

    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    /*
        Link music online
        https://c1-ex-swe.nixcdn.com/NhacCuaTui876/CheerUp-HongJinYoung-3635924.mp3?st=rkL8BedHxWY1gOi0WKzSIg&e=1624036845&t=1623950162633
        https://c1-ex-swe.nixcdn.com/NhacCuaTui1005/BatQuaNhanGian-HaiLaiAMocHaiLaiAMu-6791817.mp3?st=M2pzY34UajbNHLOzM9KB2A&e=1624036707&t=1623950024473
        https://c1-ex-swe.nixcdn.com/NhacCuaTui960/VenRemChau-HoacTonHenryHuo-3115720.mp3?st=TCs4csKuGFzBVJ4dlCeMxg&e=1624036891&t=1623950208477
        https://c1-ex-swe.nixcdn.com/NhacCuaTui962/TayTraiChiTrang-TatDinhDinhSaDingDing-5431513.mp3?st=QR-bJtdjJ5r2a8hKSZ4DtQ&e=1624036960&t=1623950277683
        https://c1-ex-swe.nixcdn.com/NhacCuaTui1012/MoHaDJRemix-DangThapYeuQuanDengShenMeJun-6963420.mp3?st=jiVGL0paHyt1mYehZXDB-Q&e=1624037002&t=1623950319955
        https://f9-stream.nixcdn.com/NhacCuaTui1017/ConBaoTinhYeuDJTieuTieuRemix-MongHamMengHan-7023336.mp3?st=geQGlonen78Jgnn34Ev80Q&e=1624037043&t=1623950361097
        https://c1-ex-swe.nixcdn.com/NhacCuaTui995/TamNgoaiGiangHo-AmKhuyetThiThinhTrieuPhuongTinh-6216579.mp3?st=2_jA-iI7-T_gcmQ1Vt1F-Q&e=1624037086&t=1623950403648
        https://c1-ex-swe.nixcdn.com/YG_Audio1/OnTheGround-ROSE-6964051.mp3?st=5kss2JX2Pt-BBkkf2cJL5Q&e=1624037343&t=1623950661265
        https://c1-ex-swe.nixcdn.com/NhacCuaTui1011/Celebrity-IU-6938138.mp3?st=NeJZHKG68Nu-65ms3hZvAg&e=1624037466&t=1623950783417
    */

    songs: [{
            name: 'Cheer Up',
            singer: 'Hong Jin Young',
            path: '../music/CheerUp-HongJinYoung-3635924.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2018/04/18/5/1/3/1/1524044109208_640.jpg'
        },
        {
            name: 'Bất quá nhân gian',
            singer: 'Hải Lai A Mộc',
            path: '../music/BatQuaNhanGian-HaiLaiAMocHaiLaiAMu-6791817.mp3',
            image: 'https://data.chiasenhac.com/data/cover/120/119550.jpg'
        },
        {
            name: 'Vén rèm châu',
            singer: 'Hoắc tôn',
            path: './musics/Ven-Rem-Chau.mp3',
            image: 'https://tuthanhca16.files.wordpress.com/2016/05/henry-huo-zun-tianyu-heavenly-song-album-580x8261.jpg?w=640'
        },
        {
            name: 'Tay trái chỉ trăng',
            singer: 'Tát đỉnh đỉnh',
            path: './musics/Tay-Trai-Chi-Trang.mp3',
            image: 'https://i.ytimg.com/vi/ATPulcGQ2SE/maxresdefault.jpg'
        },
        {
            name: 'Mộ Hạ - Remix',
            singer: 'Đẳng thập ma quân',
            path: './musics/Mo-Ha.mp3',
            image: 'https://i.pinimg.com/736x/a6/b5/cb/a6b5cbf01280bd07012f9a687fae0077.jpg'
        },
        {
            name: 'Cơn bão tình yêu',
            singer: 'Mộng hàm',
            path: './musics/Con-Bao-Tinh-Yeu.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/10/14/4/5/d/0/1476435530018_600.jpg'
        },
        {
            name: 'Tâm ngoại giang hồ',
            singer: 'Âm khuyết thị thịnh',
            path: './musics/Tam-Ngoai-Giang-Ho.mp3',
            image: 'https://i.ytimg.com/vi/LtO8Ipux3NY/maxresdefault.jpg'
        },
        {
            name: 'Vây Giữ',
            singer: 'Vương Tử Tiểu Kiều',
            path: '../music/vaygiu.mp3',
            image: 'https://hieuungchu.com/wp-content/uploads/2020/08/Rose-Blackpink.jpg'
        },
        {
            name: 'Họ Yêu Ai Mất Rồi',
            singer: 'Doãn Hiếu',
            path: '../music/hoyeuaimatroi.mp3',
            image: 'data:image/jpeg;base64,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'
        },
        {
            name: 'Celebrity',
            singer: 'IU',
            path: '../music/Celebrity-IU-6938138.mp3',
            image: 'https://static2.yan.vn/YanNews/2167221/201908/iu-la-ai-tinh-yeu-su-nghiep-bai-hat-cua-iu-4bb930f2.jpg'
        }
    ],

    setConfig: function(key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipses-h">...</i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    handleEvents: function() {
        const cdWidth = cd.offsetWidth
        const _this = this

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 100 ? newCdWidth + 'px' : 100 + 'px'
                // cd.style.opacity = newCdWidth/cdWidth
        }

        // method animate: ----> (selector).animate({style},{option})
        const cdThumbAnimate = cdThumb.animate({ transform: 'rotate(360deg)' }, {
            duration: 10000, // 10s
            iterations: Infinity // lặp vô tận
        })

        randomBtn.onclick = function() {
            /*if (_this.isRandom) {
                _this.isRandom = false
                randomBtn.classList.remove('active')
            }else {
                _this.isRandom = true
                randomBtn.classList.add('active')
            }*/
            // hoặc có thể thay thế bằng 2 câu lệnh bên dưới này
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.loadRandomSong()
            } else {
                _this.loadNextSong()
            }
            audio.play()
            _this.scrollToActiveSong()
        }

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.loadRandomSong()
            } else {
                _this.loadPrevSong()
            }
            audio.play()
            _this.scrollToActiveSong()
        }

        playBtn.onclick = function() {
            return !_this.isPlaying ? audio.play() : audio.pause()
        }

        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()

            _this.renderEqualizer()
        }

        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            timeProgress.textContent = parseFloat(audio.currentTime / 60).toFixed(2)
            timeDuration.textContent = parseFloat(audio.duration / 60).toFixed(2)
        }

        audio.onended = function() {
            return _this.isRepeat ? audio.play() : nextBtn.onclick()
        }

        progress.onchange = function() {
            const seekTime = progress.value / 100 * audio.duration
            audio.currentTime = seekTime
        }

        playlist.onclick = function(e) {
                const songNode = e.target.closest('.song:not(.active)')
                const optionNode = e.target.closest('.option')
                if (songNode || optionNode) {
                    // Xử lý khi click vào bài hát
                    if (songNode) {
                        _this.currentIndex = songNode.getAttribute('data-index') // hoặc có thể dùng songNode.dataset.index
                        _this.loadCurrentSong()
                        audio.play()
                    }

                    // Xử lý khi click vào option ...
                    if (e.target.closest('.option')) {

                    }
                }
            }
            // Xử lý volume
        volumeDown.onmousedown = function() {
            if (_this.currentVolume > 0) {
                _this.currentVolume--
                    _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volumeUp.onmousedown = function() {
            if (_this.currentVolume < 100) {
                _this.currentVolume++
                    _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volume.onchange = function() {
            _this.currentVolume = volume.value
            _this.changeVolume(_this.currentVolume)
            volume.value = _this.currentVolume
        }
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    renderEqualizer: function() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext = new AudioContext();
        var audioContextSrc = audioContext.createMediaElementSource(audio);
        console.log(audioContextSrc)
        var audioAnalyser = audioContext.createAnalyser();
        canvasContext = canvasElm.getContext("2d");

        audioContextSrc.connect(audioAnalyser);
        audioAnalyser.connect(audioContext.destination);

        // Gán FFT size là 256 cho Analyser        
        audioAnalyser.fftSize = 256;
        var analyserFrequencyLength = audioAnalyser.frequencyBinCount;
        var frequencyDataArray = new Uint8Array(analyserFrequencyLength);
        // Lấy width và height của canvas
        var canvasWith = canvasElm.width;
        var canvasHeight = canvasElm.height;
        // Tính toán barWidth và barHeight
        var barWidth = (canvasWith / analyserFrequencyLength) * 2.5;
        var barHeight;
        var barIndex = 0;

        function renderFrame() {

            window.requestAnimationFrame(renderFrame);
            barIndex = 0;
            audioAnalyser.getByteFrequencyData(frequencyDataArray);
            canvasContext.fillStyle = "#eee";
            canvasContext.fillRect(0, 0, canvasWith, canvasHeight);
            for (var i = 0; i < analyserFrequencyLength; i++) {
                barHeight = frequencyDataArray[i] + 100;
                // Tạo màu cho thanh bar
                var rgbRed = barHeight + (15 * (i / analyserFrequencyLength));
                var rgbGreen = 255 * (i / analyserFrequencyLength);
                var rgbBlue = 5;

                // Điền màu và vẽ bar
                canvasContext.fillStyle = "rgb(" + rgbRed + ", " + rgbGreen + ", " + rgbBlue + ")";
                canvasContext.fillRect(barIndex, (canvasHeight - barHeight), barWidth, barHeight);
                barIndex += (barWidth + 1);
            }
        }
        renderFrame();
    },

    loadCurrentSong: function() {
        nameSong.textContent = this.currentSong.name
        singer.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

        // kiểm tra xem có bài nào active chưa, nếu có thì xoá active đi
        const inActiveSong = playlist.querySelector('div.song.active')
        if (inActiveSong) {
            inActiveSong.classList.remove('active')
        }
        // sau đó active cho bài hiện tại
        const activeSong = playlist.querySelectorAll('div.song')
        activeSong[this.currentIndex].classList.add('active')

        this.changeVolume(this.currentVolume)

        canvasElm.width = window.innerWidth
        canvasElm.height = window.innerHeight
    },

    loadNextSong: function() {
        this.currentIndex++
            if (this.currentIndex === this.songs.length) {
                this.currentIndex = 0
            }
        this.loadCurrentSong()
    },

    loadPrevSong: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.songs.length - 1
            }
        this.loadCurrentSong()
    },

    loadRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    changeVolume: function(index) {
        volumeViewPercent.textContent = 'Volume ' + index + '%'
        audio.volume = index / 100
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    start: function() {
        this.loadConfig() //load cấu hình từ config vào UI
        this.defineProperties()
        this.handleEvents()
        this.render()
        this.loadCurrentSong()

        // Hiển thị trạng thái ban đầu của repeat và random khi load dữ liệu từ Local Storage
        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
}
app.start()