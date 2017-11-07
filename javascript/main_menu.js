'use strict'

function render() {
  if (store.getState().mainAudio == 'OFF') {
    mainMenuMusicButtonDisabledid.classList.add('hidden');
  }

  if (store.getState().mainAudio == 'ON') {
    mainMenuMusicButtonDisabledid.classList.remove('hidden');
  }
}
render()

store.subscribe(render)

document.getElementById('main-menu-music-buttonid')
  .addEventListener('click', function () {
    if (store.getState().mainAudio == 'ON') {
      this.stop();
      store.dispatch({ type: 'OFF' });
    }
    if (store.getState().mainAudio == 'OFF') {
      this.play();
      store.dispatch({ type: 'ON' })
    }
  })
