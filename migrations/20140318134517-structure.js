var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;


exports.up = function (db, callback) {
  async.series([
    db.createTable.bind(db, 'marks', {
      user_id: {
        type: 'int',
        notNull: true
      },
      release_id: {
        type: 'int',
        notNull: true
      },
      //for cross-db-compatibility switched ENUM to STRING
//      feed: {
//        type:'ENUM("pizza", "tomato")',
//        notNull: true
//      }
      feed: {
        type:'string',
        notNull: true
      }
    })
  ], function(){
      db.addIndex('marks', 'usermark', ['user_id', 'release_id'], true);
      callback();
  });
};


exports.down = function (db, callback) {
  async.series([
    db.removeIndex.bind('marks', 'usermark'),
    db.dropTable.bind(db, 'marks', {
      ifExists: true
    }),
  ], callback);
};
