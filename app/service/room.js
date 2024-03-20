const Service = require('egg').Service;

class RoomService extends Service {
  async save(room) {
    const { id } = room;
    if (id > 0) {
      // 更新数据库
      const result = await this.app.mysql.update('room', room, {
        where: { id },
      });
      if (result.affectedRows === 1) {
        return true;
      }
    } else {
      // 插入新记录
      const result = await this.app.mysql.insert('room', room);
      if (result.affectedRows === 1) {
        return true;
      }
    }
    return false;
  }
}

module.exports = RoomService;
