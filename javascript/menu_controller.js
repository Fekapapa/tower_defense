'use strict'

console.log('menu_controller.js file succesfully loaded');


const mainAudio = document.getElementById('main-audio');
let store = Redux.createStore(reducer);
let gameFrame;
let mainMenuMusicButtonDisabledid = false;

store.subscribe(stateExecutor);

function stateExecutor() {
  render();
  mainMusicController();
}

function reducer(state, action) {
  if (typeof state === 'undefined') {
    state = {
      mainMusic: MAINMUSIC_OFF,
      currentPage: PREMENU_ACTIVE
    };
    return state
  }

  switch (action.type) {
    case 'MAINMENU_ACTIVE':
     return Object.assign({}, state, {
              currentPage: action.type
            })
    case 'MAINMUSIC_ON':
      return Object.assign({}, state, {
               mainMusic: action.type,
               currentMusic: action.src,
             })
    case 'MAINMUSIC_OFF':
      return Object.assign({}, state, {
               mainMusic: action.type
             })
    default:
      return state
  }
}

document.getElementById('game-frame').onload = function() {
  gameFrame = document.getElementById("game-frame").contentWindow;

  if(store.getState().currentPage == PREMENU_ACTIVE) {
   gameFrame.document.getElementById('pre-menu-play-buttonid')
      .addEventListener('click', function () {
          store.dispatch({ type: MAINMENU_ACTIVE });
          store.dispatch({ type: MAINMUSIC_ON, src: "../assets/sound/KRO_main_menu.mp3" });
          mainAudio.play();
    })
  }

  if(store.getState().currentPage == MAINMENU_ACTIVE) {
    gameFrame.document.getElementById('main-menu-music-buttonid')
      .addEventListener('click', function () {
        if (store.getState().mainMusic == MAINMUSIC_ON) {
          store.dispatch({ type: MAINMUSIC_OFF });
          return
        }
        if (store.getState().mainMusic == MAINMUSIC_OFF) {
          store.dispatch({ type: MAINMUSIC_ON, src: "../assets/sound/KRO_main_menu.mp3" });
          return
        }
      })
  }

  if (store.getState().currentPage == MAINMENU_ACTIVE) {
    mainMenuMusicButtonDisabledid = gameFrame.document.getElementById('main-menu-music-button-disabledid');
  }
}

function render() {
  if (store.getState().mainMusic == MAINMUSIC_OFF && mainMenuMusicButtonDisabledid !== false) {
    mainMenuMusicButtonDisabledid.classList.add('main-menu-music-button-disabled');
  }

  if (store.getState().mainMusic == MAINMUSIC_ON && mainMenuMusicButtonDisabledid !== false) {
    mainMenuMusicButtonDisabledid.classList.remove('main-menu-music-button-disabled');
  }
}

function mainMusicController() {
  if (store.getState().currentMusic && store.getState().mainMusic == MAINMUSIC_ON) {
    mainAudio.setAttribute("src", store.getState().currentMusic);
    mainAudio.play();
  }
  if (store.getState().mainMusic == MAINMUSIC_OFF) {
    mainAudio.pause();
    mainAudio.currentTime = 0;
  }
}

setInterval(function () {console.log(store.getState())}, 1000);
