'use strict'

const MenuLogic = (function() {

  // Redux and global variable declaration
  const store = Redux.createStore(reducer);
  store.subscribe(render);
  let savedData;
  let sfxHelper = 0;

  // Audio tags and source declaration
  const mainAudioMusic = document.getElementById('main-audio-music');
  const mainAudioSfxPrimary = document.getElementById('main-audio-sfx-primary');
  const mainAudioSfxSecondary = document.getElementById('main-audio-sfx-secondary');
  const mainAudioSfxTertiary = document.getElementById('main-audio-sfx-tertiary');
  const menuHoverSfxSource = '../assets/sound/sfx/button_hover2.mp3';
  const menuClickSfxSource = '../assets/sound/sfx/button_click.mp3';
  const preloaderSfxSource = '../assets/sound/sfx/preloader.mp3';

  // Pseudo pages container's declaration
  const iframeid = document.getElementById('game-frame');
  const preMenu = document.getElementById('pre-menu-id');
  const mainMenu = document.getElementById('main-menu-id');;
  const credits = document.getElementById('credits-id');;

  // Premenu and preloader elements declaration
  const preloaderContainerid = document.getElementById('preloader-containerid');
  const preloaderLeftsideid = document.getElementById('preloader-leftsideid');
  const preloaderRightsideid = document.getElementById('preloader-rightsideid');
  const preloaderFakeBackgroundid = document.getElementById('preloader-fake-backgroundid');
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

  // Credits elements declaration
  const creditsBackButtonid = document.getElementById('credits-back-buttonid');

  // Elements in this list have mouse over sound effect
  const mouseOverList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuCloseButtonid, loadSavedMenuLocalsaveHelpid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid];

  // Elements in this list have mouse click sound effect
  const mouseClickList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid];

  // Elements visibility in this list affected by gameslot used or not
  const gameslotElementList = [loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot1Usedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot2Usedid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot3Usedid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot3Deleteid];

  // These elements on the main menu animated a lot of times
  const mainMenuAnimatedElementList = [mainMenuArmorgamesImageid, mainMenuIronhideImageid, mainMenuStartImageid, mainMenuCreditsImageid];

  // This function starts the music on/off states
  function musicButtonStateChangeStarter () {
    if (store.getState().musicStatus == 'OFF') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: "../assets/sound/KRO_main_menu2.mp3"
        }
      });
      return
    }
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: false
        }
      });
      return
    }
  }

  // This function starts the SFX sound on/off states
  function soundButtonStateChangeStarter () {
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
  function preMenuPlayButtonStateChangeStarter () {
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
        src: "../assets/sound/KRO_main_menu2.mp3"
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
  function mainMenuCreditsButtonStateChangeStarter () {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'CREDITS',
        previousPage: 'MAIN_MENU'
      }
    });
  }

  // This function handles the main menu start button state change (enters to load-saved pseudo page)
  function mainMenuStartButtonStateChangeStarter () {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'LOAD_SAVED',
        previousPage: 'MAIN_MENU'
      }
    });
  }

  // This function handles the load-saved menu close button state change (goes back to main menu)
  function loadSavedMenuCloseButtonStateChangeStarter () {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
       previousPage: 'LOAD_SAVED'
      }
    });
  }

  // This function handles the load-saved menu gameslot delete button state change (lead to gameslot delete confirmation)
  function loadSavedMenuGameslotDeleteStateChangeStarter (value) {
    store.dispatch( {
      type: GAME_DELETE,
      payload: {
        gameSlot: value
      }
    });
  }

  // This function handles the load-saved menu gameslot delete confirmation button state changey (delete saved game slot if confirmed)
  function loadSavedMenuGameslotDelconfStateChangeStarter (value) {
    store.dispatch( {
      type: GAME_DELCONF,
      payload: {
        delConf: value
      }
    });
  }

  // This function handles the load-saved menu new game button state change (creates an empty save slot)
  function saveGameStateChangeStarter () {
    store.dispatch( {
      type: GAME_SAVE,
      payload: {
        savedData
      }
    });
    saveGame();
  }

  // This function handles the credits page back button state change (goes back to main menu)
  function creditsBackButtonStateChangeStarter () {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'MAIN_MENU',
        previousPage: 'CREDITS'
      }
    });
  }

  // This function handles load game state
  function loadGameStateChangeStarter () {
    store.dispatch( {
      type: GAME_LOAD,
      payload: {
        savedData
      }
    });
  }

  // This function handles the load-saved menu new game button functionality (creates an empty save slot)
  function loadSavedMenuGameslotUnusedFunctionality (value) {
    const emptySaveParameters = {
      isUsed: true,
      stars: 0,
      shields: 0,
      fists: 0
    }

    if (value == 1) {
      savedData.slot1 = emptySaveParameters;
    } else if (value == 2) {
      savedData.slot2 = emptySaveParameters;
    } else if (value == 3) {
      savedData.slot3 = emptySaveParameters;
    }

    saveGameStateChangeStarter();
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

  // This function is the Reducer function for Redux
  function reducer (state, action) {

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

  // This function creates empty save slots on the local storage (if the game starts first)
  function gameslotsInitilaizer () {
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
  function soundIconDrawer () {
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

  // This function draws the used gameslots inner elements
  function gameslotSubElementDrawer () {
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
  function mainMusicController () {
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
  function mainSfxController (source) {
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
  function saveGame () {
    if (store.getState().lastAction == 'GAME_SAVE' && store.getState().currentPage == 'LOAD_SAVED') {
      localStorage.setItem('kr_xp_save', JSON.stringify(store.getState().savedData));
      savedData = JSON.parse(localStorage.getItem('kr_xp_save'));
      loadGameStateChangeStarter();
    }
  }

  // This function handles the delete gameslot confrimtaion if it is yes
  function loadSavedMenuDeleteConfirmationTrue () {
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
    }
  }

  // This function handles the delete gameslot confrimtaion if it is no
  function loadSavedMenuDeleteConfirmationFalse () {
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
  function mainMenutoLoadSavedMenu () {
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

      loadSavedMenuid.classList.remove('load-saved-menu-start', 'load-saved-menu-reverse');
      loadSavedMenuid.classList.add('load-saved-menu');

      setTimeout(function(){
        try { loadSavedMenuActionsContainerid.classList.remove('hidden') }
        catch(err) {}
      }, 800);

      loadSavedMenuDeleteConfirmationTrue();
      loadSavedMenuDeleteConfirmationFalse();
    }
  }

  // This function handles the load-saved menu to main menu change
  function loadSavedMenutoMainMenu () {
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
        try {
          mainMenuCreditsButtonid.classList.add('main-menu-credits-button');
          mainMenuStartButtonid.classList.add('main-menu-start-button');
        }
        catch(err) {}
      }, 800);
    }
  }

  // This function handles the main menu not from load-saved menu change (main menu from pre menu or credits)
  function mainMenuNotfromLoadSavedMenu () {
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

  // This function help on the page change by restarting by changeing backgrounds
  function pageChangeBackgroundChanger (previousPageFakeBackground, currentPageFakeBackground) {
    preloaderFakeBackgroundid.classList.add(previousPageFakeBackground);
    setTimeout(function(){
        preloaderFakeBackgroundid.classList.remove(previousPageFakeBackground);
        preloaderFakeBackgroundid.classList.add(currentPageFakeBackground);
    }, 600);
    setTimeout(function(){
        iframeid.classList.remove('hidden');
        preloaderFakeBackgroundid.classList.remove(currentPageFakeBackground);
        preloaderFakeBackgroundid.classList.add('hidden');
    }, 1000);
  }

  // This function handles the pre menu to main menu change
  function preMenutoMainMenu () {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'PRE_MENU' && store.getState().currentPage == 'MAIN_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      preMenu.classList.add('pagehide');
      mainMenu.classList.remove('pagehide');
      mainMenuPlayonmobileButtonid.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList.remove('nodisplay');
      });
      pageChangeBackgroundChanger ('preloader-fake-background-premenu', 'preloader-fake-background-mainmenu-stripped')
    }
  }

  // This function handles the main menu to credits change
  function mainMenutoCredits () {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'CREDITS') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      mainMenu.classList.add('pagehide');
      credits.classList.remove('pagehide');
      mainMenuPlayonmobileButtonid.classList.add('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList.add('nodisplay');
      });
      pageChangeBackgroundChanger ('preloader-fake-background-mainmenu', 'preloader-fake-background-creditsmenu')
    }
  }

  // This function handles the credits to main menu change
  function CreditstoMainMenu () {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'CREDITS' && store.getState().currentPage == 'MAIN_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      credits.classList.add('pagehide');
      mainMenu.classList.remove('pagehide');

      mainMenuPlayonmobileButtonid.classList.remove('nodisplay');
      mainMenuAnimatedElementList.forEach(function(element) {
        element.classList = [];
      });

      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image');
      mainMenuStartImageid.classList.add('main-menu-start-image');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image');

      pageChangeBackgroundChanger ('preloader-fake-background-creditsmenu', 'preloader-fake-background-mainmenu-stripped')
    }
  }

  // This function handles restarts the preloader animation
  function preloaderStarter () {
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
  }

  // This function handles music and display rendering
  function render () {
    // Add sound to the preloader from pre-menu to main-menu
    // if(store.getState().currentPage == 'MAIN_MENU' && store.getState().previousPage == 'PRE_MENU') {
    //   mainSfxController(preloaderSfxSource);
    // }
    mainMusicController();
    soundIconDrawer();
    gameslotSubElementDrawer();
    preMenutoMainMenu();
    mainMenutoCredits();
    CreditstoMainMenu();
    mainMenutoLoadSavedMenu();
    loadSavedMenutoMainMenu();
    mainMenuNotfromLoadSavedMenu();

    // If gameload can be handled by really laoding the next game pahse, then this section will be useless so van be deleted.
    if (store.getState().lastAction == 'GAME_LOAD') {
      console.log('lastAction == GAME_LOAD');
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
  addEvent(loadSavedMenuGameslot1Unusedid, 'click', loadSavedMenuGameslotUnusedFunctionality, 1);
  addEvent(loadSavedMenuGameslot2Unusedid, 'click', loadSavedMenuGameslotUnusedFunctionality, 2);
  addEvent(loadSavedMenuGameslot3Unusedid, 'click', loadSavedMenuGameslotUnusedFunctionality, 3);
  addEvent(creditsBackButtonid, 'click', creditsBackButtonStateChangeStarter, undefined);

  setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
