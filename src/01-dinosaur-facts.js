/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getTallestDinosaur()
 * ---------------------
 * Returns an object with the tallest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getTallestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getTallestDinosaur(dinosaurs) {
  let convertToFeet   = (meters) => Number((meters * 3.280839895).toFixed(2)),
      initTallest     = dinosaurs[0], 
      talletsDinosaur = {};

  // >> Validating dinosaurs array || otherwise return an empty obj.
  if(dinosaurs.length !== 0){
    for(let dinosaur of dinosaurs){
      if(dinosaur.lengthInMeters > initTallest.lengthInMeters){
        initTallest = dinosaur;
      }
    }
    talletsDinosaur[initTallest.name] = convertToFeet(initTallest.lengthInMeters);
  }
  return talletsDinosaur;
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. 
 *       It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  let calculateMyA = () => (getInfo.mya.length === 2) ? getInfo.mya[1] : getInfo.mya[0],
      errorMessage = `A dinosaur with an ID of 'incorrect-id' cannot be found.`,
      getInfo      = {},
      setDescription;

  // >> Getting the dinosaur's information by Id
  getInfo = dinosaurs.find(e => e.dinosaurId === id);
  if(getInfo !== undefined){
    setDescription = getInfo.name + ' (' + getInfo.pronunciation + ')\n' + getInfo.info + ' It lived in the ' + getInfo.period +
                     ' period, over ' + calculateMyA() + ' million years ago.';
  }
  else{
    setDescription = errorMessage;
  }
  return setDescription;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. 
 * If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, 
 * if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the 
 *                       supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given 
 *                time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let dinosaursAlive = [];

  for(let dino of dinosaurs) {
    // >> validating whether a key has been passed or not
    if(key === undefined) {
      // >> Validating mya: [number, number]
      if(dino.mya.length == 2){
        if(dino.mya[0] >= mya && mya >= dino.mya[1]) {
          dinosaursAlive.push(dino.dinosaurId);
        }
        if(dino.mya[0] < mya && mya < dino.mya[1]) {
          dinosaursAlive = [];
        }
      // >> Validating mya: [number]
      }else if(dino.mya.length == 1) {
        if((dino.mya[0]) === mya) {
          dinosaursAlive.push(dino.dinosaurId);
        }
        if((dino.mya[0] - 1) === mya) {
          dinosaursAlive.push(dino.dinosaurId);
        }  
      }
    }else{
      // Validating mya cases
      if(dino.mya[0] === mya || mya === dino.mya[1]) {
        dinosaursAlive.push(dino.name);
      }
      else if((dino.mya[0] - 1) === mya) {
        dinosaursAlive.push(dino.dinosaurId);
      }
    }
  }
  return dinosaursAlive;
}

module.exports = {
  getTallestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
