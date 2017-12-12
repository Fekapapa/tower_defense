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
