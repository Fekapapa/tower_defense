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
