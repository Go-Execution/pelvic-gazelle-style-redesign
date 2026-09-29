const https = require('https');

const ids = [
  '1579684385127-1ef15d508118', // doctor
  '1581056771107-24ca5f033842', // healthcare
  '1519494026892-80bbd2d6fd0d', // clinical
  '1576091160399-159ac41a504c', // pt
  '1516549655169-df83a0774514', // hospital
  '1584515933487-779824d29309', // medical
  '1532938911079-1b06ac7ceec7', // doctor 2
  '1551076805-e16760c274f7', // medical clinic
  '1505751172876-fa143ce4af8f', // physical therapy
  '1631815538053-90d5658e4695', // pregnant 1
  '1611078235223-9c8646b5a32b', // pregnant 2
  '1573491419992-0b8fc5f6a7d5', // senior
  '1581576402444-245f7bd00b0d', // senior 2
  '1517836357463-d25dfeac3438'  // wellness/health
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
