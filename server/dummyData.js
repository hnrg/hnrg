const User = require('./models/user');
const cuid = require('cuid');

module.exports = async function() {
  User.count().exec((err, count) => {
     if (count > 0) {
         return;
     }

     const admin = new User({
         email: 'admin@admin.com',
         isAdmin: true,
         cuid: cuid(),
     });

     admin.password = admin.generateHash('i\'m a password :v');

     admin.save();
  });
};
