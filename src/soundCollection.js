class SoundCollection {
    constructor () {
        this.sounds = {
            hit : new Audio("res/hit2.wav"),
            rotation : new Audio("res/rotate4.wav"),
            pause : new Audio("res/pause.wav")
        }        
    }

    playHitsound() {
        this.sounds.hit.pause();
        this.sounds.hit.currentTime = 0;
        this.sounds.hit.play();
    }
    playRotationsound() {
        this.sounds.rotation.pause();
        this.sounds.rotation.currentTime = 0;
        this.sounds.rotation.play();
    }
    playPausesound() {
        this.sounds.pause.pause();
        this.sounds.pause.currentTime = 0;
        this.sounds.pause.play();
    }
}