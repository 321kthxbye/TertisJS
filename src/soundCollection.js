class SoundCollection {
    constructor () {
        this.sounds = {
            hit : new Audio("res/hit.wav"),
            rotation : new Audio("res/rotate.wav"),
            pause : new Audio("res/pause.wav"),
            explosion : new Audio("res/explosion.wav")
        }        
    }

    play(sound, mute) {
        if(!mute){
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
    }
}