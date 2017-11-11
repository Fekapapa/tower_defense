'use strict'

const MenuLogic = (function() {

  const mainAudioMusic = document.getElementById('main-audio-music');
  let store = Redux.createStore(reducer);
  let gameFrame;
  let mainMenuMusicButtonDisabledid = false;

  store.subscribe(stateExecutor);

  function stateExecutor() {
    renderOnLoad();
    renderOnAction();
    mainMusicController();
  }

  function reducer(state, action) {

    if (typeof state === 'undefined') {
      state = {
        currentPage: 'PRE_MENU',
        musicStatus: 'OFF',
        currentMusicSource: false,
        SfxStatus: 'OFF',
        currentSfxSource: false
      };
      return state
    }

    switch (action.type) {
      case 'MENU_CHANGE':
        return Object.assign({}, state, {
                currentPage: action.payload.currentPage,
                previousPage: action.payload.previousPage,
                lastAction: MENU_CHANGE
              })
      case 'FRAME_LOAD':
        return Object.assign({}, state, {
                isFrameLoaded: action.payload.isFrameLoaded,
                lastAction: FRAME_LOAD
              })
      case 'MUSIC_ON':
        return Object.assign({}, state, {
                musicStatus: action.payload.status,
                currentMusicSource: action.payload.src,
                lastAction: MUSIC_ON
              })
      case 'MUSIC_OFF':
        return Object.assign({}, state, {
                musicStatus: action.payload.status,
                currentMusicSource: action.payload.src,
                lastAction: MUSIC_OFF
              })
      case 'SFX_ON':
        return Object.assign({}, state, {
                SfxStatus: action.payload.status,
                currentSfxSource: action.payload.src,
                lastAction: SFX_ON
              })
      case 'SFX_OFF':
        return Object.assign({}, state, {
                SfxStatus: action.payload.status,
                currentSfxSource: action.payload.src,
                lastAction: SFX_OFF
              })
      default:
        return state
    }
  }

  document.getElementById('game-frame').onload = function() {
    store.dispatch({
      type: FRAME_LOAD,
      payload: {
        isFrameLoaded: true,
      }
    });
    gameFrameOnload();
  }

  function gameFrameOnload() {
    if(store.getState().isFrameLoaded) {
      gameFrame = document.getElementById("game-frame").contentWindow;

      if(store.getState().currentPage == 'PRE_MENU') {
       gameFrame.document.getElementById('pre-menu-play-buttonid')
        .addEventListener('click', function () {
            store.dispatch({
              type: FRAME_LOAD,
              payload: {
                isFrameLoaded: false
              }
            });
            store.dispatch({
              type: MENU_CHANGE,
              payload: {
                currentPage: 'MAIN_MENU',
                previousPage: 'PRE_MENU'
              }
            });
            store.dispatch({
              type: MUSIC_ON,
              payload: {
                status: 'ON',
                src: "../assets/sound/KRO_main_menu.mp3"
              }
            });
        })
      }

      if(store.getState().currentPage == 'MAIN_MENU') {
        mainMenuMusicButtonDisabledid = gameFrame.document.getElementById('main-menu-music-button-disabledid');

        gameFrame.document.getElementById('main-menu-music-buttonid')
          .addEventListener('click', function () {

            if (store.getState().musicStatus == 'OFF') {
              store.dispatch(
                { type: MUSIC_ON,
                  payload: {
                    status: 'ON',
                    src: "../assets/sound/KRO_main_menu.mp3"
                }
              });
              return
            }
            if (store.getState().musicStatus == 'ON') {
              store.dispatch(
                { type: MUSIC_OFF,
                  payload: {
                    status: 'OFF',
                    src: false
                }
              });
              return
            }
          })
      }

      if(store.getState().currentPage == 'MAIN_MENU') {
        gameFrame.document.getElementById('main-menu-credits-buttonid')
        .addEventListener('click', function () {
          store.dispatch({
            type: FRAME_LOAD,
            payload: {
              isFrameLoaded: false
            }
          });
           store.dispatch({
             type: MENU_CHANGE,
             payload: {
               currentPage: 'CREDITS',
               previousPage: 'MAIN_MENU'
             }
           });

         })
       gameFrame.document.getElementById('main-menu-start-buttonid')
       .addEventListener('click', function () {
         store.dispatch({
           type: FRAME_LOAD,
           payload: {
             isFrameLoaded: false
           }
         });
          store.dispatch({
            type: MENU_CHANGE,
            payload: {
              currentPage: 'LOAD_SAVED',
              previousPage: 'MAIN_MENU'
            }
          });
        })
      }

      if(store.getState().currentPage == 'CREDITS') {
        gameFrame.document.getElementById('credits-back-buttonid')
        .addEventListener('click', function () {
          store.dispatch({
            type: FRAME_LOAD,
            payload: {
              isFrameLoaded: false
            }
          });
           store.dispatch({
             type: MENU_CHANGE,
             payload: {
               currentPage: 'MAIN_MENU',
               previousPage: 'CREDITS'
             }
           });
         })
      }

      if(store.getState().currentPage == 'LOAD_SAVED') {
        gameFrame.document.getElementById('load-saved-menu-close-buttonid')
        .addEventListener('click', function () {
          store.dispatch({
            type: FRAME_LOAD,
            payload: {
              isFrameLoaded: false
            }
          });
           store.dispatch({
             type: MENU_CHANGE,
             payload: {
               currentPage: 'MAIN_MENU',
               previousPage: 'LOAD_SAVED'
             }
           });
         })
      }
    }
  }

  function renderOnAction() {
    if (store.getState().musicStatus == 'OFF' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.add('main-menu-music-button-disabled');
    }

    if (store.getState().musicStatus == 'ON' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.remove('main-menu-music-button-disabled');
    }
  }

  function renderOnLoad() {
    if(store.getState().isFrameLoaded) {
      if (store.getState().previousPage == 'CREDITS' && store.getState().currentPage == 'MAIN_MENU') {
        let creditsPreloaderPontainerid = gameFrame.document.getElementById('credits-preloader-containerid');
        creditsPreloaderPontainerid.classList.remove('hidden');

        let mainMenuPreloaderBackgroundid = gameFrame.document.getElementById('main-menu-preloader-backgroundid');
        mainMenuPreloaderBackgroundid.classList.remove('main-menu-preloader-background');
        mainMenuPreloaderBackgroundid.classList.add('main-menu-from-credits-preloader-background');
      }

      if (store.getState().previousPage == 'LOAD_SAVED' && store.getState().currentPage == 'MAIN_MENU') {
        let mainMenuPreloaderBackgroundid = gameFrame.document.getElementById('main-menu-preloader-backgroundid');
        mainMenuPreloaderBackgroundid.classList.remove('main-menu-preloader-background');
        mainMenuPreloaderBackgroundid.classList.add('main-menu-from-loadsaved-preloader-background');
      }
    }
  }

  function mainMusicController() {
    console.log(store.getState().lastAction)
    // if (store.getState().currentMusicSource && store.getState().musicStatus == 'ON' && store.getState().previousPage == 'PRE_MENU') {
    //   mainAudioMusic.setAttribute('src', store.getState().currentMusicSource);
    //   mainAudioMusic.play();
    // }
    if (store.getState().currentMusicSource && store.getState().lastAction == MUSIC_ON) {
      mainAudioMusic.setAttribute('src', store.getState().currentMusicSource);
      mainAudioMusic.play();
    }
    if (store.getState().musicStatus == 'OFF') {
      mainAudioMusic.pause();
      mainAudioMusic.setAttribute('src', '');
      mainAudioMusic.currentTime = 0;
    }
  }

  setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
