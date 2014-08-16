var dbm = require('db-migrate');
var async = require('async');
var type = dbm.dataType;

exports.up = function(db, callback) {
  async.series([
    db.removeIndex.bind(db, 'marks', 'usermark'),
    db.renameColumn.bind(db, 'marks', 'release_id', 'contrib_id'),
    db.addIndex.bind(db, 'marks', 'usermark', ['user_id', 'contrib_id'], true),
  ], callback);
};

exports.down = function (db, callback) {
  async.series([
    db.removeIndex.bind(db, 'marks', 'usermark'),
    db.addIndex.bind(db, 'marks', 'usermark', ['user_id', 'release_id'], true),
  ], callback);
};
