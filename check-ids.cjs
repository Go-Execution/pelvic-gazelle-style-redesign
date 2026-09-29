const https = require('https');

const ids = [
  '1544367567-0f2fcb009e0b',
  '1571019614242-c5c5dee9f50b',
  '1552825906-f045c48b2da5',
  '1517836357463-d25dfeac3438',
  '1506126613408-eca07ce68773',
  '1583454110551-21f2fa2afe61',
  '1518611012118-6a146e27994e',
  '1574680096145-d05b474e2155',
  '1594381898411-846e7d193883',
  '1517438322307-e6ce396e51ea',
  '1444731961956-751ed90465a5',
  '1581092334978-16972703644f',
  '1534438327276'
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
