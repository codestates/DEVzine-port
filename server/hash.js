const bcrypt = require('bcryptjs');

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash('qwer1234', salt, (err, hash) => {
//         console.log(hash);
//     })
// });

// console.log(bcrypt.compareSync(
//     'qwer1234',
//     '$2a$10$BbDR8KsUhOOo7Q0CYauz2uEKHRxmLdxZ2bT7kLzeB9FfEd4TcaIDW'
// ))

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash('port8080', salt, (err, hash) => {
//         console.log(hash);
//     })
// });

console.log(
  bcrypt.compareSync(
    'port8080',
    '$2a$10$4p0MaNm4KmTIKyhOUBOyUeoCT1/MZWdlQSNyx6/m46vuaUd.pptXK'
  )
);
