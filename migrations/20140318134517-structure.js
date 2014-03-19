var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;


exports.up = function (db, callback) {
  async.series([
    db.createTable.bind(db, 'marks_', {
      user_id: {
        type: 'int',
        notNull: true
      },
      release_id: {
        type: 'int',
        notNull: true
      },
      feed: {
        type:'enum("pizza", "tomato")',
        notNull: true
      }
    }),
    db.createTable.bind(db, 'marks_cache_', {
      release_id: {
        type: 'int',
        notNull: true,
        primaryKey: true
      },
      pizza: {
        type: 'int'
      },
      tomato: {
        type: 'int'
      }
    }),
    db.createTable.bind(db, 'users', {
      user_id: {
        type: 'int',
        autoIncrement: true,
        primaryKey: true,
        notNull: true
      }
    })
  ], function(){
      db.addIndex('marks_', 'usermark', ['user_id', 'release_id'], true);
      db.addIndex('marks_cache_', 'release', 'release_id', true);
      callback();
  });
};


exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'marks_', {
      ifExists: true
    }),
    db.dropTable.bind(db, 'marks_cache_', {
      ifExists: true
    }),
    db.dropTable.bind(db, 'users', {
      ifExists: true
    }),
    db.removeIndex('marks_', 'usermark'),
    db.removeIndex('marks_cache_', 'release')
  ], callback);
};