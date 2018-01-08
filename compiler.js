'use strict'

// CONFIG START

const inputFiles = [
  './javascript/global/variables.js',
  './javascript/global/reducer.js',
  './javascript/global/getelementbyid.js',
  './javascript/global/deletesavedgame.js',
  './javascript/global/addSFXsound.js',
  './javascript/global/gameslotused.js',
  './javascript/global/mainmenu_to_loadsaved.js',
  './javascript/global/gameload.js'
]

const outputFile = './javascript/global/menu_controller.js';

const outputPath = './javascript/build/';

// CONFIG END

const fs = require('fs');

const Compiler = (function() {
  let outputData;
  let inputData = [];

  function init() {
    fileRead(outputFile, true);

    for (let i = 0; i < inputFiles.length; i++) {
      fileRead(inputFiles[i], false, i);
    }
  }

  function fileRead(fileName, isOutput, number) {
    fs.readFile(fileName, 'utf-8', function(err, data) {
      if (err) throw err;
      dataOrder(data, isOutput, number);
    });
  }

  function dataOrder(data, isOutput, number) {
    if (isOutput) {
      outputData = data;
    } else {
      inputData[number] = data;
    }

    if (number == (inputFiles.length - 1)) {
      searchString(outputData, inputData);
    }
  }

  function searchString(outputData, inputData) {
    let searchItems = [];

    for (let i = 0; i < inputFiles.length; i++) {
      searchItems[i] = '//import ' + inputFiles[i].split('/').slice(-1)[0];
    }
    dataSearch(outputData, inputData, searchItems)
  }

  function dataSearch(outputData, inputData, searchItems) {
    for (let i = 0; i < inputFiles.length; i++) {
      outputData = outputData.replace(searchItems[i], inputData[i]);
    }
    fileWriter(outputData)
  }

  function fileWriter(outputData) {
    const output = outputPath + outputFile.split('/').slice(-1)[0];

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    fs.writeFile(output, outputData, 'utf-8', function(err) {
      if (err) {
        return console.error(err);
      } else {
        console.log('Files compiled successfully into ' + output);
      }
    });
  }

  return {
    init: init
  }

})();

Compiler.init();
