const CommonDao = require('./common');

class RoomDao extends CommonDao {
  tablename() {
    return 'room';
  }
}

module.exports = RoomDao;
