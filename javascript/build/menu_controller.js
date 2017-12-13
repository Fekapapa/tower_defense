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
let iframeid = document.getElementById('game-frame');
let preloaderContainerid = document.getElementById('preloader-containerid');
let preloaderLeftsideid = document.getElementById('preloader-leftsideid');
let preloaderRightsideid = document.getElementById('preloader-rightsideid');
let preloaderFakeBackgroundid = document.getElementById('preloader-fake-backgroundid');
let sfxHelper = 0;
let gameFrame;
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
let loadSavedMenuLocalsaveHelpid;
let loadSavedMenuGameslot1Unusedid;
let loadSavedMenuGameslot1Usedid;
let loadSavedMenuGameslot2Unusedid;
let loadSavedMenuGameslot2Usedid;
let loadSavedMenuGameslot3Unusedid;
let loadSavedMenuGameslot3Usedid;
let loadSavedMenuGameslot1UsedHoverid;
let loadSavedMenuGameslot2UsedHoverid;
let loadSavedMenuGameslot3UsedHoverid;
let loadSavedMenuActionsContainerid;
let loadSavedMenuGameslot1Deleteid;
let loadSavedMenuGameslot2Deleteid;
let loadSavedMenuGameslot3Deleteid;
let loadSavedMenuGameslot1Delconfid;
let loadSavedMenuGameslot2Delconfid;
let loadSavedMenuGameslot3Delconfid;
let loadSavedMenuGameslot1Delconfyesid;
let loadSavedMenuGameslot1Delconfnoid;
let loadSavedMenuGameslot2Delconfyesid;
let loadSavedMenuGameslot2Delconfnoid;
let loadSavedMenuGameslot3Delconfyesid;
let loadSavedMenuGameslot3Delconfnoid;
let gameslot1Stars;
let gameslot1Shields;
let gameslot1Fists;
let gameslot2Stars;
let gameslot2Shields;
let gameslot2Fists;
let gameslot3Stars;
let gameslot3Shields;
let gameslot3Fists;
let savedData;
;

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
    case 'GAME_LOAD':
      return Object.assign({}, state, {
              savedData: action.payload.savedData,
              lastAction: GAME_LOAD
            })
    case 'GAME_SAVE':
      return Object.assign({}, state, {
              savedData: action.payload.savedData,
              lastAction: GAME_SAVE
            })
    case 'GAME_DELETE':
      return Object.assign({}, state, {
              gameSlot: action.payload.gameSlot,
              lastAction: GAME_DELETE
            })
    case 'GAME_DELCONF':
      return Object.assign({}, state, {
              deleteConfirmation: action.payload.delConf,
              lastAction: GAME_DELCONF
            })
    default:
      return state
  }
}
;

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
loadSavedMenuLocalsaveHelpid = gameFrame.document.getElementById('load-saved-menu-localsave-helpid');
loadSavedMenuGameslot1Unusedid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-unused-id');
loadSavedMenuGameslot1Usedid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-used-id');
loadSavedMenuGameslot2Unusedid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-unused-id');
loadSavedMenuGameslot2Usedid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-used-id');
loadSavedMenuGameslot3Unusedid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-unused-id');
loadSavedMenuGameslot3Usedid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-used-id');
loadSavedMenuActionsContainerid = gameFrame.document.getElementById('load-saved-menu-actions-containerid');
loadSavedMenuGameslot1UsedHoverid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-used-hover-id');
loadSavedMenuGameslot2UsedHoverid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-used-hover-id');
loadSavedMenuGameslot3UsedHoverid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-used-hover-id');
loadSavedMenuGameslot1Delconfid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-delconf-id');
loadSavedMenuGameslot2Delconfid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-delconf-id');
loadSavedMenuGameslot3Delconfid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-delconf-id');

loadSavedMenuGameslot1Delconfyesid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-delconfyes-id');
loadSavedMenuGameslot1Delconfnoid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-delconfno-id');
loadSavedMenuGameslot2Delconfyesid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-delconfyes-id');
loadSavedMenuGameslot2Delconfnoid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-delconfno-id');
loadSavedMenuGameslot3Delconfyesid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-delconfyes-id');
loadSavedMenuGameslot3Delconfnoid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-delconfno-id');

loadSavedMenuGameslot1Deleteid = gameFrame.document.getElementById('load-saved-menu-gameslot-1-delete-id');
loadSavedMenuGameslot2Deleteid = gameFrame.document.getElementById('load-saved-menu-gameslot-2-delete-id');
loadSavedMenuGameslot3Deleteid = gameFrame.document.getElementById('load-saved-menu-gameslot-3-delete-id');


loadSavedMenuGameslot1Deleteid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELETE,
    payload: {
      gameSlot: 1
    }
  });
})

loadSavedMenuGameslot2Deleteid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELETE,
    payload: {
      gameSlot: 2
    }
  });
})

loadSavedMenuGameslot3Deleteid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELETE,
    payload: {
      gameSlot: 3
    }
  });
})

loadSavedMenuGameslot1Delconfyesid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: true
    }
  });
})

loadSavedMenuGameslot2Delconfyesid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: true
    }
  });
})

loadSavedMenuGameslot3Delconfyesid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: true
    }
  });
})

loadSavedMenuGameslot1Delconfnoid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: false
    }
  });
})

loadSavedMenuGameslot2Delconfnoid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: false
    }
  });
})

loadSavedMenuGameslot3Delconfnoid.addEventListener('click', function () {
  store.dispatch({
    type: GAME_DELCONF,
    payload: {
      delConf: false
    }
  });
})


mainMenuStartButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuCreditsButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuPlayonmobileButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuTwitterButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuFacebookButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuMusicButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
mainMenuSoundButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuCloseButtonid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuLocalsaveHelpid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot1Unusedid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot2Unusedid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot3Unusedid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot1UsedHoverid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot2UsedHoverid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot3UsedHoverid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot1Deleteid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot2Deleteid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot3Deleteid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot1Delconfyesid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot1Delconfnoid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot2Delconfyesid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot2Delconfnoid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot3Delconfyesid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });
loadSavedMenuGameslot3Delconfnoid.addEventListener("mouseover", function() { mainSfxController(menuHoverSfxSource) });

mainMenuStartButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuCreditsButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuPlayonmobileButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuTwitterButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuFacebookButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuMusicButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
mainMenuSoundButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuCloseButtonid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot1Unusedid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot2Unusedid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot3Unusedid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot1UsedHoverid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot2UsedHoverid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot3UsedHoverid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot1Deleteid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot2Deleteid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot3Deleteid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot1Delconfyesid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot1Delconfnoid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot2Delconfyesid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot2Delconfnoid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot3Delconfyesid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });
loadSavedMenuGameslot3Delconfnoid.addEventListener("click", function() { mainSfxController(menuClickSfxSource) });


loadSavedMenuGameslot1Unusedid.addEventListener("click", function() {
  savedData.slot1 = {
    isUsed: true,
    stars: 0,
    shields: 0,
    fists: 0
  }
  store.dispatch({
    type: GAME_SAVE,
    payload: {
      savedData
    }
  });
  saveGame();
});

loadSavedMenuGameslot2Unusedid.addEventListener("click", function() {
  savedData.slot2 = {
    isUsed: true,
    stars: 0,
    shields: 0,
    fists: 0
  }
  store.dispatch({
    type: GAME_SAVE,
    payload: {
      savedData
    }
  });
  saveGame();
});

loadSavedMenuGameslot3Unusedid.addEventListener("click", function() {
  savedData.slot3 = {
    isUsed: true,
    stars: 0,
    shields: 0,
    fists: 0
  }
  store.dispatch({
    type: GAME_SAVE,
    payload: {
      savedData
    }
  });
  saveGame();
});


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

  setTimeout(function(){
    try {
      loadSavedMenuActionsContainerid.classList.remove('hidden');
    }
    catch(err) {}
  }, 800);

  if (store.getState().lastAction == GAME_DELCONF && store.getState().deleteConfirmation == true) {
    let tempSavedData = store.getState().savedData;

    if (store.getState().gameSlot == 1) {
      tempSavedData.slot1.isUsed = false;
      loadSavedMenuGameslot1Delconfid.classList.add('hidden');
    }
    if (store.getState().gameSlot == 2) {
      tempSavedData.slot2.isUsed = false;
      loadSavedMenuGameslot2Delconfid.classList.add('hidden');
    }
    if (store.getState().gameSlot == 3) {
      tempSavedData.slot3.isUsed = false;
      loadSavedMenuGameslot3Delconfid.classList.add('hidden');
    }

    localStorage.setItem('kr_xp_save', JSON.stringify(tempSavedData));
    loadGame();
  }

  if (store.getState().lastAction == GAME_DELCONF && store.getState().deleteConfirmation == false) {
    if (store.getState().gameSlot == 1) {
      loadSavedMenuGameslot1Delconfid.classList.add('hidden');
    }
    if (store.getState().gameSlot == 2) {
      loadSavedMenuGameslot2Delconfid.classList.add('hidden');
    }
    if (store.getState().gameSlot == 3) {
      loadSavedMenuGameslot3Delconfid.classList.add('hidden');
    }
  }

  if (store.getState().lastAction == GAME_DELETE) {
    if (store.getState().gameSlot == 1) {
      loadSavedMenuGameslot1Delconfid.classList.remove('hidden');
    }
    if (store.getState().gameSlot == 2) {
      loadSavedMenuGameslot2Delconfid.classList.remove('hidden');
    }
    if (store.getState().gameSlot == 3) {
      loadSavedMenuGameslot3Delconfid.classList.remove('hidden');
    }
  }
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

if (store.getState().lastAction == 'GAME_LOAD' && store.getState().isFrameLoaded == true && store.getState().currentPage == 'LOAD_SAVED') {
  if (savedData.slot1.isUsed == true) {
    loadSavedMenuGameslot1Unusedid.classList.add('hidden');
    loadSavedMenuGameslot1Usedid.classList.remove('hidden');
    loadSavedMenuGameslot1UsedHoverid.classList.remove('hidden');
    loadSavedMenuGameslot1Deleteid.classList.remove('hidden');

    gameslot1Stars = gameFrame.document.getElementById('gameslot-1-stars');
    gameslot1Shields = gameFrame.document.getElementById('gameslot-1-shields');
    gameslot1Fists = gameFrame.document.getElementById('gameslot-1-fists');

    gameslot1Stars.innerHTML = store.getState().savedData.slot1.stars.toString() + '/77';
    gameslot1Shields.innerHTML = store.getState().savedData.slot1.shields;
    gameslot1Fists.innerHTML = store.getState().savedData.slot1.fists;
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

    gameslot2Stars = gameFrame.document.getElementById('gameslot-2-stars');
    gameslot2Shields = gameFrame.document.getElementById('gameslot-2-shields');
    gameslot2Fists = gameFrame.document.getElementById('gameslot-2-fists');
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

    gameslot3Stars = gameFrame.document.getElementById('gameslot-3-stars');
    gameslot3Shields = gameFrame.document.getElementById('gameslot-3-shields');
    gameslot3Fists = gameFrame.document.getElementById('gameslot-3-fists');
  }
  if (savedData.slot3.isUsed == false) {
    loadSavedMenuGameslot3Unusedid.classList.remove('hidden');
    loadSavedMenuGameslot3Usedid.classList.add('hidden');
    loadSavedMenuGameslot3UsedHoverid.classList.add('hidden');
    loadSavedMenuGameslot3Deleteid.classList.add('hidden');
  }
}


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
