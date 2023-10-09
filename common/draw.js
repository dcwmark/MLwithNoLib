const draw = {};

draw.path = (ctx, path, color = 'black') => {
  ctx.stokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  // ctx moveTo taks two parameters
  // each path occurance has X Y coirdinates
  // the spread operator will satisfy the parameters
  ctx.moveTo(...path[0]);
  path.map( coord => ctx.lineTo(...coord) );
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
};

draw.paths = (ctx, paths, color = 'black') => {
  paths.map( path => draw.path(ctx, path, color) );
};

/**
 * My node does not need the if statement as
 * stated in the course.
 * Omitting the if clause for now.
 * If getting:
 *     Uncaught ReferenceError:
 *     module is not defined
 *     at draw.js:32:1
 * later, uncomment the if statement.
 */
// if (typeof module !== 'undefined')
module.exports = draw;
