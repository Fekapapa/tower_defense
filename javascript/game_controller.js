'use strict'

const GameLogic = (function() {

  // IE11 PLOYFILLS

  //Redux core light (comverted from ES6 using babeljs.io)
  const Redux = {};
  Redux.createStore = function (reducer) {
    let state = void 0;
    let listeners = [];
    const getState = function getState() {
      return state;
    };
    const dispatch = function dispatch(action) {
      state = reducer(state, action);
      listeners.forEach(function (l) {
        return l();
      });
    };
    const subscribe = function subscribe(listener) {
      listeners.push(listener);
      return function () {
        listeners = listeners.filter(function (l) {
          return l !== listener;
        });
      };
    };
    dispatch({});
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
  };

  // ES5 object.assign
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function(target) {
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        let to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          let nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);

          let keysArray = Object.keys(Object(nextSource));
          for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            let nextKey = keysArray[nextIndex];
            let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }

  // Redux and global variable declaration
  const store = Redux.createStore(reducer);
  store.subscribe(render);
  let savedData;
  let sfxHelper = 0;
  let activeGameState = {};
  let isUserFocusOnThePage = true;
  let isUserFocusOnTheGame = true;

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
  const DIFFICULTY_CHANGE = 'DIFFICULTY_CHANGE';
  const PLAYPAUSE_CHANGE = 'PLAYPAUSE_CHANGE';
  const AUTOPAUSE_CHANGE = 'AUTOPAUSE_CHANGE';
  const TOWER_CLICKED = 'TOWER_CLICKED';
  const TOWER_UNCLICKED = 'TOWER_UNCLICKED';
  // const BUILDMENU_OPEN = 'BUILDMENU_OPEN';
  // const BUILDMENU_CLOSE = 'BUILDMENU_CLOSE';
  const BUILDBUTTON_CLICKED = 'BUILDBUTTON_CLICKED';
  const BUILD_START = 'BUILD_START';
  const TOWERBUILD_FINISHED = 'TOWERBUILD_FINISHED';

  // Audio tags declaration and source declaration
  const mainAudioMusic = document.getElementById('main-audio-music');
  const mainAudioSfxPrimary = document.getElementById('main-audio-sfx-primary');
  const mainAudioSfxSecondary = document.getElementById('main-audio-sfx-secondary');
  const mainAudioSfxTertiary = document.getElementById('main-audio-sfx-tertiary');

  // Audio source declaration
  const mainMenuMusicSource = 'xp_webtech_krf_krf_mainmenu_theme.mp3';
  const gameMenuMusicSource = 'xp_webtech_krf_krf_gamemenu_theme.mp3';
  const battleMap1MusicSource = 'xp_webtech_krf_krf_battlemap1_theme.mp3';
  const menuHoverSfxSource = 'xp_webtech_krf_button_hover2.mp3';
  const menuClickSfxSource = 'xp_webtech_krf_button_click.mp3';
  const preloaderSfxSource = 'xp_webtech_krf_preloader.mp3';
  const buildMenuOpenSfxSource = 'xp_webtech_krf_build_menu_open.mp3';
  const towerBuildingSfxSource = 'xp_webtech_krf_tower_building.mp3';
  const archersReadySfxSource = 'xp_webtech_krf_archers_ready.mp3';
  const mageReadySfxSource = 'xp_webtech_krf_mage_ready.mp3';
  const battlemapLoadedSfxSource = 'xp_webtech_krf_battlemap_loaded.mp3';

  // Pseudo pages container's declaration
  const pseudoCanvas = document.getElementById('pseudo-canvas');
  const preMenu = document.getElementById('pre-menu-id');
  const mainMenu = document.getElementById('main-menu-id');;
  const credits = document.getElementById('credits-id');;
  const gameMenu = document.getElementById('game-menu-id');;
  const prologue = document.getElementById('prologue-id');;
  const battleMap1 = document.getElementById('battle-map-1-id');;

  // Premenu and preloader elements declaration
  const preloaderContainerid = document.getElementById('preloader-containerid');
  const preloaderLeftsideid = document.getElementById('preloader-leftsideid');
  const preloaderRightsideid = document.getElementById('preloader-rightsideid');
  const preMenuPlayButtonid = document.getElementById('pre-menu-play-buttonid');

  // Game pause elements declaration
  const battleMapGamePauseid = document.getElementById('battle-map-game-pauseid');
  const landingPageBody = document.getElementById('landing_page_bodyid');

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
  const gameMenuBattleStartPanelChooseDifficultyid = document.getElementById('game-menu-battle-start-panel-choose-difficultyid');
  const gameMenuBattleStartPanelChooseDifficultyCasualid = document.getElementById('game-menu-battle-start-panel-choose-difficulty-casualid');
  const gameMenuBattleStartPanelChooseDifficultyNormalid = document.getElementById('game-menu-battle-start-panel-choose-difficulty-normalid');
  const gameMenuBattleStartPanelChooseDifficultyVeteranid = document.getElementById('game-menu-battle-start-panel-choose-difficulty-veteranid');
  const gameMenuBattleStartPanelActualDifficultyid = document.getElementById('game-menu-battle-start-panel-actual-difficultyid');
  const gameMenuBattleStartPanelLockedModeShieldsid = document.getElementById('game-menu-battle-start-panel-locked-mode-shieldsid');
  const gameMenuBattleStartPanelLockedModeStarsid = document.getElementById('game-menu-battle-start-panel-locked-mode-starsid');

  // Credits elements declaration
  const creditsBackButtonid = document.getElementById('credits-back-buttonid');

  // Prologue elements declaration
  const prologueComic1id = document.getElementById('prologue-comic-1id');
  const prologueComic2id = document.getElementById('prologue-comic-2id');
  const prologueComic3id = document.getElementById('prologue-comic-3id');
  const prologueComic4id = document.getElementById('prologue-comic-4id');
  const prologueComic5id = document.getElementById('prologue-comic-5id');
  const prologueComicClickid = document.getElementById('prologue-comic-clickid');

  // Battle map 1 elements declaration
  const battleMapInfoPanelid = document.getElementById('battle-map-info-panelid');
  const battleMapInfoPanelHealthTextid = document.getElementById('battle-map-info-panel-health-textid');
  const battleMapInfoPanelGoldTextid = document.getElementById('battle-map-info-panel-gold-textid');
  const battleMapInfoPanelWaveTextid = document.getElementById('battle-map-info-panel-wave-textid');
  const battleMapPauseButtonid = document.getElementById('battle-map-pause-buttonid');
  const battleMapOptionsButtonid = document.getElementById('battle-map-options-buttonid');
  const battleMap1Wavestart1id = document.getElementById('battle-map-1-wavestart-1id');
  const battleMap1Wavestart2id = document.getElementById('battle-map-1-wavestart-2id');
  const battleMap1BuildHereTextid = document.getElementById('battle-map-1-build-here-textid');
  const battleMap1StartHereTextid = document.getElementById('battle-map-1-start-here-textid');
  const battleMap1TowerSlot1id = document.getElementById('battle-map-1-tower-slot-1id');
  const battleMap1TowerSlot2id = document.getElementById('battle-map-1-tower-slot-2id');
  const battleMap1TowerSlot3id = document.getElementById('battle-map-1-tower-slot-3id');
  const battleMap1TowerSlot4id = document.getElementById('battle-map-1-tower-slot-4id');
  const battleMap1TowerSlot5id = document.getElementById('battle-map-1-tower-slot-5id');
  const battleMap1TowerSlot6id = document.getElementById('battle-map-1-tower-slot-6id');
  const battleMap1TowerSlot7id = document.getElementById('battle-map-1-tower-slot-7id');
  const battleMap1TowerSlot8id = document.getElementById('battle-map-1-tower-slot-8id');
  const battleMap1TowerSlot9id = document.getElementById('battle-map-1-tower-slot-9id');
  const battleMap1TowerSlot10id = document.getElementById('battle-map-1-tower-slot-10id');
  const battleMap1TowerSlot11id = document.getElementById('battle-map-1-tower-slot-11id');
  const battleMap1TowerSlot12id = document.getElementById('battle-map-1-tower-slot-12id');
  const battleMap1Startgameid = document.getElementById('battle-map-1-startgameid');
  const battleMapFooterid = document.getElementById('battle-map-footerid');
  const battleMap1Wavestartid = document.getElementById('battle-map-1-wavestartid');
  const battleMap1BuildHereTextContainerid = document.getElementById('battle-map-1-build-here-text-containerid');
  const battleMap1StartHereTextContainerid = document.getElementById('battle-map-1-start-here-text-containerid');
  const battleMapActiveBuildMenuid = document.getElementById('battle-map-active-build-menuid');
  const battleMapActiveBuildMenuCloseid = document.getElementById('battle-map-active-build-menu-closeid');
  const battleMapTowerBuildMenuInnerbox1Costid = document.getElementById('battle-map-tower-build-menu-innerbox-1-costid');
  const battleMapTowerBuildMenuInnerbox2Costid = document.getElementById('battle-map-tower-build-menu-innerbox-2-costid');
  const battleMapTowerBuildMenuInnerbox3Costid = document.getElementById('battle-map-tower-build-menu-innerbox-3-costid');
  const battleMapTowerBuildMenuInnerbox4Costid = document.getElementById('battle-map-tower-build-menu-innerbox-4-costid');
  const battleMapTowerBuildMenuInnerbox1CostCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-1-cost-closeid');
  const battleMapTowerBuildMenuInnerbox2CostCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-2-cost-closeid');
  const battleMapTowerBuildMenuInnerbox3CostCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-3-cost-closeid');
  const battleMapTowerBuildMenuInnerbox4CostCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-4-cost-closeid');
  const battleMapTowerBuildMenuInnerbox1Imageid = document.getElementById('battle-map-tower-build-menu-innerbox-1-imageid');
  const battleMapTowerBuildMenuInnerbox2Imageid = document.getElementById('battle-map-tower-build-menu-innerbox-2-imageid');
  const battleMapTowerBuildMenuInnerbox3Imageid = document.getElementById('battle-map-tower-build-menu-innerbox-3-imageid');
  const battleMapTowerBuildMenuInnerbox4Imageid = document.getElementById('battle-map-tower-build-menu-innerbox-4-imageid');
  const battleMapTowerBuildMenuInnerbox1ImageCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-1-image-closeid');
  const battleMapTowerBuildMenuInnerbox2ImageCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-2-image-closeid');
  const battleMapTowerBuildMenuInnerbox3ImageCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-3-image-closeid');
  const battleMapTowerBuildMenuInnerbox4ImageCloseid = document.getElementById('battle-map-tower-build-menu-innerbox-4-image-closeid');
  const battleMapTowerBuildMenuInnerbox1id = document.getElementById('battle-map-tower-build-menu-innerbox-1id');
  const battleMapTowerBuildMenuInnerbox2id = document.getElementById('battle-map-tower-build-menu-innerbox-2id');
  const battleMapTowerBuildMenuInnerbox3id = document.getElementById('battle-map-tower-build-menu-innerbox-3id');
  const battleMapTowerBuildMenuInnerbox4id = document.getElementById('battle-map-tower-build-menu-innerbox-4id');
  const battleMapTowerBuildMenuInnerbox1Closeid = document.getElementById('battle-map-tower-build-menu-innerbox-1-closeid');
  const battleMapTowerBuildMenuInnerbox2Closeid = document.getElementById('battle-map-tower-build-menu-innerbox-2-closeid');
  const battleMapTowerBuildMenuInnerbox3Closeid = document.getElementById('battle-map-tower-build-menu-innerbox-3-closeid');
  const battleMapTowerBuildMenuInnerbox4Closeid = document.getElementById('battle-map-tower-build-menu-innerbox-4-closeid');
  const battleMap1TowerSlot1Barid = document.getElementById('battle-map-1-tower-slot-1-barid');
  const battleMap1TowerSlot2Barid = document.getElementById('battle-map-1-tower-slot-2-barid');
  const battleMap1TowerSlot3Barid = document.getElementById('battle-map-1-tower-slot-3-barid');
  const battleMap1TowerSlot4Barid = document.getElementById('battle-map-1-tower-slot-4-barid');
  const battleMap1TowerSlot5Barid = document.getElementById('battle-map-1-tower-slot-5-barid');
  const battleMap1TowerSlot6Barid = document.getElementById('battle-map-1-tower-slot-6-barid');
  const battleMap1TowerSlot7Barid = document.getElementById('battle-map-1-tower-slot-7-barid');
  const battleMap1TowerSlot8Barid = document.getElementById('battle-map-1-tower-slot-8-barid');
  const battleMap1TowerSlot9Barid = document.getElementById('battle-map-1-tower-slot-9-barid');
  const battleMap1TowerSlot10Barid = document.getElementById('battle-map-1-tower-slot-10-barid');
  const battleMap1TowerSlot11Barid = document.getElementById('battle-map-1-tower-slot-11-barid');
  const battleMap1TowerSlot12Barid = document.getElementById('battle-map-1-tower-slot-12-barid');

  const battleMap1BuildMenuRangeid1 = document.getElementById('battle-map-1-build-menu-rangeid-1');
  const battleMap1BuildMenuRangeid2 = document.getElementById('battle-map-1-build-menu-rangeid-2');
  const battleMap1BuildMenuRangeid3 = document.getElementById('battle-map-1-build-menu-rangeid-3');
  const battleMap1BuildMenuRangeid4 = document.getElementById('battle-map-1-build-menu-rangeid-4');

  // Elements in this list have mouse over sound effect
  const mouseOverList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuCloseButtonid, loadSavedMenuLocalsaveHelpid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid, gameMenuBackButtonid, gameMenuMusicButtonid, gameMenuSoundButtonid, gameMenuBattlepointer1id, gameMenuBattleStartPanelCloseid, gameMenuBattleStartPanelTobattleid, gameMenuBattleStartPanelLockedModeShieldsid, gameMenuBattleStartPanelLockedModeStarsid, battleMapPauseButtonid, battleMapOptionsButtonid, battleMap1Wavestart1id, battleMap1Wavestart2id, battleMap1Startgameid];

  const mouseOverListTowerSlots = [battleMap1TowerSlot1id, battleMap1TowerSlot2id, battleMap1TowerSlot3id, battleMap1TowerSlot4id, battleMap1TowerSlot5id, battleMap1TowerSlot6id, battleMap1TowerSlot7id, battleMap1TowerSlot8id, battleMap1TowerSlot9id, battleMap1TowerSlot10id, battleMap1TowerSlot11id, battleMap1TowerSlot12id];

  // Elements in this list have mouse click sound effect
  const mouseClickList = [mainMenuStartButtonid, mainMenuCreditsButtonid, mainMenuPlayonmobileButtonid, mainMenuTwitterButtonid, mainMenuFacebookButtonid, mainMenuMusicButtonid, mainMenuSoundButtonid, loadSavedMenuCloseButtonid, loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Deleteid, loadSavedMenuGameslot1Delconfyesid, loadSavedMenuGameslot1Delconfnoid, loadSavedMenuGameslot2Delconfyesid, loadSavedMenuGameslot2Delconfnoid, loadSavedMenuGameslot3Delconfyesid, loadSavedMenuGameslot3Delconfnoid, creditsBackButtonid, gameMenuBackButtonid, gameMenuMusicButtonid, gameMenuSoundButtonid, gameMenuBattlepointer1id, gameMenuBattleStartPanelCloseid, gameMenuBattleStartPanelTobattleid];

  // Elements visibility in this list affected by gameslot used or not
  const gameslotElementList = [loadSavedMenuGameslot1Unusedid, loadSavedMenuGameslot1Usedid, loadSavedMenuGameslot1UsedHoverid, loadSavedMenuGameslot1Deleteid, loadSavedMenuGameslot2Unusedid, loadSavedMenuGameslot2Usedid, loadSavedMenuGameslot2UsedHoverid, loadSavedMenuGameslot2Deleteid, loadSavedMenuGameslot3Unusedid, loadSavedMenuGameslot3Usedid, loadSavedMenuGameslot3UsedHoverid, loadSavedMenuGameslot3Deleteid];

  // These elements on the main menu animated a lot of times
  const mainMenuAnimatedElementList = [mainMenuArmorgamesImageid, mainMenuIronhideImageid, mainMenuStartImageid, mainMenuCreditsImageid];

  // These elements on the battle map 1 tower places
  const battleMap1TowerPlaceList = [battleMap1TowerSlot1id, battleMap1TowerSlot2id, battleMap1TowerSlot3id, battleMap1TowerSlot4id, battleMap1TowerSlot5id, battleMap1TowerSlot6id, battleMap1TowerSlot7id, battleMap1TowerSlot8id, battleMap1TowerSlot9id, battleMap1TowerSlot10id, battleMap1TowerSlot11id, battleMap1TowerSlot12id];

  // These elements on the battle map 1 tower place build progress bars
  const battleMap1TowerPlaceBarList = [battleMap1TowerSlot1Barid, battleMap1TowerSlot2Barid, battleMap1TowerSlot3Barid, battleMap1TowerSlot4Barid, battleMap1TowerSlot5Barid, battleMap1TowerSlot6Barid, battleMap1TowerSlot7Barid, battleMap1TowerSlot8Barid, battleMap1TowerSlot9Barid, battleMap1TowerSlot10Barid, battleMap1TowerSlot11Barid, battleMap1TowerSlot12Barid];

  // These elements on the battle map build menu range indicators
  const battleMap1BuildMenuRangeidList = [battleMap1BuildMenuRangeid1, battleMap1BuildMenuRangeid2, battleMap1BuildMenuRangeid3, battleMap1BuildMenuRangeid4];

  // These elements on the battle map build menu elements
  const battleMapBuildMenuElementList = [[battleMapTowerBuildMenuInnerbox1id, battleMapTowerBuildMenuInnerbox1Costid, battleMapTowerBuildMenuInnerbox1Imageid], [battleMapTowerBuildMenuInnerbox2id, battleMapTowerBuildMenuInnerbox2Costid, battleMapTowerBuildMenuInnerbox2Imageid], [battleMapTowerBuildMenuInnerbox3id, battleMapTowerBuildMenuInnerbox3Costid, battleMapTowerBuildMenuInnerbox3Imageid], [battleMapTowerBuildMenuInnerbox4id, battleMapTowerBuildMenuInnerbox4Costid, battleMapTowerBuildMenuInnerbox4Imageid]];

  function getJsonData(file, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let todoData = JSON.parse(xhr.response);
        callback(todoData);
      }
    }
    xhr.open('GET', file);
    xhr.send();
  }

  // Declaration of the enemy units properties from json data
  let enemyUnits;
  getJsonData('xp_webtech_krf_enemy_units.json', function(response) {
    enemyUnits = response;
  });

  // Declaration of the towers properties from json data
  let towerTypes;
  getJsonData('xp_webtech_krf_tower_types.json', function(response) {
    towerTypes = response;
  });

  // Declaration of the 1st battle map initial statement from json data
  let battleMap1ActiveState;
  getJsonData('xp_webtech_krf_battle_map_1.json', function(response) {
    battleMap1ActiveState = response;
  });


  function cssInjectorFunction() {
    const cssInjector = document.createElement('link');
    cssInjector.rel = "stylesheet";
    cssInjector.href = "xp_webtech_krf_stylesheet.css";
    document.head.appendChild(cssInjector);
  }

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
        activeGameState: {},
        isGamePaused: false,
        autoPause: 'ON',
        activeTowerSlot: false,
        isBuildMenuOpen: false,
        battleState: 'BATTLE_OFF',
				pauseStatus: 'PAUSE_OFF'
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
      case 'DIFFICULTY_CHANGE':
        return Object.assign({}, state, {
                activeGameState: action.payload.activeGameState,
                towerTypes: action.payload.towerTypes,
                lastAction: DIFFICULTY_CHANGE
              })
      case 'PLAYPAUSE_CHANGE':
        return Object.assign({}, state, {
                isGamePaused: action.payload.isGamePaused,
                lastAction: PLAYPAUSE_CHANGE,
              })
      case 'AUTOPAUSE_CHANGE':
        return Object.assign({}, state, {
                autoPause: action.payload.autoPause,
                lastAction: AUTOPAUSE_CHANGE
              })
      case 'TOWER_CLICKED':
        return Object.assign({}, state, {
                activeTowerSlot: action.payload.activeTowerSlot,
                clickedSlotHTML: action.payload.clickedSlotHTML,
                isBuildMenuOpen: action.payload.isBuildMenuOpen,
                towerSlotToBuild: action.payload.towerSlotToBuild,
                lastAction: TOWER_CLICKED
              })
      case 'TOWER_UNCLICKED':
        return Object.assign({}, state, {
                activeTowerSlot: action.payload.activeTowerSlot,
                isBuildMenuOpen: action.payload.isBuildMenuOpen,
                lastAction: TOWER_UNCLICKED
              })
      case 'BUILDBUTTON_CLICKED':
        return Object.assign({}, state, {
                towerToBuild: action.payload.towerToBuild,
                lastAction: BUILDBUTTON_CLICKED
              })
      case 'BUILD_START':
        return Object.assign({}, state, {
                activeGameState: action.payload.activeGameState,
                lastAction: BUILD_START
              })
      case 'TOWERBUILD_FINISHED':
        return Object.assign({}, state, {
                activeGameState: action.payload.activeGameState,
                lastAction: TOWERBUILD_FINISHED
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
        savedData: savedData
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
        savedData: savedData
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
      activeGameState = store.getState().savedData.slot1;
      store.dispatch( {
        type: GAMEDATA_LOADED,
        payload: {
          activeGameState: store.getState().savedData.slot1
        }
      });
    }
    if (store.getState().activeSlot == 2) {
      activeGameState = store.getState().savedData.slot2;
      store.dispatch( {
        type: GAMEDATA_LOADED,
        payload: {
          activeGameState: store.getState().savedData.slot2
        }
      });
    }
    if (store.getState().activeSlot == 3) {
      activeGameState = store.getState().savedData.slot3;
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

  // This function handles the game difficulty state change
  function gameMenuBattlePanelDifficultyStateChangeStarter(value) {
    activeGameState.difficulty = value;

    store.dispatch( {
      type: DIFFICULTY_CHANGE,
      payload: {
        activeGameState: activeGameState
      }
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
          src: battleMap1MusicSource
        }
      });
    } else {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: battleMap1MusicSource
        }
      });
    }
  }

  // This function handles the game menu battle panel battle start (to battle) state change when first time playing
  function gameMenutoPrologueStateChangeStarter() {
    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'PROLOGUE',
        previousPage: 'GAME_MENU'
      }
    });
    if (store.getState().musicStatus == 'ON') {
      store.dispatch( {
        type: MUSIC_ON,
        payload: {
          status: 'ON',
          src: battleMap1MusicSource
        }
      });
    } else {
      store.dispatch( {
        type: MUSIC_OFF,
        payload: {
          status: 'OFF',
          src: battleMap1MusicSource
        }
      });
    }
  }

  // This function handles the prologue to battle map state change
  function prologuetoBattleMapStateChangeStarter() {
    activeGameState.battleMap1ActiveState = battleMap1ActiveState;

    store.dispatch( {
      type: DIFFICULTY_CHANGE,
      payload: {
        activeGameState: activeGameState,
        towerTypes: towerTypes
      }
    });

    store.dispatch( {
      type: MENU_CHANGE,
      payload: {
        currentPage: 'BATTLE_MAP',
        previousPage: 'PROLOGUE'
      }
    });
    store.dispatch( {
      type: BATTLE_ON,
      payload: {
        battleState: 'BATTLE_ON',
        activeGameState: activeGameState
      }
    });
  }

  // This function handles the autopause game state change
  function pauseGameStateChangeStarter() {
    store.dispatch( {
      type: PLAYPAUSE_CHANGE,
      payload: {
        isGamePaused: true,
      }
    });
  }

  // This function handles the resume game state change
  function resumeGameStateChangeStarter() {
    store.dispatch( {
      type: PLAYPAUSE_CHANGE,
      payload: {
        isGamePaused: false,
      }
    });
  }

  // This function handles the battle map tower place clicked state change
  function battleMapTowerPlaceClickedStateChangeStarter(towerPlaceNumber, clickedSlotHTML) {
    store.dispatch( {
      type: TOWER_CLICKED,
      payload: {
        activeTowerSlot: towerPlaceNumber,
        clickedSlotHTML: clickedSlotHTML,
        isBuildMenuOpen: true,
        towerSlotToBuild: towerPlaceNumber
      }
    });
  }

  // This function handles the battle map build menu close state change
  function closeTowerBuildMenuStateChangeStarter() {
    store.dispatch( {
      type: TOWER_UNCLICKED,
      payload: {
        activeTowerSlot: false,
        isBuildMenuOpen: false
      }
    });
  }

  // This function handles the battle map build menu tower build click state change
  function battleMapTowerBuildClickedStateChangeStarter(towerType) {
    store.dispatch( {
      type: BUILDBUTTON_CLICKED,
      payload: {
        towerToBuild: towerType
      }
    });
  }

  // This function handles the battle map build menu tower build state change
  function battleMapTowerBuildStateChangeStarter(gold) {
    let tempGamestate = store.getState().activeGameState;
    tempGamestate.battleMap1ActiveState.gold = gold;

    store.dispatch( {
      type: BUILD_START,
      payload: {
        activeGameState: tempGamestate
      }
    });
  }

  // This function handles the tower built state change
  function battleMapTowerBuildFinishedStateChangeStarter(tempActualTower, tempTowerTypeToBuild) {
    let tempActiveGameState = store.getState().activeGameState;
    activeGameState.battleMap1ActiveState.tower_slots[tempActualTower].isTowerBuilt = true;
    activeGameState.battleMap1ActiveState.tower_slots[tempActualTower].isTowerReadytoFire = true;
    activeGameState.battleMap1ActiveState.tower_slots[tempActualTower].towerType = tempTowerTypeToBuild;

    store.dispatch( {
      type: TOWERBUILD_FINISHED,
      payload: {
        activeGameState: activeGameState,
      }
    });
  }

  // This function handles the load-saved menu new game button functionality (creates an empty save slot)
  function loadSavedMenuGameslotUnusedFunctionality() {
    if (store.getState().lastAction == 'UNUSED_SAVESLOT') {
      const emptySaveParameters = {
        isUsed: true,
        stars: 0,
        shields: 0,
        fists: 0,
        difficulty: 'NORMAL'
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
  function addEvent(elements, type, functionality, value) {
    if (value != undefined && elements.length > 1) {
      elements.forEach(function(element) {
        element.addEventListener(type, function() { functionality(value) });
      });
    }
    if (value == undefined) {
      elements.addEventListener(type, function() { functionality() });
    }
    if (value == 'event') {
      elements.addEventListener(type, function(event) { functionality(event) });
    }
    if (value != undefined && value != 'event' && elements.length == undefined) {
      elements.addEventListener(type, function() { functionality(value) });
    }
  }

  // This function adds the event listeners to the tower places on the battle map
  function addEventtoTowerPlaces(towerPlaceList) {
    towerPlaceList.forEach(function(element) {
      element.addEventListener('click', function(event) { battleMapTowerPlaceClicked(event) }, {
        once: true,
      });
    });
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
    // if (store.getState().previousPage == 'GAME_MENU' && store.getState().currentPage == 'PROLOGUE') {
    //   mainAudioMusic.pause();
    // }
    if (store.getState().currentMusicSource && store.getState().lastAction == MUSIC_ON) {
      mainAudioMusic.setAttribute('src', store.getState().currentMusicSource);
      mainAudioMusic.play();
    }
    if (store.getState().musicStatus == 'OFF') {
      mainAudioMusic.pause();
      mainAudioMusic.setAttribute('src', '');

      //IE 11 polyfill audioplayer hack
      if (!isNaN(mainAudioMusic.duration)) {
        mainAudioMusic.currentTime = 0;
      }

    }
    if (store.getState().lastAction == 'PLAYPAUSE_CHANGE' && store.getState().musicStatus == 'ON' && store.getState().isGamePaused == true) {
      mainAudioMusic.pause();
    }
    if (store.getState().lastAction == 'PLAYPAUSE_CHANGE' && store.getState().musicStatus == 'ON' && store.getState().isGamePaused == false) {
      mainAudioMusic.play();
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
        loadSavedMenuGameslot1Delconfid.classList.add('nodisplay');
      }
      if (store.getState().gameSlot == 2) {
        tempSavedData.slot2.isUsed = false;
        loadSavedMenuGameslot2Delconfid.classList.add('nodisplay');
      }
      if (store.getState().gameSlot == 3) {
        tempSavedData.slot3.isUsed = false;
        loadSavedMenuGameslot3Delconfid.classList.add('nodisplay');
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
        loadSavedMenuGameslot1Delconfid.classList.toggle('nodisplay');
      }
      if (store.getState().gameSlot == 2) {
        loadSavedMenuGameslot2Delconfid.classList.toggle('nodisplay');
      }
      if (store.getState().gameSlot == 3) {
        loadSavedMenuGameslot3Delconfid.classList.toggle('nodisplay');
      }
    }
  }

  // This function handles the main menu to load-saved menu change
  function mainMenutoLoadSavedMenu() {
    if (store.getState().previousPage == 'MAIN_MENU' && store.getState().currentPage == 'LOAD_SAVED') {
      mainMenuCreditsButtonid.classList.add('nodisplay');
      mainMenuStartButtonid.classList.add('nodisplay');

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
      mainMenuCreditsButtonid.classList.add('nodisplay');
      mainMenuStartButtonid.classList.add('nodisplay');

      loadSavedMenuid.classList.remove('load-saved-menu-start', 'load-saved-menu-reverse');
      loadSavedMenuid.classList.add('load-saved-menu');

      setTimeout(function(){
        try { loadSavedMenuActionsContainerid.classList.remove('nodisplay') }
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

      mainMenuArmorgamesButtonid.classList.remove('nodisplay');
      mainMenuIronhideButtonid.classList.remove('nodisplay');

      loadSavedMenuid.classList.remove('load-saved-menu');
      loadSavedMenuid.classList.add('load-saved-menu-reverse');

      loadSavedMenuActionsContainerid.classList.add('nodisplay');

      setTimeout(function(){
        mainMenuCreditsButtonid.classList.remove('nodisplay');
        mainMenuStartButtonid.classList.remove('nodisplay');
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

      mainMenuPlayonmobileButtonid.classList.add('main-menu-playonmobile-button');
      mainMenuArmorgamesImageid.classList.add('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.add('main-menu-ironhide-image');
      mainMenuStartImageid.classList.add('main-menu-start-image');
      mainMenuCreditsImageid.classList.add('main-menu-credits-image');
    }
  }

  // This function handles the main menu to game change
  function loadSavedtoGameMenu() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'LOAD_SAVED' && store.getState().currentPage == 'GAME_MENU') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        mainMenuPlayonmobileButtonid.classList.remove('main-menu-playonmobile-button');
        mainMenu.classList.add('pagehide');
        gameMenu.classList.remove('pagehide');
        mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image-reverse');
        mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image-reverse');
        mainMenuStartImageid.classList.remove('main-menu-start-image-reverse');
        mainMenuCreditsImageid.classList.remove('main-menu-credits-image-reverse');
      }, 600);

      if (store.getState().activeGameState.isMap1Completed != true) {
        setTimeout(function(){
          gameMenuStarthereTextid.classList.remove('nodisplay');
        }, 2200);
      }

      gameMenuStartableid.classList.add('game-menu-startable');
      gameMenuBattlepointer1id.classList.add('game-menu-battlepointer');
      mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image');
      mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image');
      mainMenuStartImageid.classList.remove('main-menu-start-image');
      mainMenuCreditsImageid.classList.remove('main-menu-credits-image');
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
        gameMenuStartableid.classList.remove('game-menu-startable');
        gameMenuBattlepointer1id.classList.remove('game-menu-battlepointer');
        if (store.getState().activeGameState.isMap1Completed != true) {
          gameMenuStarthereTextid.classList.add('nodisplay');
        }
      }, 600);

      setTimeout(function(){
        mainMenuCreditsButtonid.classList.remove('nodisplay');
        mainMenuStartButtonid.classList.remove('nodisplay');
      }, 1400);

      mainMenuPlayonmobileButtonid.classList.add('main-menu-playonmobile-button');

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
        mainMenuCreditsButtonid.classList.remove('nodisplay');
        mainMenuStartButtonid.classList.remove('nodisplay');
      }, 1400);

      mainMenuPlayonmobileButtonid.classList.add('main-menu-playonmobile-button');
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

      mainMenuCreditsButtonid.classList.add('nodisplay');
      mainMenuStartButtonid.classList.add('nodisplay');

      setTimeout(function(){
        mainMenu.classList.add('pagehide');
        credits.classList.remove('pagehide');
        mainMenuPlayonmobileButtonid.classList.remove('main-menu-playonmobile-button');
        mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image');
        mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image');
        mainMenuStartImageid.classList.remove('main-menu-start-image');
        mainMenuCreditsImageid.classList.remove('main-menu-credits-image');
        mainMenuArmorgamesImageid.classList.remove('main-menu-armorgames-image-ls');
        mainMenuIronhideImageid.classList.remove('main-menu-ironhide-image-ls');
        mainMenuStartImageid.classList.remove('main-menu-start-image-ls');
        mainMenuCreditsImageid.classList.remove('main-menu-credits-image-ls');
      }, 600);
    }
  }

  // This function handles restarts the preloader animation
  function preloaderStarter() {
    // Reload the preloader animation
    preloaderLeftsideid.classList.add('preloader-leftside');
    preloaderRightsideid.classList.add('preloader-rightside');

    setTimeout(function(){
      preloaderLeftsideid.classList.remove('preloader-leftside');
      preloaderRightsideid.classList.remove('preloader-rightside');
    }, 1000);
  }

  // This function handles the load saved menu gameslot dispaly changes
  function loadSavedMenuGameslotDisplayHandler() {
    if (savedData.slot1.isUsed == true) {
      loadSavedMenuGameslot1Unusedid.classList.add('nodisplay');
      loadSavedMenuGameslot1Usedid.classList.remove('nodisplay');
      loadSavedMenuGameslot1UsedHoverid.classList.remove('nodisplay');
      loadSavedMenuGameslot1Deleteid.classList.remove('nodisplay');
    }
    if (savedData.slot1.isUsed == false) {
      loadSavedMenuGameslot1Unusedid.classList.remove('nodisplay');
      loadSavedMenuGameslot1Usedid.classList.add('nodisplay');
      loadSavedMenuGameslot1UsedHoverid.classList.add('nodisplay');
      loadSavedMenuGameslot1Deleteid.classList.add('nodisplay');
    }
    if (savedData.slot2.isUsed == true) {
      loadSavedMenuGameslot2Unusedid.classList.add('nodisplay');
      loadSavedMenuGameslot2Usedid.classList.remove('nodisplay');
      loadSavedMenuGameslot2UsedHoverid.classList.remove('nodisplay');
      loadSavedMenuGameslot2Deleteid.classList.remove('nodisplay');
    }
    if (savedData.slot2.isUsed == false) {
      loadSavedMenuGameslot2Unusedid.classList.remove('nodisplay');
      loadSavedMenuGameslot2Usedid.classList.add('nodisplay');
      loadSavedMenuGameslot2UsedHoverid.classList.add('nodisplay');
      loadSavedMenuGameslot2Deleteid.classList.add('nodisplay');
    }
    if (savedData.slot3.isUsed == true) {
      loadSavedMenuGameslot3Unusedid.classList.add('nodisplay');
      loadSavedMenuGameslot3Usedid.classList.remove('nodisplay');
      loadSavedMenuGameslot3UsedHoverid.classList.remove('nodisplay');
      loadSavedMenuGameslot3Deleteid.classList.remove('nodisplay');
    }
    if (savedData.slot3.isUsed == false) {
      loadSavedMenuGameslot3Unusedid.classList.remove('nodisplay');
      loadSavedMenuGameslot3Usedid.classList.add('nodisplay');
      loadSavedMenuGameslot3UsedHoverid.classList.add('nodisplay');
      loadSavedMenuGameslot3Deleteid.classList.add('nodisplay');
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
      gameMenuBattleStartPanel1id.classList.add('game-menu-battle-start-panel-1');
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
        gameMenuBattleStartPanel1id.classList.remove('game-menu-battle-start-panel-1');
        gameMenuDarkLayerid.classList.remove('game-menu-dark-layer-fadeout');
        gameMenuBattleStartPanel1id.classList.add('nodisplay');
        gameMenuDarkLayerid.classList.add('nodisplay');
      }, 600);
    }
  }

  // This function handles the game menu to battle map action
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

  // This function handles the display of the difficulty chooser on the game menu battlepanel
  function gameMenuBattlePanelDifficultyChoose() {
    if (store.getState().lastAction == DIFFICULTY_CHANGE) {
      gameMenuBattleStartPanelChooseDifficultyid.checked = false;
      gameMenuBattleStartPanelActualDifficultyid.classList.remove('game-menu-battle-start-panel-actual-difficulty-casual');
      gameMenuBattleStartPanelActualDifficultyid.classList.remove('game-menu-battle-start-panel-actual-difficulty-normal');
      gameMenuBattleStartPanelActualDifficultyid.classList.remove('game-menu-battle-start-panel-actual-difficulty-veteran');
      if (store.getState().activeGameState.difficulty == 'CASUAL') {
        gameMenuBattleStartPanelActualDifficultyid.classList.add('game-menu-battle-start-panel-actual-difficulty-casual');
      }
      if (store.getState().activeGameState.difficulty == 'NORMAL') {
        gameMenuBattleStartPanelActualDifficultyid.classList.add('game-menu-battle-start-panel-actual-difficulty-normal');
      }
      if (store.getState().activeGameState.difficulty == 'VETERAN') {
        gameMenuBattleStartPanelActualDifficultyid.classList.add('game-menu-battle-start-panel-actual-difficulty-veteran');
      }
    }
  }

  // This function handles the display of the difficulty chooser on the game menu battlepanel
  function isFirstTimePlay() {
    if (store.getState().activeGameState.stars == 0) {
      gameMenutoPrologueStateChangeStarter();
    } else {
      gameMenutoBattleMapStateChangeStarter();
    }
  }

  // This function handles the game menu to prologue action
  function gameMenutoPrologue() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'GAME_MENU' && store.getState().currentPage == 'PROLOGUE') {
      mainSfxController(preloaderSfxSource);
      preloaderStarter();

      setTimeout(function(){
        gameMenuBattlePanelDeleter();
        gameMenu.classList.add('pagehide');
        prologue.classList.remove('pagehide');
        prologueComic1id.classList.add('prologue-comic-1');
        prologueComic2id.classList.add('prologue-comic-2');
        prologueComic3id.classList.add('prologue-comic-3');
        prologueComic4id.classList.add('prologue-comic-4');
        prologueComic5id.classList.add('prologue-comic-5');
        prologueComicClickid.classList.add('prologue-comic-click');
      }, 600);

      setTimeout(function(){
        addEvent(prologue, 'click', prologuetoBattleMapStateChangeStarter, undefined);
        prologue.classList.add('pointer');
      }, 8600);
    }
  }

  // This function handles the prologue to battle map action
  function prologuetoBattleMap() {
    if (store.getState().lastAction == MENU_CHANGE && store.getState().previousPage == 'PROLOGUE' && store.getState().currentPage == 'BATTLE_MAP') {
      let tempTowerName;
      battleMapInfoPanelHealthTextid.innerHTML = store.getState().activeGameState.battleMap1ActiveState.life;
      battleMapInfoPanelGoldTextid.innerHTML = store.getState().activeGameState.battleMap1ActiveState.gold;
      battleMapInfoPanelWaveTextid.innerHTML = 'wave ' + store.getState().activeGameState.battleMap1ActiveState.current_wave + '/'
      + store.getState().activeGameState.battleMap1ActiveState.waves_quantity;

      prologue.classList.add('prologue-fade-out');
      battleMap1.classList.add('battle-map-1-fade-in');

      battleMapInfoPanelid.classList.add('battle-map-info-panel');
      battleMapPauseButtonid.classList.add('battle-map-pause-button');
      battleMapOptionsButtonid.classList.add('battle-map-options-button');
      battleMapFooterid.classList.add('battle-map-footer');
      battleMap1Wavestartid.classList.add('battle-map-1-wavestart-container');
      battleMap1Wavestartid.classList.add('delayed-animation');
      battleMap1BuildHereTextContainerid.classList.add('battle-map-1-build-here-text-container');
      battleMap1BuildHereTextContainerid.classList.add('delayed-animation');
      battleMap1StartHereTextContainerid.classList.add('battle-map-1-start-here-text-container');
      battleMap1StartHereTextContainerid.classList.add('delayed-animation');

      if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.archer_1) {
        tempTowerName = store.getState().towerTypes.archer_1.key_name;
        addEvent(battleMapTowerBuildMenuInnerbox1Imageid, 'click', battleMapTowerBuildClickedStateChangeStarter, tempTowerName);
      }
      if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.barracks_1) {
        tempTowerName = store.getState().towerTypes.barracks_1.key_name;
        addEvent(battleMapTowerBuildMenuInnerbox2Imageid, 'click', battleMapTowerBuildClickedStateChangeStarter, tempTowerName);
      }
      if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.mage_1) {
        tempTowerName = store.getState().towerTypes.mage_1.key_name;
        addEvent(battleMapTowerBuildMenuInnerbox3Imageid, 'click', battleMapTowerBuildClickedStateChangeStarter, tempTowerName);
      }
      if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.bombard_1) {
        tempTowerName = store.getState().towerTypes.bombard_1.key_name;
        addEvent(battleMapTowerBuildMenuInnerbox4Imageid, 'click', battleMapTowerBuildClickedStateChangeStarter, tempTowerName);
      }

      setTimeout(function(){
        gameMenuBattlePanelDeleter();
        prologue.classList.add('pagehide');
        battleMap1.classList.remove('pagehide');
      }, 600);

      setTimeout(function(){
        mainSfxController(battlemapLoadedSfxSource);
      }, 1700);

    }
  }

  // This function handles the click outside the game -> pause the game event
  function pageBodyClicked(value) {
    isUserFocusOnTheGame = false;
    if ( value == 'stop') {
      event.stopPropagation();
    }
  }

  // This function handles the click inside the game -> continue the game event
  function pauseElementClicked(event) {
    isUserFocusOnTheGame = true;
    event.stopPropagation();
  }

  // This function prevents the click inside the game to pause the game
  function preventGamePause(event) {
    event.stopPropagation();
  }

  // This function checks if the user focus is on the game
  function checkFocus() {
    if (store.getState().battleState == 'BATTLE_ON' && store.getState().autoPause == 'ON' && store.getState().manualPaused != 'ON') {
      if(document.hasFocus()) {
        isUserFocusOnThePage = true;
      } else {
        isUserFocusOnThePage = false;
        isUserFocusOnTheGame = false;
      }

      if(isUserFocusOnThePage == true && isUserFocusOnTheGame == true && store.getState().isGamePaused == true) {
        resumeGameStateChangeStarter();
      } else if (store.getState().isGamePaused == false){
        if (isUserFocusOnThePage == false || isUserFocusOnTheGame == false) {
          pauseGameStateChangeStarter();
        }
      }
    }
  }

  // This function handles the pause game display change
  function pauseGame() {
    if (store.getState().isGamePaused == true && store.getState().battleState == 'BATTLE_ON') {
      battleMapGamePauseid.classList.remove('pagehide');
      if(store.getState().towerSlotToBuild) {
        let tempTowerSlotToBuild = store.getState().towerSlotToBuild.split('_')[2];
        battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.add('stopAfterAnimation');
      }
    }
  }

  // This function handles the pause game display change
  function resumeGame() {
    if (store.getState().isGamePaused == false && store.getState().battleState == 'BATTLE_ON') {
      battleMapGamePauseid.classList.add('pagehide');
      if(store.getState().towerSlotToBuild) {
        if(store.getState().towerSlotToBuild.split('_')[2].length < 3) {
          let tempTowerSlotToBuild = store.getState().towerSlotToBuild.split('_')[2];
          battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('stopAfterAnimation');
        }
      }
    }
  }

  // This function adds event listeners at battle start
  function battleStartEventAdding() {
    if (store.getState().lastAction == 'BATTLE_ON') {
      setTimeout(function(){
        addEvent(battleMap1, 'click', preventGamePause, 'event');
        addEvent(landingPageBody, 'click', pageBodyClicked, undefined);
        addEvent(battleMapGamePauseid, 'click', pauseElementClicked, 'event');
        addEvent(battleMapPauseButtonid, 'click', pageBodyClicked, 'stop');
      }, 600);
    }
  }

  // This function handles the battle map tower losts mouse over sound effect. It needed because the evenlistener need to be removed later
  function mouseOverSfx() {
    mainSfxController(menuHoverSfxSource);
  }

  // This function adds event listeners with the mouseOverSfx function to the Battle map tower slot list
  function addEventTowerSlots() {
    mouseOverListTowerSlots.forEach(function(element) {
      element.addEventListener('mouseover', mouseOverSfx);
    });
  }

  // This function handles the battle map build menu opening logic, it fires the state changes function
  function battleMapTowerPlaceClicked(event) {
    event.stopPropagation();
    if (store.getState().isBuildMenuOpen == false) {
      let classParts = event.target.classList[0].split('-');
      let towerPlaceNumber = 'tower_slot_' + classParts[classParts.length - 1];
      let clickedSlotHTML = event.target;
      battleMapTowerPlaceClickedStateChangeStarter(towerPlaceNumber, clickedSlotHTML);
    } else if (store.getState().isBuildMenuOpen == true) {
      closeTowerBuildMenuStateChangeStarter();
      setTimeout(function(){
        let classParts = event.target.classList[0].split('-');
        let towerPlaceNumber = 'tower_slot_' + classParts[classParts.length - 1];
        let clickedSlotHTML = event.target;
        battleMapTowerPlaceClickedStateChangeStarter(towerPlaceNumber, clickedSlotHTML);
      }, 150);
    }
  }

  // This function handles the battle map tower palce clicked tower place check
  function battleMapTowerPlaceCheck() {
    if (store.getState().lastAction == 'TOWER_CLICKED') {
      let activeTowerSlot = store.getState().towerSlotToBuild;
      let clickedSlotHTML = store.getState().clickedSlotHTML;
      let activeTowerSlotData = store.getState().activeGameState.battleMap1ActiveState.tower_slots[activeTowerSlot];

      if (activeTowerSlotData.towerType == 'undefined') {
        battleMapBuildMenuOpen(clickedSlotHTML);
      }
    }
  }

  // This function handles the battle map is there enough gold check
  function battleMapGoldCheck(gold) {
    if (store.getState().activeGameState.battleMap1ActiveState.gold >= gold) {
      return true
    } else {
      return false
    }
  }

  // This function helps to the battleMapBuildMenuOpen function to handle display changes
  function battleMapBuildMenuDisplayHelper(key) {
    let index;
    if (key == 'archer_1') {
      index = 0;
    } else if (key == 'barracks_1') {
      index = 1;
    } else if (key == 'mage_1') {
      index = 2;
    } else if (key == 'bombard_1') {
      index = 3;
    }

    battleMapBuildMenuElementList[index][1].classList.remove('nodisplay');
    battleMapBuildMenuElementList[index][2].classList.remove('battle-map-tower-build-menu-innerbox-image-locked');
    battleMapBuildMenuElementList[index][1].innerHTML = store.getState().towerTypes[key].cost;

    let range = store.getState().towerTypes[key].range;

    if (battleMapGoldCheck(store.getState().towerTypes[key].cost)) {
      battleMapBuildMenuElementList[index][0].classList.add('battle-map-tower-build-menu-innerbox-hover');
      battleMapBuildMenuElementList[index][1].classList.add('pointer');
      battleMapBuildMenuElementList[index][2].classList.add('pointer');
      battleMap1BuildMenuRangeidList[index].style.opacity = 1;
      battleMap1BuildMenuRangeidList[index].style.height = range + 'px';
      battleMap1BuildMenuRangeidList[index].style.width = range + 'px';
    } else {
      battleMapBuildMenuElementList[index][2].classList.add('battle-map-tower-build-menu-innerbox-image-archer-nogold');
      battleMapBuildMenuElementList[index][1].classList.remove('battle-map-tower-build-menu-innerbox-cost');
      battleMapBuildMenuElementList[index][1].classList.add('battle-map-tower-build-menu-innerbox-cost-nogold');
    }
  }

  // This function handles the battle map build menu opening
  function battleMapBuildMenuOpen(clickedSlotHTML) {
    clickedSlotHTML.classList.add('battle-map-tower-build-place-clicked');
    clickedSlotHTML.removeEventListener('mouseover', mouseOverSfx);
    clickedSlotHTML.appendChild(battleMapActiveBuildMenuid);
    battleMapActiveBuildMenuid.classList.remove('nodisplay');

    let allowedTowers = store.getState().towerTypes;
    for (let key in allowedTowers) {
      battleMapBuildMenuDisplayHelper(key);
    }
  }

  // This function handles the battle map build menu closing display
  function closeTowerBuildMenu() {
    if (store.getState().lastAction == TOWER_UNCLICKED && battleMapActiveBuildMenuid.classList.contains('battle-map-build-menu-disappear') == false) {

      battleMapActiveBuildMenuid.classList.add('battle-map-build-menu-disappear');

      setTimeout(function(){
        store.getState().clickedSlotHTML.classList.remove('battle-map-tower-build-place-clicked');
        store.getState().clickedSlotHTML.addEventListener('mouseover', mouseOverSfx);
        battleMapActiveBuildMenuid.classList.remove('battle-map-build-menu-disappear');
        battleMapActiveBuildMenuid.classList.add('nodisplay');
        store.getState().clickedSlotHTML.addEventListener('mouseover', mouseOverSfx);
        store.getState().clickedSlotHTML.addEventListener('click', function(event) { battleMapTowerPlaceClicked(event) }, {
          once: true,
        });
      }, 150);
    }
  }

  // This function handles the battle map tower build gold check statement and the new goldamount calculate
  function battleMapTowerBuildGoldCalculator() {
    if (store.getState().lastAction == BUILDBUTTON_CLICKED) {
      let tempTowerToBuild = store.getState().towerToBuild;
      let tempTowerCost = store.getState().towerTypes[tempTowerToBuild].cost;
      let tempTreasury = store.getState().activeGameState.battleMap1ActiveState.gold;

      if (battleMapGoldCheck(tempTowerCost)) {
        let tempCalculatedGold = tempTreasury - tempTowerCost;
        battleMapTowerBuildStateChangeStarter(tempCalculatedGold);
      }
    }
  }

  // This function handles the tower build start display changes
  function battleMapTowerBuild() {
    if (store.getState().lastAction == BUILD_START) {
      let tempTowerNumberToBuild = store.getState().towerSlotToBuild.split('_')[2] - 1;

      battleMapInfoPanelGoldTextid.innerHTML = store.getState().activeGameState.battleMap1ActiveState.gold;

      setTimeout(function(){
        if (store.getState().towerToBuild == 'archer_1') {
          battleMap1TowerPlaceList[tempTowerNumberToBuild].classList.add('battle-map-archer-tower-under-construction');
          battleMap1TowerPlaceBarList[tempTowerNumberToBuild].classList.add('battle-map-tower-under-construction-bar');
        } else if (store.getState().towerToBuild == 'barracks_1') {
          battleMap1TowerPlaceList[tempTowerNumberToBuild].classList.add('battle-map-barracks-tower-under-construction');
          battleMap1TowerPlaceBarList[tempTowerNumberToBuild].classList.add('battle-map-tower-under-construction-bar');
        } else if (store.getState().towerToBuild == 'mage_1') {
          battleMap1TowerPlaceList[tempTowerNumberToBuild].classList.add('battle-map-mage-tower-under-construction');
          battleMap1TowerPlaceBarList[tempTowerNumberToBuild].classList.add('battle-map-tower-under-construction-bar');
        } else if (store.getState().towerToBuild == 'bombard_1') {
          battleMap1TowerPlaceList[tempTowerNumberToBuild].classList.add('battle-map-bombard-tower-under-construction');
          battleMap1TowerPlaceBarList[tempTowerNumberToBuild].classList.add('battle-map-tower-under-construction-bar');
        }
        battleMap1TowerPlaceList[tempTowerNumberToBuild].addEventListener('animationstart', battleMapTowerBuildStarted);
      }, 150);
    }
  }

  // This function handles the tower build - build animation end display changes
  function battleMapTowerBuildStarted() {
    let tempTowerSlotToBuild = store.getState().towerSlotToBuild.split('_')[2];
    let tempTowerToBuild = store.getState().towerToBuild;
    mainSfxController(towerBuildingSfxSource);

    if(tempTowerSlotToBuild == 7) {
      battleMap1BuildHereTextid.classList.add('nodisplay');
    }

    let tempParameters = [tempTowerSlotToBuild, tempTowerToBuild];
    addEvent(battleMap1TowerPlaceList[tempTowerSlotToBuild - 1], 'animationend', battleMapTowerBuildFinished, tempParameters);
  }

  // This function handles the tower build end display and logical changes
  function battleMapTowerBuildFinished(parameters) {
    let tempTowerSlotToBuild = parameters[0];
    let tempTowerTypeToBuild = parameters[1];
    let tempActualTower = ('tower_slot_' + tempTowerSlotToBuild);

    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-archer-tower-under-construction');
    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-barracks-tower-under-construction');
    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-mage-tower-under-construction');
    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-bombard-tower-under-construction');
    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-tower-under-construction-bar');
    battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.remove('battle-map-tower-build-place');
    battleMap1TowerPlaceBarList[tempTowerSlotToBuild - 1].classList.remove('battle-map-tower-under-construction-bar');

    if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.archer_1) {
      if (tempTowerTypeToBuild == store.getState().towerTypes.archer_1.key_name) {
        mainSfxController(archersReadySfxSource);
        battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.add('battle-map-archer-1-tower-built');
      }
    }
    if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.barracks_1) {
      if (tempTowerTypeToBuild == store.getState().towerTypes.barracks_1.key_name) {
        battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.add('battle-map-barracks-1-tower-built');
      }
    }
    if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.mage_1) {
      if (tempTowerTypeToBuild == store.getState().towerTypes.mage_1.key_name) {
        mainSfxController(mageReadySfxSource);
        battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.add('battle-map-mage-1-tower-built');
      }
    }
    if(store.getState().activeGameState.battleMap1ActiveState.allowed_towers.bombard_1) {
      if (tempTowerTypeToBuild == store.getState().towerTypes.bombard_1.key_name) {
        battleMap1TowerPlaceList[tempTowerSlotToBuild - 1].classList.add('battle-map-bombard-1-tower-built');
      }
    }
    battleMapTowerBuildFinishedStateChangeStarter(tempActualTower, tempTowerTypeToBuild);
  }

  // This function handles sound and display rendering according to the actual statement
  function render() {
    console.log(store.getState().lastAction);
    console.log(store.getState());
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
    gameMenuBattlePanelDifficultyChoose();
    gameMenutoPrologue();
    prologuetoBattleMap();
    battleStartEventAdding();
    pauseGame();
    resumeGame();
    closeTowerBuildMenu();
    battleMapTowerBuildGoldCalculator();
    battleMapTowerBuild();
    battleMapTowerPlaceCheck();
  }

  // cssInjectorFunction();
  gameslotsInitilaizer();
  addEventTowerSlots();
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
  addEvent(gameMenuBattleStartPanelTobattleid, 'click', isFirstTimePlay, undefined);
  addEvent(gameMenuBattleStartPanelChooseDifficultyCasualid, 'click', gameMenuBattlePanelDifficultyStateChangeStarter, 'CASUAL');
  addEvent(gameMenuBattleStartPanelChooseDifficultyNormalid, 'click', gameMenuBattlePanelDifficultyStateChangeStarter, 'NORMAL');
  addEvent(gameMenuBattleStartPanelChooseDifficultyVeteranid, 'click', gameMenuBattlePanelDifficultyStateChangeStarter, 'VETERAN');
  addEvent(battleMap1, 'click', closeTowerBuildMenuStateChangeStarter, undefined);
  addEventtoTowerPlaces(battleMap1TowerPlaceList);
  addEvent(battleMap1TowerPlaceList, 'click', mainSfxController, buildMenuOpenSfxSource);
  addEvent(battleMapTowerBuildMenuInnerbox1Imageid, 'mouseover', mouseOverSfx, undefined);
  addEvent(battleMapTowerBuildMenuInnerbox2Imageid, 'mouseover', mouseOverSfx, undefined);
  addEvent(battleMapTowerBuildMenuInnerbox3Imageid, 'mouseover', mouseOverSfx, undefined);
  addEvent(battleMapTowerBuildMenuInnerbox4Imageid, 'mouseover', mouseOverSfx, undefined);


  setInterval( checkFocus, 100 );
  // setInterval(function () {console.log(store.getState())}, 1000);

return {}

})();
