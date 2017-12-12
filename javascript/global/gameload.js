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
