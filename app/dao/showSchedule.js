const CommonDao = require('./common');

class ShowScheduleDao extends CommonDao {
  tablename() {
    return 'show_schedule';
  }

  async deductionTicket(showId, num = 1, conn = this.app.mysql) {
    const sql = 'update show_schedule set ticket_quantity = ticket_quantity - ? where id = ? and ticket_quantity >= ?;';
    const result = await conn.query(sql, [ num, showId, num ]);
    if (result.affectedRows === 1) {
      return true;
    }
  }
}

module.exports = ShowScheduleDao;
