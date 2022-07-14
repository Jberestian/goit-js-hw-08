import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let saveTimeFromLocalStorage = localStorage.getItem('videoplayer-current-time');

player.on('timeupdate', throttle(setItemFromLocalStorage, 1000));

function setItemFromLocalStorage({ seconds }) {
  console.log('hello start');

  localStorage.setItem('videoplayer-current-time', seconds);
}

player.setCurrentTime(saveTimeFromLocalStorage);
