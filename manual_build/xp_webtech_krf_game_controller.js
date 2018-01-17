'use strict'

const GameLogic = (function() {

  // Redux and global variable declaration
  const store = Redux.createStore(reducer);
  store.subscribe(render);
  let savedData;
  let sfxHelper = 0;

  // Redux action types
  const MENU_CHANGE = 'MENU_CHANGE';
  const MUSIC_ON = 'MUSIC_ON';
  const MUSIC_OFF = 'MUSIC_OFF';
  const SFX_ON = 'SFX_ON';
  const SFX_OFF = 'SFX_OFF';
  const GAME_LOAD = 'GAME_LOAD';
  const GAME_SAVE = 'GAME_SAVE';
  const UNUSED_SAVESLOT = 'UNUSED_SAVESLOT';
  const GAME_DELETE = 'GAME_DELETE';
  const GAME_DELCONF = 'GAME_DELCONF';
  const GET_GAMEDATA = 'GET_GAMEDATA';
  const GAMEDATA_LOADED = 'GAMEDATA_LOADED';
  const BATTLEPANEL_ON = 'BATTLEPANEL_ON';
  const BATTLEPANEL_OFF = 'BATTLEPANEL_OFF';
  const BATTLE_ON = 'BATTLE_ON';

  // Audio tags declaration and source declaration
  const mainAudioMusic = document.getElementById('main-audio-music');
  const mainAudioSfxPrimary = document.getElementById('main-audio-sfx-primary');
  const mainAudioSfxSecondary = document.getElementById('main-audio-sfx-secondary');
  const mainAudioSfxTertiary = document.getElementById('main-audio-sfx-tertiary');

  // Audio source declaration
  const mainMenuMusicSource = 'xp_webtech_krf_KRO_main_menu2.mp3';
  const gameMenuMusicSource = 'xp_webtech_krf_KRO_game_menu.mp3';
  const menuHoverSfxSource = 'xp_webtech_krf_button_hover2.mp3';
  const menuClickSfxSource = 'xp_webtech_krf_button_click.mp3';
  const preloaderSfxSource = 'xp_webtech_krf_preloader.mp3';

  // Pseudo pages container's declaration
  const iframeid = document.getElementById('game-frame');
  const preMenu = document.getElementById('pre-menu-id');
  const mainMenu = document.getElementById('main-menu-id');;
  const credits = document.getElementById('credits-id');;
  const gameMenu = document.getElementById('game-menu-id');;
  const battleMap1 = document.getElementById('battle-map-1-id');;

  // Premenu and preloader elements declaration
  const preloaderContainerid = document.getElementById('preloader-containerid');
  const preloaderLeftsideid = document.getElementById('preloader-leftsideid');
  const preloaderRightsideid = document.getElementById('preloader-rightsideid');
  const preMenuPlayButtonid = document.getElementById('pre-menu-play-buttonid');

  // Main menu elements declaration
  const mainMenuCreditsButtonid = document.getElementById('main-menu-credits-buttonid');
  const mainMenuStartButtonid = document.getElementById('main-menu-start-buttonid');
  const mainMenuArmorgamesButtonid = document.getElementById('main-menu-armorgames-buttonid');
  const mainMenuIronhideButtonid = document.getElementById('main-menu-ironhide-buttonid');
  const mainMenuArmorgamesImageid = document.getElementById('main-menu-armorgames-imageid');
  const mainMenuIronhideImageid = document.getElementById('main-menu-ironhide-imageid');
  const mainMenuStartImageid = document.getElementById('main-menu-start-imageid');
  const mainMenuCreditsImageid = document.getElementById('main-menu-credits-imageid');
  const mainMenuPlayonmobileButtonid = document.getElementById('main-menu-playonmobile-buttonid');
  const mainMenuTwitterButtonid = document.getElementById('main-menu-twitter-buttonid');
  const mainMenuFacebookButtonid = document.getElementById('main-menu-facebook-buttonid');
  const mainMenuMusicButtonid = document.getElementById('main-menu-music-buttonid');
  const mainMenuSoundButtonid = document.getElementById('main-menu-sound-buttonid');

  // Load saved menu elements declaration
  const loadSavedMenuid = document.getElementById('load-saved-menuid');
  const loadSavedMenuCloseButtonid = document.getElementById('load-saved-menu-close-buttonid');
  const loadSavedMenuLocalsaveHelpid = document.getElementById('load-saved-menu-localsave-helpid');
  const loadSavedMenuGameslot1Unusedid = document.getElementById('load-saved-menu-gameslot-1-unused-id');
  const loadSavedMenuGameslot1Usedid = document.getElementById('load-saved-menu-gameslot-1-used-id');
  const loadSavedMenuGameslot2Unusedid = document.getElementById('load-saved-menu-gameslot-2-unused-id');
  const loadSavedMenuGameslot2Usedid = document.getElementById('load-saved-menu-gameslot-2-used-id');
  const loadSavedMenuGameslot3Unusedid = document.getElementById('load-saved-menu-gameslot-3-unused-id');
  const loadSavedMenuGameslot3Usedid = document.getElementById('load-saved-menu-gameslot-3-used-id');
  const loadSavedMenuActionsContainerid = document.getElementById('load-saved-menu-actions-containerid');
  const loadSavedMenuGameslot1UsedHoverid = document.getElementById('load-saved-menu-gameslot-1-used-hover-id');
  const loadSavedMenuGameslot2UsedHoverid = document.getElementById('load-saved-menu-gameslot-2-used-hover-id');
  const loadSavedMenuGameslot3UsedHoverid = document.getElementById('load-saved-menu-gameslot-3-used-hover-id');
  const loadSavedMenuGameslot1Delconfid = document.getElementById('load-saved-menu-gameslot-1-delconf-id');
  const loadSavedMenuGameslot2Delconfid = document.getElementById('load-saved-menu-gameslot-2-delconf-id');
  const loadSavedMenuGameslot3Delconfid = document.getElementById('load-saved-menu-gameslot-3-delconf-id');
  const loadSavedGameslot1Stars = document.getElementById('gameslot-1-stars');
  const loadSavedGameslot1Shields = document.getElementById('gameslot-1-shields');
  const loadSavedGameslot1Fists = document.getElementById('gameslot-1-fists');
  const loadSavedGameslot2Stars = document.getElementById('gameslot-2-stars');
  const loadSavedGameslot2Shields = document.getElementById('gameslot-2-shields');
  const loadSavedGameslot2Fists = document.getElementById('gameslot-2-fists');
  const loadSavedGameslot3Stars = document.getElementById('gameslot-3-stars');
  const loadSavedGameslot3Shields = document.getElementById('gameslot-3-shields');
  const loadSavedGameslot3Fists = document.getElementById('gameslot-3-fists');
  const loadSavedMenuGameslot1Deleteid = document.getElementById('load-saved-menu-gameslot-1-delete-id');
  const loadSavedMenuGameslot2Deleteid = document.getElementById('load-saved-menu-gameslot-2-delete-id');
  const loadSavedMenuGameslot3Deleteid = document.getElementById('load-saved-menu-gameslot-3-delete-id');
  const loadSavedMenuGameslot1Delconfyesid = document.getElementById('load-saved-menu-gameslot-1-delconfyes-id');
  const loadSavedMenuGameslot1Delconfnoid = document.getElementById('load-saved-menu-gameslot-1-delconfno-id');
  const loadSavedMenuGameslot2Delconfyesid = document.getElementById('load-saved-menu-gameslot-2-delconfyes-id');
  const loadSavedMenuGameslot2Delconfnoid = document.getElementById('load-saved-menu-gameslot-2-delconfno-id');
  const loadSavedMenuGameslot3Delconfyesid = document.getElementById('load-saved-menu-gameslot-3-delconfyes-id');
  const loadSavedMenuGameslot3Delconfnoid = document.getElementById('load-saved-menu-gameslot-3-delconfno-id');

  // Game menu elements declaration
  const gameMenuStartableid = document.getElementById('game-menu-startableid');
  const gameMenuBattlepointer1id = document.getElementById('game-menu-battlepointer-1-id');
  const gameMenuBackButtonid = document.getElementById('game-menu-back-buttonid');
  const gameMenuStarthereTextid = document.getElementById('game-menu-starthere-textid');
  const gameMenuMusicButtonid = document.getElementById('game-menu-music-buttonid');
  const gameMenuSoundButtonid = document.getElementById('game-menu-sound-buttonid');
  const gameMenuStartableStarsid = document.getElementById('game-menu-startable-starsid');
  const gameMenuBattleStartPanel1id = document.getElementById('game-menu-battle-start-panel-1id');
  const gameMenuBattleStartPanelCloseid = document.getElementById('game-menu-battle-start-panel-closeid');
  const gameMenuBattleStartPanelTobattleid = document.getElementById('game-menu-battle-start-panel-tobattleid');
  const gameMenuDarkLayerid = document.getElementById('game-menu-dark-layerid');

  // Credits elements declaration
  const creditsBackButtonid = document.getElementById('credits-back-buttonid');

  // Elements in this list have mouse over sound effect
  const mouseOverList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuCloseButtonid, loadSavedMenuLocalsaveHelpid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid, gameMenuBackButtonid, gameMenuMusicButtonid, gameMenuSoundButtonid, gameMenuBattlepointer1id, gameMenuBattleStartPanelCloseid, gameMenuBattleStartPanelTobattleid];

  // Elements in this list have mouse click sound effect
  const mouseClickList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid, gameMenuBackButtonid, gameMenuMusicButtonid, gameMenuSoundButtonid, gameMenuBattlepointer1id, gameMenuBattleStartPanelCloseid, gameMenuBattleStartPanelTobattleid];

  // Elements visibility in this list affected by gameslot used or not
  const gameslotElementList = [loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot1Usedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot2Usedid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot3Usedid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot3Deleteid];

  // These elements on the main menu animated a lot of times
  const mainMenuAnimatedElementList = [mainMenuArmorgamesImageid, mainMenuIronhideImageid, mainMenuStartImageid, mainMenuCreditsImageid];

  // This function is the Reducer function for Redux
  function reducer(state, action) {

    if (typeof state === 'undefined') {
      state = {
        previousPage: false,
        currentPage: 'PRE_MENU',
        musicStatus: 'OFF',
        currentMusicSource: false,
        sfxStatus: 'OFF',
        currentSfxSource: false,
        activeGameState: {}
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
      case 'UNUSED_SAVESLOT':
        return Object.assign({}, state, {
                saveSlottoInit: action.payload.saveSlottoInit,
                lastAction: UNUSED_SAVESLOT
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
      case 'GET_GAMEDATA':
        return Object.assign({}, state, {
                activeSlot: action.payload.activeSlot,
                lastAction: GET_GAMEDATA
              })
      case 'GAMEDATA_LOADED':
        return Object.assign({}, state, {
                activeGameState: action.payload.activeGameState,
                lastAction: GAMEDATA_LOADED
              })
      case 'BATTLEPANEL_ON':
        return Object.assign({}, state, {
                selectedMap: action.payload.selectedMap,
                lastAction: BATTLEPANEL_ON
              })
      case 'BATTLEPANEL_OFF':
        return Object.assign({}, state, {
                selectedMap: undefined,
                lastAction: BATTLEPANEL_OFF
              })
      case 'BATTLE_ON':
        return Object.assign({}, state, {
                battleState: action.payload.battleState,
                lastAction: BATTLE_ON
              })
      default:
        return state
    }
  }

  // This function starts the music on/off states
  function musicButtonStateChangeStarter() {
    if (store.getState().musicStatus == 'OFF') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: store.getState().currentMusicSource
        }
      });
      return
    }
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: store.getState().currentMusicSource
        }
      });
      return
    }
  }

  // This function starts the SFX sound on/off states
  function soundButtonStateChangeStarter() {
    if (store.getState().sfxStatus == 'OFF') {
      store.dispatch( {
        type: SFX_ON,
        payload: {
          status: 'ON',
        }
      });
      return
    }
    if (store.getState().sfxStatus == 'ON') {
      store.dispatch( {
        type: SFX_OFF,
        payload: {
          status: 'OFF',
        }
      });
      return
    }
  }

  // This function handles the pre-menu play button state start (enters to main menu, set both SFX and music on)
  function preMenuPlayButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
        previousPage: 'PRE_MENU'
      }
    });
    store.dispatch( {
      type: MUSIC_ON,
      payload: {
        status: 'ON',
        src: mainMenuMusicSource
      }
    });
    store.dispatch( {
      type: SFX_ON,
      payload: {
        status: 'ON',
      }
    });
  }

  // This function handles the main menu credits button state change (enters to credits page)
  function mainMenuCreditsButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'CREDITS',
        previousPage: 'MAIN_MENU'
      }
    });
  }

  // This function handles the main menu start button state change (enters to load-saved pseudo page)
  function mainMenuStartButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'LOAD_SAVED',
        previousPage: 'MAIN_MENU'
      }
    });
  }

  // This function handles the load-saved menu close button state change (goes back to main menu)
  function loadSavedMenuCloseButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
       previousPage: 'LOAD_SAVED'
      }
    });
  }

  // This function handles the load-saved menu gameslot delete button state change (lead to gameslot delete confirmation)
  function loadSavedMenuGameslotDeleteStateChangeStarter(value) {
    store.dispatch( {
      type: GAME_DELETE,
      payload: {
        gameSlot: value
      }
    });
  }

  // This function handles the load-saved menu gameslot delete confirmation button state changey (delete saved game slot if confirmed)
  function loadSavedMenuGameslotDelconfStateChangeStarter(value) {
    store.dispatch( {
      type: GAME_DELCONF,
      payload: {
        delConf: value
      }
    });
  }

  // This function handles the load-saved menu new game button state change (creates an empty save slot)
  function saveGameStateChangeStarter() {
    store.dispatch( {
      type: GAME_SAVE,
      payload: {
        savedData
      }
    });
    saveGame();
  }

  // This function handles the credits page back button state change (goes back to main menu)
  function creditsBackButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
        previousPage: 'CREDITS'
      }
    });
  }

  // This function handles load game state
  function loadGameStateChangeStarter() {
    store.dispatch( {
      type: GAME_LOAD,
      payload: {
        savedData
      }
    });
  }

  // This function handles the unused gamelost creation state change
  function loadSavedMenuGameslotUnusedStateChangeStarter(value) {
    store.dispatch( {
      type: UNUSED_SAVESLOT,
      payload: {
        saveSlottoInit: value
      }
    });
  }

  // This function handles the load-saved menu to game menu state change
  function loadsavedtoGameMenuStateChangeStarter(value) {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'GAME_MENU',
        previousPage: 'LOAD_SAVED'
      }
    });
    store.dispatch( {
      type: GET_GAMEDATA,
      payload: {
        activeSlot: value,
      }
    });
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: gameMenuMusicSource
        }
      });
    } else {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: gameMenuMusicSource
        }
      });
    }
    saveGame();
  }

  // This function handles the game menu to main menu state change (goes back to main menu)
  function gameMenutoMainMenuButtonStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
        previousPage: 'GAME_MENU'
      }
    });
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: mainMenuMusicSource
        }
      });
    } else {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: mainMenuMusicSource
        }
      });
    }
  }

  // This function handles the saved game loading to the current (active) game session state change
  function currentGameDataLoaderStateChangeStarter() {
    if (store.getState().activeSlot == 1) {
      store.dispatch( {
        type: GAMEDATA_LOADED,
        payload: {
          activeGameState: store.getState().savedData.slot1
        }
      });
    }
    if (store.getState().activeSlot == 2) {
      store.dispatch( {
        type: GAMEDATA_LOADED,
        payload: {
          activeGameState: store.getState().savedData.slot2
        }
      });
    }
    if (store.getState().activeSlot == 3) {
      store.dispatch( {
        type: GAMEDATA_LOADED,
        payload: {
          activeGameState: store.getState().savedData.slot3
        }
      });
    }
  }

  // This function handles the game menu battle panel ON state change
  function gameMenuBattlePanelOnStateChangeStarter(map) {
    store.dispatch( {
      type: BATTLEPANEL_ON,
      payload: {
        selectedMap: map
      }
    });
  }

  // This function handles the game menu battle panel OFF state change
  function gameMenuBattlePanelOffStateChangeStarter() {
    store.dispatch( {
      type: BATTLEPANEL_OFF
    });
  }

  // This function handles the game menu battle panel battle start (to battle) state change
  function gameMenutoBattleMapStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'BATTLE_MAP',
        previousPage: 'GAME_MENU'
      }
    });
    store.dispatch( {
      type: BATTLE_ON,
      payload: {
        battleState: 'BATTLE_ON'
      }
    });
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: mainMenuMusicSource
        }
      });
    } else {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: mainMenuMusicSource
        }
      });
    }
  }

  // This function handles the load-saved menu new game button functionality (creates an empty save slot)
  function loadSavedMenuGameslotUnusedFunctionality() {
    if (store.getState().lastAction == 'UNUSED_SAVESLOT') {
      const emptySaveParameters = {
        isUsed: true,
        stars: 0,
        shields: 0,
        fists: 0
      }

      if (store.getState().saveSlottoInit == 1) {
        savedData.slot1 = emptySaveParameters;
      } else if (store.getState().saveSlottoInit == 2) {
        savedData.slot2 = emptySaveParameters;
      } else if (store.getState().saveSlottoInit == 3) {
        savedData.slot3 = emptySaveParameters;
      }

      saveGameStateChangeStarter();
    }
  }

  // This function adds the event listeners to the html elements
  function addEvent(elements, event, functionality, value) {
    if (value != undefined && elements.length > 1) {
      elements.forEach(function(element) {
        element.addEventListener(event, function() { functionality(value) });
      });
    }
    if (value == undefined) {
      elements.addEventListener(event, function() { functionality() });
    }
    if (value != undefined && elements.length == undefined) {
      elements.addEventListener(event, function() { functionality(value) });
    }
  }

  // This function creates empty save slots on the local storage (if the game starts first)
  function gameslotsInitilaizer() {
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

    loadGameStateChangeStarter();
  }

  // This function draws the music and sound icons according to ON/OFF statement
  function soundIconDrawer() {
    if (store.getState().currentPage != 'GAME_MENU') {
      if (store.getState().musicStatus == 'OFF') {
        mainMenuMusicButtonid.classList.remove('main-menu-music-button');
        mainMenuMusicButtonid.classList.add('main-menu-music-button-disabled');
      }
      if (store.getState().musicStatus == 'ON') {
        mainMenuMusicButtonid.classList.add('main-menu-music-button');
        mainMenuMusicButtonid.classList.remove('main-menu-music-button-disabled');
      }
      if (store.getState().sfxStatus == 'OFF') {
        mainMenuSoundButtonid.classList.remove('main-menu-sound-button');
        mainMenuSoundButtonid.classList.add('main-menu-sound-button-disabled');
      }
      if (store.getState().sfxStatus == 'ON') {
        mainMenuSoundButtonid.classList.add('main-menu-sound-button');
        mainMenuSoundButtonid.classList.remove('main-menu-sound-button-disabled');
      }
    }
    if (store.getState().currentPage == 'GAME_MENU') {
      if (store.getState().musicStatus == 'OFF') {
        gameMenuMusicButtonid.classList.remove('game-menu-music-button');
        gameMenuMusicButtonid.classList.add('game-menu-music-button-disabled');
      }
      if (store.getState().musicStatus == 'ON') {
        gameMenuMusicButtonid.classList.add('game-menu-music-button');
        gameMenuMusicButtonid.classList.remove('game-menu-music-button-disabled');
      }
      if (store.getState().sfxStatus == 'OFF') {
        gameMenuSoundButtonid.classList.remove('game-menu-sound-button');
        gameMenuSoundButtonid.classList.add('game-menu-sound-button-disabled');
      }
      if (store.getState().sfxStatus == 'ON') {
        gameMenuSoundButtonid.classList.add('game-menu-sound-button');
        gameMenuSoundButtonid.classList.remove('game-menu-sound-button-disabled');
      }
    }
  }

  // This function draws the used gameslots inner elements
  function gameslotSubElementDrawer() {
    if (store.getState().currentPage == 'LOAD_SAVED') {
      if (savedData.slot1.isUsed == true) {
        loadSavedGameslot1Stars.innerHTML = store.getState().savedData.slot1.stars.toString() + '/77';
        loadSavedGameslot1Shields.innerHTML = store.getState().savedData.slot1.shields;
        loadSavedGameslot1Fists.innerHTML = store.getState().savedData.slot1.fists;
      }
      if (savedData.slot2.isUsed == true) {
        loadSavedGameslot2Stars.innerHTML = store.getState().savedData.slot2.stars.toString() + '/77';
        loadSavedGameslot2Shields.innerHTML = store.getState().savedData.slot2.shields;
        loadSavedGameslot2Fists.innerHTML = store.getState().savedData.slot2.fists;
      }
      if (savedData.slot3.isUsed == true) {
        loadSavedGameslot3Stars.innerHTML = store.getState().savedData.slot3.stars.toString() + '/77';
        loadSavedGameslot3Shields.innerHTML = store.getState().savedData.slot3.shields;
        loadSavedGameslot3Fists.innerHTML = store.getState().savedData.slot3.fists;
      }
    }
  }

  // This function handles the music play or pause
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

  // This function handles the SFX sounds on the 3 SFX only audio tags
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

  // This function handles the game save to the local storage
  function saveGame() {
    if (store.getState().lastAction == 'GAME_SAVE' && store.getState().currentPage == 'LOAD_SAVED') {
      localStorage.setItem('kr_xp_save', JSON.stringify(store.getState().savedData));
      savedData = JSON.parse(localStorage.getItem('kr_xp_save'));
      loadGameStateChangeStarter();
      setTimeout(function(){
        loadSavedMenuGameslotDisplayHandler();
      }, 600);
    }
  }

  // This function handles the delete gameslot confrimtaion if it is yes
  function loadSavedMenuDeleteConfirmationTrue() {
    if (store.getState().lastAction == GAME_DELCONF && store.getState().deleteConfirmation == true) {
      const tempSavedData = store.getState().savedData;

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
      savedData = JSON.parse(localStorage.getItem('kr_xp_save'));
      loadGameStateChangeStarter();
      loadSavedMenuGameslotDisplayHandler();
    }
  }

  // This function handles the delete gameslot confrimtaion if it is no
  function loadSavedMenuDeleteConfirmationFalse() {
    if (store.getState().lastAction == GAME_DELCONF && store.getState().deleteConfirmation == false || store.getState().lastAction == GAME_DELETE) {
      if (store.getState().gameSlot == 1) {
        loadSavedMenuGameslot1Delconfid.classList.toggle('hidden');
      }
      if (store.getState().gameSlot == 2) {
        loadSavedMenuGameslot2Delconfid.classList.toggle('hidden');
      }
      if (store.getState().gameSlot == 3) {
        loadSavedMenuGameslot3Delconfid.classList.toggle('hidden');
      }
    }
  }

  // This function handles the main menu to load-saved menu change
  function mainMenutoLoadSavedMenu() {
    if (store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'LOAD_SAVED') {
      mainMenuCreditsButtonid.classList.remove('main-menu-credits-button');
      mainMenuStartButtonid.classList.remove('main-menu-start-button');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList = [];
      });

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image-reverse');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image-reverse');
      mainMenuStartImageid.classList.add('main-menu-start-image-reverse');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image-reverse');
      mainMenuCreditsButtonid.classList.add('hidden');
      mainMenuStartButtonid.classList.add('hidden');

      loadSavedMenuid.classList.remove('load-saved-menu-start', 'load-saved-menu-reverse');
      loadSavedMenuid.classList.add('load-saved-menu');

      setTimeout(function(){
        try { loadSavedMenuActionsContainerid.classList.remove('hidden') }
        catch(err) {}
      }, 800);

      setTimeout(function(){
        loadSavedMenuGameslotDisplayHandler();
      }, 600);


      loadSavedMenuDeleteConfirmationTrue();
      loadSavedMenuDeleteConfirmationFalse();
    }
  }

  // This function handles the load saved menu game slot delete state
  function loadSavedMenuGameslotDeleteHandler() {
    if (store.getState().lastAction == 'GAME_DELETE') {
      loadSavedMenuGameslotDisplayHandler();
    }
  }

  // This function handles the load-saved menu to main menu change
  function loadSavedMenutoMainMenu() {
    if (store.getState().previousPage == 'LOAD_SAVED' && store.getState().currentPage == 'MAIN_MENU') {
      mainMenuCreditsImageid.classList.replace('main-menu-credits-image-reverse', 'main-menu-credits-image-ls');
      mainMenuStartImageid.classList.replace('main-menu-start-image-reverse', 'main-menu-start-image-ls');
      mainMenuArmorgamesImageid.classList.replace('main-menu-armorgames-image-reverse', 'main-menu-armorgames-image-ls');
      mainMenuIronhideImageid.classList.replace('main-menu-ironhide-image-reverse', 'main-menu-ironhide-image-ls');

      mainMenuCreditsButtonid.classList.remove('hidden');
      mainMenuStartButtonid.classList.remove('hidden');
      mainMenuArmorgamesButtonid.classList.remove('hidden');
      mainMenuIronhideButtonid.classList.remove('hidden');

      loadSavedMenuid.classList.remove('load-saved-menu');
      loadSavedMenuid.classList.add('load-saved-menu-reverse');

      loadSavedMenuActionsContainerid.classList.add('hidden');

      setTimeout(function(){
        mainMenuCreditsButtonid.classList.remove('hidden');
        mainMenuStartButtonid.classList.remove('hidden');
      }, 1200);

      setTimeout(function(){
        try {
          mainMenuCreditsButtonid.classList.add('main-menu-credits-button');
          mainMenuStartButtonid.classList.add('main-menu-start-button');
        }
        catch(err) {}
      }, 800);
    }
  }

  // This function handles the main menu not from load-saved menu change (main menu from pre menu or credits)
  function mainMenuNotfromLoadSavedMenu() {
    if (store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage !== 'LOAD_SAVED') {
      setTimeout(function(){
        try {
          mainMenuCreditsButtonid.classList.add('main-menu-credits-button');
          mainMenuStartButtonid.classList.add('main-menu-start-button');
        }
        catch(err) {}
      }, 1400);
    }
  }

  // This function handles the pre menu to main menu change
  function preMenutoMainMenu() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'PRE_MENU' && store.getState().currentPage == 'MAIN_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();
      loadSavedMenuGameslotDisplayHandler();

      setTimeout(function(){
        preMenu.classList.add('pagehide');
        mainMenu.classList.remove('pagehide');
      }, 600);

      mainMenuPlayonmobileButtonid.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList.remove('nodisplay');
      });
    }
  }

  // This function handles the main menu to game change
  function loadSavedtoGameMenu() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'LOAD_SAVED' && store.getState().currentPage == 'GAME_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        mainMenuPlayonmobileButtonid.classList.add('nodisplay');
        mainMenu.classList.add('pagehide');
        gameMenu.classList.remove('pagehide');
      }, 600);

      if (store.getState().activeGameState.isMap1Completed != true) {
        setTimeout(function(){
          gameMenuStarthereTextid.classList.remove('nodisplay');
        }, 2200);
      }

      gameMenuStartableid.classList.remove('nodisplay');
      gameMenuBattlepointer1id.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList.add('nodisplay');
      });
    }
  }

  // This function handles the main menu to game change
  function gameMenutoMainMenu() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'GAME_MENU' && store.getState().currentPage == 'MAIN_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        gameMenu.classList.add('pagehide');
        mainMenu.classList.remove('pagehide');
        gameMenuStartableid.classList.add('nodisplay');
        gameMenuBattlepointer1id.classList.add('nodisplay');
        if (store.getState().activeGameState.isMap1Completed != true) {
          gameMenuStarthereTextid.classList.add('nodisplay');
        }
      }, 600);

      setTimeout(function(){
        mainMenuCreditsButtonid.classList.remove('hidden');
        mainMenuStartButtonid.classList.remove('hidden');
      }, 1400);

      mainMenuPlayonmobileButtonid.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList = [];
      });

      loadSavedMenuid.classList.remove('load-saved-menu');
      loadSavedMenuid.classList.add('load-saved-menu-reverse');

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image');
      mainMenuStartImageid.classList.add('main-menu-start-image');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image');
    }
  }

  // This function handles the credits to main menu change
  function CreditstoMainMenu() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'CREDITS' && store.getState().currentPage == 'MAIN_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        credits.classList.add('pagehide');
        mainMenu.classList.remove('pagehide');
      }, 600);

      setTimeout(function(){
        mainMenuCreditsButtonid.classList.remove('hidden');
        mainMenuStartButtonid.classList.remove('hidden');
      }, 1400);

      mainMenuPlayonmobileButtonid.classList.add('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList.add('nodisplay');
      });
      mainMenuPlayonmobileButtonid.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList = [];
      });

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image');
      mainMenuStartImageid.classList.add('main-menu-start-image');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image');
    }
  }

  // This function handles the main menu to credits change
  function mainMenutoCredits() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'CREDITS') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      mainMenuCreditsButtonid.classList.add('hidden');
      mainMenuStartButtonid.classList.add('hidden');

      setTimeout(function(){
        mainMenu.classList.add('pagehide');
        credits.classList.remove('pagehide');
        mainMenuPlayonmobileButtonid.classList.add('nodisplay');
        mainMenuAnimatedElementList.forEach(function(element) {
          element.classList.add('nodisplay');
        });
      }, 600);
    }
  }

  // This function handles restarts the preloader animation
  function preloaderStarter() {
    // Reload the preloader animation
    preloaderContainerid.classList.remove('hidden');
    preloaderLeftsideid.classList.remove('preloader-leftside');
    preloaderRightsideid.classList.remove('preloader-rightside');
    preloaderLeftsideid.getBoundingClientRect();
    preloaderRightsideid.getBoundingClientRect();
    preloaderLeftsideid.classList.add('preloader-leftside');
    preloaderRightsideid.classList.add('preloader-rightside');
  }

  // This function handles the load saved menu gameslot dispaly changes
  function loadSavedMenuGameslotDisplayHandler() {
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

  // This function initiates the saved game loading to the current (active) game session
  function currentGameDataLoadingHandler() {
    if (store.getState().lastAction == 'GET_GAMEDATA') {
      currentGameDataLoaderStateChangeStarter();
    }
  }

  // This function handles the drawing of the game menu startable text
  function gameMenuStartableDrawer() {
    if (store.getState().currentPage == 'GAME_MENU' && store.getState().lastAction == 'GAMEDATA_LOADED') {
      gameMenuStartableStarsid.innerHTML = store.getState().activeGameState.stars.toString() + '/77';
    }
  }

  // This function handles the drawing of the game menu battlepanel ON statement
  function gameMenuBattlePanelDrawer() {
    if (store.getState().lastAction == 'BATTLEPANEL_ON') {
      gameMenuStarthereTextid.classList.add('nodisplay');
      gameMenuBattleStartPanel1id.classList.remove('nodisplay');
      gameMenuDarkLayerid.classList.remove('nodisplay');
    }
  }

  // This function handles the drawing of the game menu battlepanel OFF statement
  function gameMenuBattlePanelDeleter() {
    if (store.getState().lastAction == 'BATTLEPANEL_OFF') {
      gameMenuBattleStartPanel1id.classList.add('game-menu-battle-start-panel-fadeout');
      gameMenuDarkLayerid.classList.add('game-menu-dark-layer-fadeout');

      setTimeout(function(){
        gameMenuBattleStartPanel1id.classList.remove('game-menu-battle-start-panel-fadeout');
        gameMenuDarkLayerid.classList.remove('game-menu-dark-layer-fadeout');
        gameMenuBattleStartPanel1id.classList.add('nodisplay');
        gameMenuDarkLayerid.classList.add('nodisplay');
      }, 600);
    }
  }

  // This function handles the game menu to battle map
  function gameMenutoBattleMap() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'GAME_MENU' && store.getState().currentPage == 'BATTLE_MAP') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        gameMenuBattlePanelDeleter();
        gameMenu.classList.add('pagehide');
        battleMap1.classList.remove('pagehide');
      }, 600);
    }
  }

  // This function handles sound and display rendering according to the actual statement
  function render() {
    mainMusicController();
    soundIconDrawer();
    gameslotSubElementDrawer();
    preMenutoMainMenu();
    mainMenutoCredits();
    CreditstoMainMenu();
    mainMenutoLoadSavedMenu();
    loadSavedMenutoMainMenu();
    mainMenuNotfromLoadSavedMenu();
    loadSavedMenuGameslotUnusedFunctionality();
    loadSavedtoGameMenu();
    gameMenutoMainMenu();
    currentGameDataLoadingHandler();
    gameMenuStartableDrawer();
    gameMenuBattlePanelDrawer();
    gameMenuBattlePanelDeleter();
    gameMenutoBattleMap();
  }

  gameslotsInitilaizer();
  addEvent(mouseOverList, 'mouseover', mainSfxController, menuHoverSfxSource);
  addEvent(mouseClickList, 'click', mainSfxController, menuClickSfxSource);
  addEvent(mainMenuMusicButtonid, 'click', musicButtonStateChangeStarter, undefined);
  addEvent(mainMenuSoundButtonid, 'click', soundButtonStateChangeStarter, undefined);
  addEvent(preMenuPlayButtonid, 'click', preMenuPlayButtonStateChangeStarter, undefined);
  addEvent(mainMenuCreditsButtonid, 'click', mainMenuCreditsButtonStateChangeStarter, undefined);
  addEvent(mainMenuStartButtonid, 'click', mainMenuStartButtonStateChangeStarter, undefined);
  addEvent(loadSavedMenuCloseButtonid, 'click', loadSavedMenuCloseButtonStateChangeStarter, undefined);
  addEvent(loadSavedMenuGameslot1Deleteid, 'click', loadSavedMenuGameslotDeleteStateChangeStarter, 1);
  addEvent(loadSavedMenuGameslot2Deleteid, 'click', loadSavedMenuGameslotDeleteStateChangeStarter, 2);
  addEvent(loadSavedMenuGameslot3Deleteid, 'click', loadSavedMenuGameslotDeleteStateChangeStarter, 3);
  addEvent(loadSavedMenuGameslot1Delconfyesid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, true);
  addEvent(loadSavedMenuGameslot2Delconfyesid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, true);
  addEvent(loadSavedMenuGameslot3Delconfyesid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, true);
  addEvent(loadSavedMenuGameslot1Delconfnoid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, false);
  addEvent(loadSavedMenuGameslot2Delconfnoid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, false);
  addEvent(loadSavedMenuGameslot3Delconfnoid, 'click', loadSavedMenuGameslotDelconfStateChangeStarter, false);
  addEvent(loadSavedMenuGameslot1Unusedid, 'click', loadSavedMenuGameslotUnusedStateChangeStarter, 1);
  addEvent(loadSavedMenuGameslot2Unusedid, 'click', loadSavedMenuGameslotUnusedStateChangeStarter, 2);
  addEvent(loadSavedMenuGameslot3Unusedid, 'click', loadSavedMenuGameslotUnusedStateChangeStarter, 3);
  addEvent(loadSavedMenuGameslot1Unusedid, 'click', loadsavedtoGameMenuStateChangeStarter, 1);
  addEvent(loadSavedMenuGameslot2Unusedid, 'click', loadsavedtoGameMenuStateChangeStarter, 2);
  addEvent(loadSavedMenuGameslot3Unusedid, 'click', loadsavedtoGameMenuStateChangeStarter, 3);
  addEvent(loadSavedMenuGameslot1UsedHoverid, 'click', loadsavedtoGameMenuStateChangeStarter, 1);
  addEvent(loadSavedMenuGameslot2UsedHoverid, 'click', loadsavedtoGameMenuStateChangeStarter, 2);
  addEvent(loadSavedMenuGameslot3UsedHoverid, 'click', loadsavedtoGameMenuStateChangeStarter, 3);
  addEvent(creditsBackButtonid, 'click', creditsBackButtonStateChangeStarter, undefined);
  addEvent(gameMenuBackButtonid, 'click', gameMenutoMainMenuButtonStateChangeStarter, undefined);
  addEvent(gameMenuMusicButtonid, 'click', musicButtonStateChangeStarter, undefined);
  addEvent(gameMenuSoundButtonid, 'click', soundButtonStateChangeStarter, undefined);
  addEvent(gameMenuBattlepointer1id, 'click', gameMenuBattlePanelOnStateChangeStarter, 1);
  addEvent(gameMenuBattleStartPanelCloseid, 'click', gameMenuBattlePanelOffStateChangeStarter, undefined);
  addEvent(gameMenuBattleStartPanelTobattleid, 'click', gameMenutoBattleMapStateChangeStarter, undefined);

  setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
