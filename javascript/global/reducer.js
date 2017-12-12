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
