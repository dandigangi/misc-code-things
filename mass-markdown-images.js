// Photoshop batch script create file names; easy output here to copy/paste into blog post w/ template literal
// const fs = require('fs');

const max = 73;
let strs = '';

// Numbers were specific to how many photos I talk so 1-41 first and then uploaded day 2 which was 42+
for (let i = 42; i < max; i++) {
  strs += `![LeadDev West Coast Photos - ${i}](/static/images/blog/events/leaddev-west-oct-23/leaddev-west-oct-23-${i}.png)\n\n`;
}

console.log(strs);

// Wasn't worth doing this in the end since I could push it to the console and copy/paste it out
// fs.writeFile('./imageMd.txt');
