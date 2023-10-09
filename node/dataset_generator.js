// node/dataset_generator.js
const constants = {};

constants.DATA_DIR = `../data`;
constants.RAW_DIR = constants.DATA_DIR+`/raw`;
constants.DATASET_DIR = constants.DATA_DIR+`/dataset`;
constants.JSON_DIR = constants.DATASET_DIR+`/json`;
constants.IMG_DIR = constants.DATASET_DIR+`/img`;
constants.SAMPLES = constants.DATASET_DIR+'/samples.json';

/* Read the RAW File folder */
const fs = require('fs');
const fileNames = fs.readdirSync(constants.RAW_DIR);

const samples = [];
let id = 1;
/*
  Read each one of the raw files
  and push the content of each raw file
  to ths samples array,
*/
fileNames.forEach( (fn) => {
  const content = fs.readFileSync(
    constants.RAW_DIR+'/'+fn
  );
  const { session, student, drawings } =
    JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_cleid: session,
    })

    /*
      Write each "drawing" of data poins into
      their own JSON file
    */
    fs.writeFileSync(
      constants.JSON_DIR+'/'+id+'.json',
      JSON.stringify(drawings[label])
    );

    id++;
  }  
});

console.log(`<<>> ${constants.SAMPLES}`);

/* Write the samples array to samples.json as summary */
fs.writeFileSync(
  constants.SAMPLES,
  JSON.stringify(samples)
);
