import fs from 'fs';

const dataFile = 'src/data/blogs.js';
let content = fs.readFileSync(dataFile, 'utf8');

const imageReplacements = [
  '"/images/old_woman_active_1790642019147.jpg"', // 1
  '"/images/old_man_active_1790642029931.jpg"', // 2
  '"/images/young_mother_1790642042734.jpg"', // 3
  '"/images/old_man_active_1790642029931.jpg"', // 4
  '"/images/old_woman_active_1790642019147.jpg"', // 5
  '"/images/young_mother_1790642042734.jpg"', // 6
  '"/images/pelvic imageavif.jpg"', // 7 Gazelle chair
  '"/images/young_mother_1790642042734.jpg"', // 8 Postpartum
  '"/images/pelvic imageavif.jpg"', // 9 Gazelle chair
  '"/images/old_woman_active_1790642019147.jpg"', // 10
  '"/images/old_man_active_1790642029931.jpg"', // 11
  '"/images/old_woman_active_1790642019147.jpg"', // 12
  '"/images/old_man_active_1790642029931.jpg"', // 13
  '"/images/young_mother_1790642042734.jpg"', // 14
  '"/images/old_man_active_1790642029931.jpg"', // 15
  '"/images/old_woman_active_1790642019147.jpg"', // 16
  '"/images/pelvic imageavif.jpg"', // 17 Gazelle chair
  '"/images/young_mother_1790642042734.jpg"', // 18 Postpartum
  '"/images/old_man_active_1790642029931.jpg"', // 19
  '"/images/old_woman_active_1790642019147.jpg"', // 20
];

let counter = 0;
content = content.replace(/image:\s*".*?"/g, () => {
  const replacement = "image: " + imageReplacements[counter];
  counter++;
  return replacement;
});

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Successfully updated blog images!');
