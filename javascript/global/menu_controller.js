'use strict'

const MenuLogic = (function() {

//import "./variables.js";

  store.subscribe(stateExecutor);

  function stateExecutor() {
    renderOnAction();
    mainMusicController();
  }

//import "./reducer.js";

  document.getElementById('game-frame').onload = function() {
    store.dispatch({
      type: FRAME_LOAD,
      payload: {
        isFrameLoaded: true
      }
    });
    gameFrameOnload();
  }

  function gameFrameOnload() {

    if (localStorage.getItem('kr_xp_save') == undefined) {
      savedData = {};
      savedData.slot1 = {
        isUsed: false
      }
      savedData.slot2 = {
        isUsed: false
      }
      savedData.slot3 = {
        isUsed: false
      }
      localStorage.setItem('kr_xp_save', JSON.stringify(savedData));
    } else {
      savedData = JSON.parse(localStorage.getItem('kr_xp_save'));
    }

    loadGame();

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

// import "./getelementbyid.js";

// import "./deletesavedgame.js";

// import ./addSFXsound.js

// import ./gameslotused.js

        if(store.getState().musicStatus == 'OFF') {
          mainMenuMusicButtonid.classList.remove('main-menu-music-button');
          mainMenuMusicButtonid.classList.add('main-menu-music-button-disabled');
        }
        if(store.getState().sfxStatus == 'OFF') {
          mainMenuSoundButtonid.classList.remove('main-menu-sound-button');
          mainMenuSoundButtonid.classList.add('main-menu-sound-button-disabled');
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

      if(store.getState().lastAction == 'GAME_LOAD' && store.getState().currentPage == 'MAIN_MENU') {
        if (savedData.slot1.isUsed == true) {
          loadSavedMenuGameslot1Unusedid.classList.add('hidden');
          loadSavedMenuGameslot1Usedid.classList.remove('hidden');
          loadSavedMenuGameslot1UsedHoverid.classList.remove('hidden');
          loadSavedMenuGameslot1Deleteid.classList.remove('hidden');
        }
        if (savedData.slot1.isUsed == false) {
          loadSavedMenuGameslot1Unusedid.classList.remove('hidden');
          loadSavedMenuGameslot1Usedid.classList.add('hidden');
          loadSavedMenuGameslot1UsedHoverid.classList.add('hidden');
          loadSavedMenuGameslot1Deleteid.classList.add('hidden');
        }
        if (savedData.slot2.isUsed == true) {
          loadSavedMenuGameslot2Unusedid.classList.add('hidden');
          loadSavedMenuGameslot2Usedid.classList.remove('hidden');
          loadSavedMenuGameslot2UsedHoverid.classList.remove('hidden');
          loadSavedMenuGameslot2Deleteid.classList.remove('hidden');
        }
        if (savedData.slot2.isUsed == false) {
          loadSavedMenuGameslot2Unusedid.classList.remove('hidden');
          loadSavedMenuGameslot2Usedid.classList.add('hidden');
          loadSavedMenuGameslot2UsedHoverid.classList.add('hidden');
          loadSavedMenuGameslot2Deleteid.classList.add('hidden');
        }
        if (savedData.slot3.isUsed == true) {
          loadSavedMenuGameslot3Unusedid.classList.add('hidden');
          loadSavedMenuGameslot3Usedid.classList.remove('hidden');
          loadSavedMenuGameslot3UsedHoverid.classList.remove('hidden');
          loadSavedMenuGameslot3Deleteid.classList.remove('hidden');
        }
        if (savedData.slot3.isUsed == false) {
          loadSavedMenuGameslot3Unusedid.classList.remove('hidden');
          loadSavedMenuGameslot3Usedid.classList.add('hidden');
          loadSavedMenuGameslot3UsedHoverid.classList.add('hidden');
          loadSavedMenuGameslot3Deleteid.classList.add('hidden');
        }
      }

      // Add sound to the preloader from pre-menu to main-menu
      // if(store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage == 'PRE_MENU') {
      //   mainSfxController(preloaderSfxSource);
      // }

    }
  }

  function renderOnAction() {
    if (store.getState().musicStatus == 'OFF' && mainMenuMusicButtonid !== undefined) {
      mainMenuMusicButtonid.classList.remove('main-menu-music-button');
      mainMenuMusicButtonid.classList.add('main-menu-music-button-disabled');
    }

    if (store.getState().musicStatus == 'ON' && mainMenuMusicButtonid !== undefined) {
      mainMenuMusicButtonid.classList.add('main-menu-music-button');
      mainMenuMusicButtonid.classList.remove('main-menu-music-button-disabled');
    }

    if (store.getState().sfxStatus == 'OFF' && mainMenuSoundButtonid !== undefined) {
      mainMenuSoundButtonid.classList.remove('main-menu-sound-button');
      mainMenuSoundButtonid.classList.add('main-menu-sound-button-disabled');
    }

    if (store.getState().sfxStatus == 'ON' && mainMenuSoundButtonid !== undefined) {
      mainMenuSoundButtonid.classList.add('main-menu-sound-button');
      mainMenuSoundButtonid.classList.remove('main-menu-sound-button-disabled');
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

//import mainmenu_to_loadsaved.js

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

      loadSavedMenuActionsContainerid.classList.add('hidden');
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

//importgameload.js

    if (store.getState().isFrameLoaded == true && store.getState().currentPage == 'LOAD_SAVED') {
      if (savedData.slot1.isUsed == true) {
        gameslot1Stars = gameFrame.document.getElementById('gameslot-1-stars');
        gameslot1Shields = gameFrame.document.getElementById('gameslot-1-shields');
        gameslot1Fists = gameFrame.document.getElementById('gameslot-1-fists');

        gameslot1Stars.innerHTML = store.getState().savedData.slot1.stars.toString() + '/77';
        gameslot1Shields.innerHTML = store.getState().savedData.slot1.shields;
        gameslot1Fists.innerHTML = store.getState().savedData.slot1.fists;
      }
      if (savedData.slot2.isUsed == true) {
        gameslot2Stars = gameFrame.document.getElementById('gameslot-2-stars');
        gameslot2Shields = gameFrame.document.getElementById('gameslot-2-shields');
        gameslot2Fists = gameFrame.document.getElementById('gameslot-2-fists');

        gameslot2Stars.innerHTML = store.getState().savedData.slot2.stars.toString() + '/77';
        gameslot2Shields.innerHTML = store.getState().savedData.slot2.shields;
        gameslot2Fists.innerHTML = store.getState().savedData.slot2.fists;
      }
      if (savedData.slot3.isUsed == true) {
        gameslot3Stars = gameFrame.document.getElementById('gameslot-3-stars');
        gameslot3Shields = gameFrame.document.getElementById('gameslot-3-shields');
        gameslot3Fists = gameFrame.document.getElementById('gameslot-3-fists');

        gameslot3Stars.innerHTML = store.getState().savedData.slot3.stars.toString() + '/77';
        gameslot3Shields.innerHTML = store.getState().savedData.slot3.shields;
        gameslot3Fists.innerHTML = store.getState().savedData.slot3.fists;
      }
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

  function loadGame() {
    if (localStorage.getItem('kr_xp_save')) {
      savedData = JSON.parse(localStorage.getItem('kr_xp_save'));
      store.dispatch({
        type: GAME_LOAD,
        payload: {
          savedData
        }
      });
    }
  }

  function saveGame() {
    if (store.getState().lastAction == 'GAME_SAVE' && store.getState().isFrameLoaded == true && store.getState().currentPage == 'LOAD_SAVED') {
      localStorage.setItem('kr_xp_save', JSON.stringify(store.getState().savedData));
      loadGame();
    }
  }

  setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
