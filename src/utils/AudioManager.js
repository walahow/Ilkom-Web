import { Howl, Howler } from 'howler';

class AudioManager {
    constructor() {
        if (AudioManager.instance) {
            return AudioManager.instance;
        }

        this.bgm = null;
        this.sfx = {};
        this.isMuted = true;
        this.bgmVolume = 0.3;
        this.sfxVolume = 0.8;
        this.bgmId = null;
        this.scrambleRef = 0;

        // Initialize sounds
        this.init();

        AudioManager.instance = this;
    }

    init() {
        // Background Music
        this.bgm = new Howl({
            src: ['/sounds/bgm.mp3'],
            loop: true,
            volume: 0, // Start at 0 for fade-in
            preload: true,
            onplay: () => console.log('BGM Started Playing'),
            onplayerror: (id, err) => console.error('BGM Play Error:', err),
            onloaderror: (id, err) => console.error('BGM Load Error:', err)
        });

        // SFX: Click
        // Using sprite for precise timing control if needed, or just full file
        this.sfx.click = new Howl({
            src: ['/sounds/click.mp3'],
            volume: this.sfxVolume,
            sprite: {
                full: [0, 2000], // Adjust duration as needed, or use full file
                short: [0, 200] // Example: 0ms to 200ms
            }
        });

        // SFX: Hover (Polyphonic by default in Howler)
        this.sfx.hover = new Howl({
            src: ['/sounds/hover_clickable.mp3'],
            volume: this.sfxVolume,
        });

        // SFX: Modal Open
        this.sfx.modalOpen = new Howl({
            src: ['/sounds/modal_open.mp3'],
            volume: this.sfxVolume,
            sprite: {
                short: [0, 2000] // Limit to 2 seconds
            }
        });

        // SFX: Scramble Loop
        this.sfx.scramble = new Howl({
            src: ['/sounds/scramble_loop.mp3'],
            volume: 2.5, // Slightly lower for repetitive texture
            loop: true,
        });
    }

    /**
     * Start BGM with a fade-in effect.
     * Should be called after first user interaction.
     */
    startBGM() {
        console.log('Attempting to start BGM...');
        if (!this.bgm || this.bgm.playing() || this.isMuted) {
            console.log('BGM start aborted:', {
                exists: !!this.bgm,
                playing: this.bgm?.playing(),
                muted: this.isMuted
            });
            return;
        }

        this.bgmId = this.bgm.play();
        console.log('BGM Play called, ID:', this.bgmId);
        this.bgm.fade(0, this.bgmVolume, 2000, this.bgmId);
    }

    stopBGM() {
        if (this.bgm && this.bgm.playing()) {
            this.bgm.fade(this.bgmVolume, 0, 1000, this.bgmId);
            setTimeout(() => {
                this.bgm.stop();
            }, 1000);
        }
    }

    playClick() {
        if (this.isMuted) return;
        // Play the 'short' sprite if defined, otherwise play full
        // Using 'short' based on user request "only from time 00.00 to 00.02" (approx 200ms)
        this.sfx.click.play('short');
    }

    playHover() {
        if (this.isMuted) return;
        this.sfx.hover.play();
    }

    playModalOpen() {
        if (this.isMuted) return;
        const id = this.sfx.modalOpen.play('short');

        // Fade out in the last 500ms of the 2000ms sprite
        setTimeout(() => {
            if (this.sfx.modalOpen.playing(id)) {
                this.sfx.modalOpen.fade(this.sfxVolume, 0, 100, id);
            }
        }, 1900);
    }

    startScramble() {
        if (this.isMuted) return;
        this.scrambleRef++;
        if (!this.sfx.scramble.playing()) {
            this.sfx.scramble.play();
        }
    }

    stopScramble() {
        this.scrambleRef--;
        if (this.scrambleRef <= 0) {
            this.sfx.scramble.stop();
            this.scrambleRef = 0;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        Howler.mute(this.isMuted);

        // If unmuting and BGM wasn't playing (and we want it to), we might need to restart it
        // But typically Howler.mute handles the global output.
        // However, if we want to restart BGM logic explicitly:
        if (!this.isMuted && !this.bgm.playing()) {
            this.startBGM();
        }

        return this.isMuted;
    }
}

const audioManager = new AudioManager();
export default audioManager;
