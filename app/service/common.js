const Service = require('egg').Service;

class CommonService extends Service {
  tablename() {
    throw new Error('invalid table name');
  }

  async save(data) {
    const { id } = data;
    const tablename = this.tablename();
    if (id > 0) {
      // 更新数据库
      const result = await this.app.mysql.update(tablename, data, {
        where: { id },
      });
      if (result.affectedRows === 1) {
        return true;
      }
    } else {
      // 插入新记录
      const result = await this.app.mysql.insert(tablename, data);
      if (result.affectedRows === 1) {
        return true;
      }
    }
    return false;
  }

}

module.exports = CommonService;
