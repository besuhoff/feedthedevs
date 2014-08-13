var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'dev_users', {
      id: {
        type: 'int',
        notNull: true
      },
      login: {
        type: 'string',
        length: 255,
        notNull: true
      },
      code: {
        type:'string',
        length: 32,
        notNull: true
      }
    }),
    db.insert.bind(db, 'dev_users', ['id', 'code', 'login'], [-1, '2ea115a53f064e7484097b67fdf4f3d5', 'Developer One']),
    db.insert.bind(db, 'dev_users', ['id', 'code', 'login'], [-2, '85e009307d400406d893307bc90da514', 'Developer Two']),
    db.insert.bind(db, 'dev_users', ['id', 'code', 'login'], [-3, '6f3e01c0fc42738ed46ef46989ac34a7', 'Developer Three']),
  ], function(){
    db.addIndex('dev_users', 'userid', ['id'], true);
    callback();
  });
};


exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'dev_users', {
      ifExists: true
    }),
    db.removeIndex('dev_users', 'userid'),
  ], callback);
};
