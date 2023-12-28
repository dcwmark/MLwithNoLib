// node/feature_extractor.js

const fs = require('fs');

const constants = require('../common/constants');
const features = require('../common/features');

console.log(`Extracting Features ...`);

const samples = JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);


for (const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(
      `${constants.JSON_DIR}/${sample.id}.json`
    )
  );

  sample.point = [
    features.getPathCount(paths),
    features.getPointCount(paths)
  ];
}

const featureNames = ['Path Counts', 'Point Count'];
fs.writeFileSync(
  constants.FEATURES,
  JSON.stringify({ 
    featureNames,
    samples: samples.map( (s) => {
      return {
        point: s.point,
        label: s.label,
      };
    }),
  }),
);

/** 
 * Create similiar data as above with the "whole" of samples;
 * except wrapping the data
 * with <code>const samples = </code> and <code>;</code>
 * 
 * This step is chosen instead of creating an API
 * for the task is to:
 * 
 * 1. Avoid CORS
 * 2. Web Server
 * 3. Live Server
 */
fs.writeFileSync(
  constants.FEATURES_JS,
  `const features=${ JSON.stringify({ featureNames, samples,}) };`,
);

console.log(`Done!`);
