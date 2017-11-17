'use strict'

const MenuLogic = (function() {

  const mainAudioMusic = document.getElementById('main-audio-music');
  let store = Redux.createStore(reducer);
  let gameFrame;
  let mainMenuMusicButtonDisabledid = false;
  let iframeid = document.getElementById('game-frame');
  let preloaderContainerid = document.getElementById('preloader-containerid');
  let preloaderLeftsideid = document.getElementById('preloader-leftsideid');
  let preloaderRightsideid = document.getElementById('preloader-rightsideid');
  let preloaderFakeBackgroundid = document.getElementById('preloader-fake-backgroundid');
  let mainMenuArmorgamesImageid;
  let mainMenuIronhideImageid;
  let mainMenuStartImageid;
  let mainMenuCreditsImageid;
  let mainMenuCreditsButtonid;
  let mainMenuStartButtonid;
  let mainMenuArmorgamesButtonid;
  let mainMenuIronhideButtonid;
  let loadSavedMenuid;

  store.subscribe(stateExecutor);

  function stateExecutor() {
    renderOnAction();
    mainMusicController();
  }

  function reducer(state, action) {

    if (typeof state === 'undefined') {
      state = {
        previousPage: false,
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
             isFrameLoaded: true
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

        gameFrame.document.getElementById('load-saved-menu-close-buttonid')
        .addEventListener('click', function () {
          store.dispatch({
            type: FRAME_LOAD,
            payload: {
              isFrameLoaded: true
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
    }
  }

  function renderOnAction() {
    if (store.getState().musicStatus == 'OFF' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.add('main-menu-music-button-disabled');
    }

    if (store.getState().musicStatus == 'ON' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.remove('main-menu-music-button-disabled');
    }

    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage && store.getState().currentPage !== 'LOAD_SAVED' && store.getState().previousPage !== 'LOAD_SAVED') {

      // Reload the preloader animation
      preloaderContainerid.classList.remove('hidden');
      preloaderLeftsideid.classList.remove('preloader-leftside');
      preloaderRightsideid.classList.remove('preloader-rightside');
      preloaderLeftsideid.getBoundingClientRect();
      preloaderRightsideid.getBoundingClientRect();
      preloaderLeftsideid.classList.add('preloader-leftside');
      preloaderRightsideid.classList.add('preloader-rightside');

      // hide the iframe element and display the fake background
      iframeid.classList.add('hidden');
      preloaderFakeBackgroundid.classList.remove('hidden');

      if (store.getState().previousPage == 'PRE_MENU' && store.getState().currentPage == 'MAIN_MENU') {
        preloaderFakeBackgroundid.classList.add('preloader-fake-background-premenu');
        setTimeout(function(){
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-premenu');
            preloaderFakeBackgroundid.classList.add('preloader-fake-background-mainmenu-stripped');
        }, 600);
        setTimeout(function(){
            iframeid.classList.remove('hidden');
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-mainmenu-stripped');
            preloaderFakeBackgroundid.classList.add('hidden');
        }, 1000);
      }

      if (store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'CREDITS') {
        preloaderFakeBackgroundid.classList.add('preloader-fake-background-mainmenu');
        setTimeout(function(){
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-mainmenu');
            preloaderFakeBackgroundid.classList.add('preloader-fake-background-creditsmenu');
        }, 600);
        setTimeout(function(){
            iframeid.classList.remove('hidden');
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-creditsmenu');
            preloaderFakeBackgroundid.classList.add('hidden');
        }, 1000);
      }

      if (store.getState().previousPage == 'CREDITS' && store.getState().currentPage == 'MAIN_MENU') {
        preloaderFakeBackgroundid.classList.add('preloader-fake-background-creditsmenu');
        setTimeout(function(){
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-creditsmenu');
            preloaderFakeBackgroundid.classList.add('preloader-fake-background-mainmenu-stripped');
        }, 600);
        setTimeout(function(){
            iframeid.classList.remove('hidden');
            preloaderFakeBackgroundid.classList.remove('preloader-fake-background-mainmenu-stripped');
            preloaderFakeBackgroundid.classList.add('hidden');
        }, 1000);
      }

    }

    if (store.getState().previousPage == 'MAIN_MENU') {
      mainMenuArmorgamesImageid = gameFrame.document.getElementById('main-menu-armorgames-imageid');
      mainMenuIronhideImageid = gameFrame.document.getElementById('main-menu-ironhide-imageid');
      mainMenuStartImageid = gameFrame.document.getElementById('main-menu-start-imageid');
      mainMenuCreditsImageid = gameFrame.document.getElementById('main-menu-credits-imageid');
      mainMenuCreditsButtonid = gameFrame.document.getElementById('main-menu-credits-buttonid');
      mainMenuStartButtonid = gameFrame.document.getElementById('main-menu-start-buttonid');
      mainMenuArmorgamesButtonid = gameFrame.document.getElementById('main-menu-armorgames-buttonid');
      mainMenuIronhideButtonid = gameFrame.document.getElementById('main-menu-ironhide-buttonid');
      loadSavedMenuid = gameFrame.document.getElementById('load-saved-menuid');
    }

    if (store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'LOAD_SAVED') {
      mainMenuCreditsButtonid.classList.add('hidden');
      mainMenuStartButtonid.classList.add('hidden');
      mainMenuArmorgamesButtonid.classList.add('hidden');
      mainMenuIronhideButtonid.classList.add('hidden');

      mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image');
      mainMenuStartImageid.classList.remove('main-menu-start-image');
      mainMenuCreditsImageid.classList.remove('main-menu-credits-image');
      mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image-ls');
      mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image-ls');
      mainMenuStartImageid.classList.remove('main-menu-start-image-ls');
      mainMenuCreditsImageid.classList.remove('main-menu-credits-image-ls');

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image-reverse');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image-reverse');
      mainMenuStartImageid.classList.add('main-menu-start-image-reverse');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image-reverse');

      loadSavedMenuid.classList.remove('load-saved-menu-reverse');
      loadSavedMenuid.classList.add('load-saved-menu');
    }

    if (store.getState().previousPage == 'LOAD_SAVED' && store.getState().currentPage == 'MAIN_MENU') {
      mainMenuCreditsImageid.classList.remove('main-menu-credits-image-reverse');
      mainMenuStartImageid.classList.remove('main-menu-start-image-reverse');
      mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image-reverse');
      mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image-reverse');

      mainMenuCreditsButtonid.classList.remove('hidden');
      mainMenuStartButtonid.classList.remove('hidden');
      mainMenuArmorgamesButtonid.classList.remove('hidden');
      mainMenuIronhideButtonid.classList.remove('hidden');

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image-ls');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image-ls');
      mainMenuStartImageid.classList.add('main-menu-start-image-ls');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image-ls');

      loadSavedMenuid.classList.remove('load-saved-menu');
      loadSavedMenuid.classList.add('load-saved-menu-reverse');
    }

  }

  function mainMusicController() {
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
