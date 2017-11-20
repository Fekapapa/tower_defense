'use strict'

const MenuLogic = (function() {

  const mainAudioMusic = document.getElementById('main-audio-music');
  const mainAudioSfxPrimary = document.getElementById('main-audio-sfx-primary');
  const mainAudioSfxSecondary = document.getElementById('main-audio-sfx-secondary');
  const mainAudioSfxTertiary = document.getElementById('main-audio-sfx-tertiary');
  const menuHoverSfxSource = '../assets/sound/sfx/button_hover2.mp3';
  const menuClickSfxSource = '../assets/sound/sfx/button_click.mp3';
  const preloaderSfxSource = '../assets/sound/sfx/preloader.mp3';
  let store = Redux.createStore(reducer);
  let gameFrame;
  let mainMenuMusicButtonDisabledid = false;
  let mainMenuSoundButtonDisabledid = false;
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
  let mainMenuPlayonmobileButtonid;
  let mainMenuTwitterButtonid;
  let mainMenuFacebookButtonid;
  let mainMenuMusicButtonid;
  let mainMenuSoundButtonid;
  let loadSavedMenuCloseButtonid;
  let creditsBackButtonid;
  let sfxHelper = 0;

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
        sfxStatus: 'OFF',
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
                sfxStatus: action.payload.status,
                lastAction: SFX_ON
              })
      case 'SFX_OFF':
        return Object.assign({}, state, {
                sfxStatus: action.payload.status,
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
                src: "../assets/sound/KRO_main_menu2.mp3"
              }
            });
            store.dispatch({
              type: SFX_ON,
              payload: {
                status: 'ON',
              }
            });
        })
      }

      if(store.getState().currentPage == 'MAIN_MENU') {
        mainMenuMusicButtonDisabledid = gameFrame.document.getElementById('main-menu-music-button-disabledid');
        mainMenuSoundButtonDisabledid = gameFrame.document.getElementById('main-menu-sound-button-disabledid');

        gameFrame.document.getElementById('main-menu-music-buttonid')
          .addEventListener('click', function () {

            if (store.getState().musicStatus == 'OFF') {
              store.dispatch(
                { type: MUSIC_ON,
                  payload: {
                    status: 'ON',
                    src: "../assets/sound/KRO_main_menu2.mp3"
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

      gameFrame.document.getElementById('main-menu-sound-buttonid')
        .addEventListener('click', function () {

          if (store.getState().sfxStatus == 'OFF') {
            store.dispatch(
              { type: SFX_ON,
                payload: {
                  status: 'ON',
              }
            });
            return
          }
          if (store.getState().sfxStatus == 'ON') {
            store.dispatch(
              { type: SFX_OFF,
                payload: {
                  status: 'OFF',
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
             type: MENU_CHANGE,
             payload: {
               currentPage: 'MAIN_MENU',
               previousPage: 'LOAD_SAVED'
             }
           });
         })

        mainMenuCreditsButtonid = gameFrame.document.getElementById('main-menu-credits-buttonid');
        mainMenuStartButtonid = gameFrame.document.getElementById('main-menu-start-buttonid');
        mainMenuArmorgamesButtonid = gameFrame.document.getElementById('main-menu-armorgames-buttonid');
        mainMenuIronhideButtonid = gameFrame.document.getElementById('main-menu-ironhide-buttonid');
        mainMenuArmorgamesImageid = gameFrame.document.getElementById('main-menu-armorgames-imageid');
        mainMenuIronhideImageid = gameFrame.document.getElementById('main-menu-ironhide-imageid');
        mainMenuStartImageid = gameFrame.document.getElementById('main-menu-start-imageid');
        mainMenuCreditsImageid = gameFrame.document.getElementById('main-menu-credits-imageid');
        mainMenuPlayonmobileButtonid = gameFrame.document.getElementById('main-menu-playonmobile-buttonid');
        mainMenuTwitterButtonid = gameFrame.document.getElementById('main-menu-twitter-buttonid');
        mainMenuFacebookButtonid = gameFrame.document.getElementById('main-menu-facebook-buttonid');
        mainMenuMusicButtonid = gameFrame.document.getElementById('main-menu-music-buttonid');
        mainMenuSoundButtonid = gameFrame.document.getElementById('main-menu-sound-buttonid');
        loadSavedMenuid = gameFrame.document.getElementById('load-saved-menuid');
        loadSavedMenuCloseButtonid = gameFrame.document.getElementById('load-saved-menu-close-buttonid');

        mainMenuStartButtonid.addEventListener("mouseover", function() {
        mainSfxController(menuHoverSfxSource) });
        mainMenuCreditsButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
        mainMenuPlayonmobileButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
        mainMenuTwitterButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
        mainMenuFacebookButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
        mainMenuMusicButtonid.addEventListener("mouseover", function() {
        mainSfxController(menuHoverSfxSource) });
        mainMenuSoundButtonid.addEventListener("mouseover", function() {
        mainSfxController(menuHoverSfxSource) });
        loadSavedMenuCloseButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });

        mainMenuStartButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        mainMenuCreditsButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        mainMenuPlayonmobileButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
        mainMenuTwitterButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        mainMenuFacebookButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        mainMenuMusicButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        mainMenuSoundButtonid.addEventListener("click", function() {
        mainSfxController(menuClickSfxSource) });
        loadSavedMenuCloseButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });

        if(store.getState().musicStatus == 'OFF') {
          mainMenuMusicButtonDisabledid.classList.remove('hidden');
        }
        if(store.getState().sfxStatus == 'OFF') {
          mainMenuSoundButtonDisabledid.classList.remove('hidden');
        }

      }

      if(store.getState().currentPage == 'CREDITS') {
        creditsBackButtonid = gameFrame.document.getElementById('credits-back-buttonid');

        creditsBackButtonid.addEventListener('click', function () {
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

         creditsBackButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
         creditsBackButtonid.addEventListener("click", function() {
         mainSfxController(menuClickSfxSource) });

      }

// Add sound to the preloader from pre-menu to main-menu
      if(store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage == 'PRE_MENU') {
        mainSfxController(preloaderSfxSource);
      }

    }
  }

  function renderOnAction() {
    if (store.getState().musicStatus == 'OFF' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.remove('hidden');
    }

    if (store.getState().musicStatus == 'ON' && mainMenuMusicButtonDisabledid !== false) {
      mainMenuMusicButtonDisabledid.classList.add('hidden');
    }

    if (store.getState().sfxStatus == 'OFF' && mainMenuSoundButtonDisabledid !== false) {
      mainMenuSoundButtonDisabledid.classList.remove('hidden');
    }

    if (store.getState().sfxStatus == 'ON' && mainMenuSoundButtonDisabledid !== false) {
      mainMenuSoundButtonDisabledid.classList.add('hidden');
    }

    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage && store.getState().currentPage !== 'LOAD_SAVED' && store.getState().previousPage !== 'LOAD_SAVED') {

      mainSfxController(preloaderSfxSource);

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

    if (store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'LOAD_SAVED') {
      mainMenuCreditsButtonid.classList.add('hidden');
      mainMenuStartButtonid.classList.add('hidden');
      mainMenuArmorgamesButtonid.classList.add('hidden');
      mainMenuIronhideButtonid.classList.add('hidden');

      mainMenuCreditsButtonid.classList.remove('main-menu-credits-button');
      mainMenuStartButtonid.classList.remove('main-menu-start-button');
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

      loadSavedMenuid.classList.remove('load-saved-menu-start');
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

    if (store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage !== 'LOAD_SAVED') {
      mainMenuCreditsButtonid = gameFrame.document.getElementById('main-menu-credits-buttonid');
      mainMenuStartButtonid = gameFrame.document.getElementById('main-menu-start-buttonid');

      setTimeout(function(){
        try {
          mainMenuCreditsButtonid.classList.add('main-menu-credits-button');
          mainMenuStartButtonid.classList.add('main-menu-start-button');
        }
        catch(err) {}
      }, 1400);
    }

    if (store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage == 'LOAD_SAVED') {
      mainMenuCreditsButtonid = gameFrame.document.getElementById('main-menu-credits-buttonid');
      mainMenuStartButtonid = gameFrame.document.getElementById('main-menu-start-buttonid');

      setTimeout(function(){
        try {
          mainMenuCreditsButtonid.classList.add('main-menu-credits-button');
          mainMenuStartButtonid.classList.add('main-menu-start-button');
        }
        catch(err) {}
      }, 800);
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

  function mainSfxController(source) {
    if (store.getState().sfxStatus == 'ON') {
      sfxHelper += 1;
      if ((sfxHelper % 3) == 0) {
        mainAudioSfxPrimary.setAttribute('src', source);
        mainAudioSfxPrimary.play();
      }
      if ((sfxHelper % 3) == 1) {
        mainAudioSfxSecondary.setAttribute('src', source);
        mainAudioSfxSecondary.play();
      }
      if ((sfxHelper % 3) == 2) {
        mainAudioSfxTertiary.setAttribute('src', source);
        mainAudioSfxTertiary.play();
      }
    }
  }

  setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
