const CommonDao = require('./common');

class SellRecordDao extends CommonDao {
  tablename() {
    return 'sell_record';
  }

  async countByShowIdAndSeatNo(showId, seatNo, conn = this.app.mysql) {
    const query = this.toUnderscore({
      showId,
      seatNo,
    });
    const result = await conn.count(this.tablename(), query);
    return result;
  }
}

module.exports = SellRecordDao;
