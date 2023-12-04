import { Howl } from "howler";



export const flyAway = new Howl({
    src: ['/sound.wav'],
    onplayerror: function() {
        flyAway.once('unlock', function() {
          flyAway.play();
        });
      }
});
export const newSound = new Howl({
    src: ['/new.mp3'],
    onplayerror: function() {
        newSound.once('unlock', function() {
          newSound.play();
        });
      }
});
export const coin = new Howl({
    src: ['/coin.wav'],
    onplayerror: function() {
        coin.once('unlock', function() {
          coin.play();
        });
    }    
});
export const gamePlay = new Howl({
    src: ['/aviator.mp3'],    
    loop: true,    
});
export const start = new Howl({
    src: ['/start.mp3'],    
    onplayerror: function() {
        start.once('unlock', function() {
          start.play();
        });
      }
});

