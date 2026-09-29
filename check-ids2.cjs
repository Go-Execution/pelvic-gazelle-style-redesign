const https = require('https');

const ids = [
  '1579684385127-1ef15d508118', // doctor
  '1581056771107-24ca5f033842', // healthcare
  '1576091160399-159ac41a504c', // workout
  '1518611012118-6a146e27994e', // healthy food
  '1552825906-f045c48b2da5',    // workout fitness
  '1534438327276',              // gym culture
  '1581092334978-16972703644f', // medical facilities
  '1519494026892-80bbd2d6fd0d', // clinical infrastructure
];

let valid = [];
let checked = 0;

ids.forEach(id => {
  https.get(`https://images.unsplash.com/photo-${id}?w=10`, (res) => {
    if (res.statusCode === 200) {
      valid.push(id);
    }
    checked++;
    if (checked === ids.length) {
      console.log(JSON.stringify(valid));
    }
  });
});
