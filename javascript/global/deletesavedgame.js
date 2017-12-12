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
