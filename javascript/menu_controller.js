'use strict'

console.log('menu_controller.js file succesfully loaded');

const mainAudio = document.getElementById('main-audio');

function reducer(state, action) {
  if (typeof state === 'undefined') {
    state = {};
    state.mainAudio = 'OFF';
    state.currentPage = 'pre_menu';
    return state
  }

  switch (action.type) {
    case 'MAINMENU':
       state.currentPage = 'main_menu';
       return state
    case 'ON':
       state.mainAudio = 'ON';
       return state
    case 'OFF':
       state.mainAudio = 'OFF';
       return state
    default:
      return state
  }
}


var store = Redux.createStore(reducer);
let gameFrame;
let mainMenuMusicButtonDisabledid = false;

document.getElementById('game-frame').onload = function() {
  gameFrame = document.getElementById("game-frame").contentWindow;

  if(store.getState().currentPage == 'pre_menu') {
   gameFrame.document.getElementById('pre-menu-play-buttonid')
      .addEventListener('click', function () {
          store.dispatch({ type: 'MAINMENU' });
          store.dispatch({ type: 'ON' });
          mainAudio.play();
    })
  }

  if(store.getState().currentPage == 'main_menu') {
    gameFrame.document.getElementById('main-menu-music-buttonid')
      .addEventListener('click', function () {
        if (store.getState().mainAudio == 'ON') {
          store.dispatch({ type: 'OFF' });
          mainAudio.pause();
          mainAudio.currentTime = 0;
          return
        }
        if (store.getState().mainAudio == 'OFF') {
          store.dispatch({ type: 'ON' })
          mainAudio.play();
          return
        }
      })
  }

  if (store.getState().currentPage == 'main_menu') {
    mainMenuMusicButtonDisabledid = gameFrame.document.getElementById('main-menu-music-button-disabledid');
  }
}

function render() {
  if (store.getState().mainAudio == 'OFF' && mainMenuMusicButtonDisabledid !== false) {
    mainMenuMusicButtonDisabledid.classList.add('main-menu-music-button-disabled');
  }

  if (store.getState().mainAudio == 'ON' && mainMenuMusicButtonDisabledid !== false) {
    mainMenuMusicButtonDisabledid.classList.remove('main-menu-music-button-disabled');
  }
}

store.subscribe(render)
setInterval(function () {console.log(store.getState())}, 1000)
